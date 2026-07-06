import { NextResponse } from 'next/server';
import { createBitrix24Lead, isBitrix24Configured, Bitrix24RequestError } from '@/lib/integrations/bitrix24';
import { calculateEstimateRange, formatEstimateINR, type EstimatorPackageTier } from '@/lib/content/estimator/pricing';
import { buildEstimateSummaryItems } from '@/lib/content/estimator/summary';
import { estimatorCategories } from '@/lib/content/estimator/categories';
import type { EstimatorCategorySlug } from '@/lib/content/estimator/types';

/**
 * Estimator lead endpoint — structural mirror of app/api/consultation/route.ts
 * (validate → createBitrix24Lead → typed JSON), with two deliberate
 * differences:
 *
 * 1. The estimate range is recomputed SERVER-SIDE from the submitted
 *    answers via the shared pure pricing module — the client never sends
 *    a price, so the figure logged into the CRM is always authentic.
 *
 * 2. CRM failure never blocks the visitor. Unlike the consultation modal
 *    (whose promise is "we'll call you", so a failed submission must be
 *    honest), the estimator's promise is the reveal itself — which is
 *    client-side and doesn't depend on the CRM. If Bitrix24 is
 *    unconfigured or down, the full lead payload is logged loudly for
 *    manual recovery and the visitor still gets their estimate. Losing a
 *    lead to a config gap is bad; losing the lead AND the visitor's
 *    goodwill is worse.
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

/** Builds the human-readable CRM note from the same shared summary
 * builder the reveal screen uses — visitor and sales team always read the
 * identical brief. */
function buildComments(body: EstimatorLeadBody): string {
  const lines: string[] = ['=== LUXORA ESTIMATOR LEAD ==='];

  for (const item of buildEstimateSummaryItems(body.category, body.styles, body.answers, body.packageTier)) {
    lines.push(`${item.label}: ${item.value}`);
  }

  const range = calculateEstimateRange(body.category, body.answers, body.packageTier);
  lines.push(`Estimated Investment: ${formatEstimateINR(range.min)} – ${formatEstimateINR(range.max)}`);

  if (body.timeline) lines.push(`Timeline: ${body.timeline}`);
  lines.push(`City: ${body.city}`);
  if (body.email) lines.push(`Email: ${body.email}`);
  lines.push(`WhatsApp Updates: ${body.whatsappConsent ? 'Yes' : 'No'}`);

  return lines.join('\n');
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isValidBody(body)) {
    return NextResponse.json({ error: 'Please fill in all required fields correctly.' }, { status: 422 });
  }

  const comments = buildComments(body);

  if (!isBitrix24Configured()) {
    console.warn('[estimator-lead] Bitrix24 not configured — lead NOT forwarded to CRM. Full payload for manual recovery:\n', comments);
    return NextResponse.json({ ok: true, crm: 'skipped' }, { status: 200 });
  }

  try {
    await createBitrix24Lead({
      title: `Estimator Lead — ${body.fullName} (${estimatorCategories.find((c) => c.slug === body.category)?.label ?? body.category})`,
      name: body.fullName,
      phone: body.mobileNumber,
      email: body.email,
      sourceId: 'WEB',
      comments,
    });
  } catch (err) {
    // Deliberate: never block the visitor's reveal on a CRM failure — log
    // the full lead loudly for manual recovery instead (see module doc).
    console.error(
      '[estimator-lead] Bitrix24 lead creation FAILED — lead NOT in CRM. Full payload for manual recovery:\n',
      comments,
      err instanceof Bitrix24RequestError ? err.message : err,
    );
    return NextResponse.json({ ok: true, crm: 'failed-logged' }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
