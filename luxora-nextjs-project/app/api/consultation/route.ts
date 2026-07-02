import { NextResponse } from 'next/server';
import { createBitrix24Lead, isBitrix24Configured, Bitrix24RequestError } from '@/lib/integrations/bitrix24';

/**
 * The one lead-capture endpoint on the site. Every "Book Free Consultation"
 * CTA everywhere (navbar, hero, sticky bar, every page's closing CTA, the
 * lightbox panel) opens the same `ConsultationModal`, whose form posts here.
 * Any future lead form should POST here too rather than adding a new route.
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: 'Please fill in all required fields correctly.' }, { status: 422 });
  }

  if (!isBitrix24Configured()) {
    console.warn('[consultation] Bitrix24 is not configured — lead was not forwarded to CRM.', {
      name: body.fullName,
      phone: body.mobileNumber,
    });
    return NextResponse.json(
      { error: 'Lead capture is not fully configured yet. Please call us directly.' },
      { status: 503 },
    );
  }

  try {
    await createBitrix24Lead({
      title: `Website Consultation — ${body.fullName}`,
      name: body.fullName,
      phone: body.mobileNumber,
      email: body.email,
      sourceId: 'WEB',
      comments: [
        `City: ${body.city}`,
        `Property Type: ${body.propertyType}`,
        `Project Type: ${body.projectType}`,
        `Budget Range: ${body.budgetRange}`,
        body.message ? `Message: ${body.message}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    });
  } catch (err) {
    console.error('[consultation] Failed to create Bitrix24 lead', err instanceof Bitrix24RequestError ? err.message : err);
    return NextResponse.json(
      { error: 'Something went wrong submitting your request. Please try again or call us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
