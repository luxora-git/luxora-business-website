import { NextResponse } from 'next/server';
import { createBitrix24Lead, isBitrix24Configured, Bitrix24RequestError } from '@/lib/integrations/bitrix24';
import { sendNotificationEmail, isSesConfigured, SesRequestError, SesConfigError } from '@/lib/integrations/ses';
import { buildConsultationLeadEmail } from '@/lib/content/consultation/leadEmail';

/**
 * The one lead-capture endpoint on the site for "Book Free Consultation".
 * Every such CTA everywhere (navbar, hero, sticky bar, every page's closing
 * CTA, the lightbox panel) opens the same `ConsultationModal`, whose form
 * posts here. Mirrors the Estimator's lead pipeline (see
 * app/api/estimator-lead/route.ts) exactly:
 *
 *   1. Bitrix24 CRM lead (first, so the email can carry the Lead ID)
 *   2. Amazon SES notification email
 *
 * Each step reports 'created'/'sent', 'skipped' (not configured), or
 * 'failed' — independently. A failure in one never blocks the other, and
 * neither ever blocks the visitor's confirmation (same reliability
 * guarantee as the Estimator — the submission is always accepted).
 * Whenever either step is not fully successful, the COMPLETE
 * human-readable lead payload is logged so no lead can ever silently
 * disappear; a structured status line is logged on every request either
 * way.
 *
 * Any future lead form should POST to its own route built the same way —
 * reusing lib/integrations/bitrix24.ts and lib/integrations/ses.ts —
 * rather than re-implementing either integration.
 */

interface ConsultationPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  propertyType: string;
  projectType: string;
  budgetRange: string;
  message?: string;
}

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function isValidPayload(body: unknown): body is ConsultationPayload {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === 'string' && b.fullName.trim().length > 0 &&
    typeof b.mobileNumber === 'string' && b.mobileNumber.trim().length >= 7 &&
    typeof b.email === 'string' && EMAIL_PATTERN.test(b.email) &&
    typeof b.city === 'string' && b.city.trim().length > 0 &&
    typeof b.propertyType === 'string' && b.propertyType.trim().length > 0 &&
    typeof b.projectType === 'string' && b.projectType.trim().length > 0 &&
    typeof b.budgetRange === 'string' && b.budgetRange.trim().length > 0
  );
}

/** Human-readable CRM note / recovery payload. */
function buildComments(body: ConsultationPayload): string {
  return [
    `City: ${body.city}`,
    `Property Type: ${body.propertyType}`,
    `Project Type: ${body.projectType}`,
    `Budget Range: ${body.budgetRange}`,
    body.message ? `Message: ${body.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const submittedAt = new Date();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    console.warn(JSON.stringify({ ts: submittedAt.toISOString(), event: 'consultation', requestId, status: 'invalid-json' }));
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    console.warn(JSON.stringify({ ts: submittedAt.toISOString(), event: 'consultation', requestId, status: 'validation-failed' }));
    return NextResponse.json({ error: 'Please fill in all required fields correctly.' }, { status: 422 });
  }

  const comments = buildComments(body);
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined;
  const userAgent = request.headers.get('user-agent') ?? undefined;

  /* ── Step 1: Bitrix24 CRM ─────────────────────────────────────── */
  let crmStatus: 'created' | 'skipped' | 'failed' = 'skipped';
  let leadId: number | undefined;

  if (isBitrix24Configured()) {
    try {
      const result = await createBitrix24Lead({
        title: `Website Consultation | ${body.fullName}`,
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
        JSON.stringify({ ts: new Date().toISOString(), event: 'consultation', requestId, step: 'crm', status: 'failed', error: err instanceof Bitrix24RequestError ? err.message : String(err) }),
      );
    }
  }

  /* ── Step 2: Amazon SES notification email ────────────────────── */
  let emailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';

  if (isSesConfigured()) {
    try {
      const email = buildConsultationLeadEmail({
        lead: {
          fullName: body.fullName,
          mobileNumber: body.mobileNumber,
          email: body.email,
          city: body.city,
          propertyType: body.propertyType,
          projectType: body.projectType,
          budgetRange: body.budgetRange,
          message: body.message,
        },
        meta: { submittedAt, requestId, crmStatus, leadId, ip, userAgent },
      });
      await sendNotificationEmail(email);
      emailStatus = 'sent';
    } catch (err) {
      emailStatus = 'failed';
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          event: 'consultation',
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
      `[consultation] ${requestId} incomplete delivery (crm=${crmStatus}, email=${emailStatus}) — full payload for manual recovery:\nName: ${body.fullName}\nPhone: ${body.mobileNumber}\nEmail: ${body.email}\n${comments}`,
    );
  }

  /* ── Structured status line — every request ───────────────────── */
  console.log(
    JSON.stringify({ ts: new Date().toISOString(), event: 'consultation', requestId, crmStatus, emailStatus, leadId: leadId ?? null }),
  );

  return NextResponse.json({ ok: true, crm: crmStatus, email: emailStatus, ...(leadId !== undefined ? { leadId } : {}) }, { status: 200 });
}
