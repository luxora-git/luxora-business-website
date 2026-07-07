import { NextResponse } from 'next/server';
import { createBitrix24Lead, isBitrix24Configured, Bitrix24RequestError } from '@/lib/integrations/bitrix24';
import { sendNotificationEmail, isSesConfigured, SesRequestError, SesConfigError } from '@/lib/integrations/ses';
import { calculateEstimateRange, formatEstimateINR, type EstimatorPackageTier } from '@/lib/content/estimator/pricing';
import { buildEstimateSummaryItems } from '@/lib/content/estimator/summary';
import { buildEstimatorLeadEmail } from '@/lib/content/estimator/leadEmail';
import { estimatorCategories } from '@/lib/content/estimator/categories';
import { estimatorStyles } from '@/lib/content/estimator/styles';
import { estimatorPackages, getRecommendedTier } from '@/lib/content/estimator/packages';
import { estimatorQuestions } from '@/lib/content/estimator/questions';
import type { EstimatorCategorySlug } from '@/lib/content/estimator/types';

/**
 * Estimator lead endpoint — the notification orchestrator. On every valid
 * submission it runs an ordered pipeline of integration steps:
 *
 *   1. Bitrix24 CRM lead (first, so the email can carry the Lead ID)
 *   2. Amazon SES notification email
 *
 * Each step reports 'created'/'sent', 'skipped' (not configured), or
 * 'failed' — independently. A failure in one never blocks the other, and
 * neither ever blocks the visitor's reveal (business rule: the reveal is
 * client-side and must not depend on backend availability). Whenever
 * either step is not fully successful, the COMPLETE human-readable lead
 * payload is logged so no lead can ever silently disappear; a structured
 * status line is logged on every request either way.
 *
 * Future integrations (WhatsApp, Slack, PDF proposal, …) are added as
 * further steps in this pipeline plus a lib/integrations/* client — the
 * estimator flow and its API client never change.
 */

interface EstimatorLeadBody {
  fullName: string;
  mobileNumber: string;
  city: string;
  email?: string;
  timeline?: string;
  whatsappConsent: boolean;
  category: EstimatorCategorySlug;
  styles: string[];
  answers: Record<string, unknown>;
  packageTier: EstimatorPackageTier;
}

const CATEGORY_SLUGS = new Set(['full-home', 'kitchen', 'wardrobe']);
const TIER_SLUGS = new Set(['essential', 'signature', 'bespoke']);

/** Answer keys whose option label represents the project's area. */
const AREA_ANSWER_KEYS = ['carpetAreaRange', 'kitchenSizeRange'];

function isValidBody(body: unknown): body is EstimatorLeadBody {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === 'string' && b.fullName.trim().length > 0 &&
    typeof b.mobileNumber === 'string' && b.mobileNumber.replace(/\D/g, '').length >= 10 &&
    typeof b.city === 'string' && b.city.trim().length > 0 &&
    typeof b.category === 'string' && CATEGORY_SLUGS.has(b.category) &&
    typeof b.packageTier === 'string' && TIER_SLUGS.has(b.packageTier) &&
    Array.isArray(b.styles) &&
    typeof b.answers === 'object' && b.answers !== null &&
    typeof b.whatsappConsent === 'boolean'
  );
}

/** Human-readable CRM note / recovery payload — same shared summary
 * builder the reveal screen and email use. */
function buildComments(body: EstimatorLeadBody): string {
  const lines: string[] = ['=== LUXORA ESTIMATOR LEAD ==='];

  for (const item of buildEstimateSummaryItems(body.category, body.styles, body.answers, body.packageTier)) {
    lines.push(`${item.label}: ${item.value}`);
  }

  const range = calculateEstimateRange(body.category, body.answers, body.packageTier);
  lines.push(`Estimated Investment: ${formatEstimateINR(range.min)} – ${formatEstimateINR(range.max)}`);

  if (body.timeline) lines.push(`Timeline: ${body.timeline}`);
  lines.push(`City: ${body.city}`);
  lines.push(`Phone: ${body.mobileNumber}`);
  if (body.email) lines.push(`Email: ${body.email}`);
  lines.push(`WhatsApp Updates: ${body.whatsappConsent ? 'Yes' : 'No'}`);

  return lines.join('\n');
}

/** Resolves the human label of the category's area answer, if any. */
function getAreaLabel(body: EstimatorLeadBody): string | undefined {
  for (const question of estimatorQuestions[body.category]) {
    if (!AREA_ANSWER_KEYS.includes(question.key)) continue;
    const answer = body.answers[question.key];
    const label = question.options?.find((o) => o.value === answer)?.label;
    if (label) return label;
  }
  return undefined;
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const submittedAt = new Date();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.warn(JSON.stringify({ ts: submittedAt.toISOString(), event: 'estimator-lead', requestId, status: 'invalid-json' }));
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isValidBody(body)) {
    console.warn(JSON.stringify({ ts: submittedAt.toISOString(), event: 'estimator-lead', requestId, status: 'validation-failed' }));
    return NextResponse.json({ error: 'Please fill in all required fields correctly.' }, { status: 422 });
  }

  const categoryLabel = estimatorCategories.find((c) => c.slug === body.category)?.label ?? body.category;
  const comments = buildComments(body);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
  const userAgent = request.headers.get('user-agent') ?? undefined;

  /* ── Step 1: Bitrix24 CRM ─────────────────────────────────────── */
  let crmStatus: 'created' | 'skipped' | 'failed' = 'skipped';
  let leadId: number | undefined;

  if (isBitrix24Configured()) {
    try {
      const result = await createBitrix24Lead({
        title: `Website Estimator | ${categoryLabel} | ${body.fullName}`,
        name: body.fullName,
        phone: body.mobileNumber,
        email: body.email,
        comments,
      });
      crmStatus = 'created';
      leadId = result.id;
    } catch (err) {
      crmStatus = 'failed';
      console.error(
        JSON.stringify({ ts: new Date().toISOString(), event: 'estimator-lead', requestId, step: 'crm', status: 'failed', error: err instanceof Bitrix24RequestError ? err.message : String(err) }),
      );
    }
  }

  /* ── Step 2: Amazon SES notification email ────────────────────── */
  let emailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';

  if (isSesConfigured()) {
    try {
      const range = calculateEstimateRange(body.category, body.answers, body.packageTier);
      const email = buildEstimatorLeadEmail({
        lead: {
          fullName: body.fullName,
          mobileNumber: body.mobileNumber,
          email: body.email,
          city: body.city,
          timeline: body.timeline,
          whatsappConsent: body.whatsappConsent,
        },
        categoryLabel,
        areaLabel: getAreaLabel(body),
        styleLabels: body.styles.map((slug) => estimatorStyles.find((s) => s.slug === slug)?.label ?? slug),
        chosenTierName: estimatorPackages.find((p) => p.slug === body.packageTier)?.name ?? body.packageTier,
        recommendedTierName:
          estimatorPackages.find((p) => p.slug === getRecommendedTier(body.styles))?.name ?? getRecommendedTier(body.styles),
        range,
        summaryItems: buildEstimateSummaryItems(body.category, body.styles, body.answers, body.packageTier),
        meta: { submittedAt, requestId, crmStatus, leadId, ip, userAgent },
      });
      await sendNotificationEmail(email);
      emailStatus = 'sent';
    } catch (err) {
      emailStatus = 'failed';
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          event: 'estimator-lead',
          requestId,
          step: 'email',
          status: 'failed',
          error: err instanceof SesRequestError || err instanceof SesConfigError ? err.message : String(err),
        }),
      );
    }
  }

  /* ── Recovery logging — no lead may ever silently disappear ───── */
  if (crmStatus !== 'created' || emailStatus !== 'sent') {
    console.warn(
      `[estimator-lead] ${requestId} incomplete delivery (crm=${crmStatus}, email=${emailStatus}) — full payload for manual recovery:\n${comments}`,
    );
  }

  /* ── Structured status line — every request ───────────────────── */
  console.log(
    JSON.stringify({ ts: new Date().toISOString(), event: 'estimator-lead', requestId, crmStatus, emailStatus, leadId: leadId ?? null }),
  );

  return NextResponse.json({ ok: true, crm: crmStatus, email: emailStatus, ...(leadId !== undefined ? { leadId } : {}) }, { status: 200 });
}
