/**
 * Consultation request submission — client for `/api/consultation`, the
 * same Bitrix24 + Amazon SES lead pipeline the Estimator uses (see
 * app/api/consultation/route.ts). The route always responds 200/ok — a
 * failure in either integration is logged server-side for manual recovery
 * rather than surfaced as an error here, so a visitor's request is never
 * rejected just because the CRM or email happened to be unavailable.
 */

export interface ConsultationFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  city: string;
  propertyType: string;
  projectType: string;
  budgetRange: string;
  message?: string;
}

export class ConsultationSubmissionError extends Error {}

/** POSTs the consultation request to `/api/consultation`. Only rejects on a
 * network failure or a malformed-payload response — a real backend/CRM
 * outage is handled server-side and still returns 200. */
export async function submitConsultationRequest(data: ConsultationFormData): Promise<void> {
  let response: Response;
  try {
    response = await fetch('/api/consultation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new ConsultationSubmissionError('Network error — please check your connection and try again.');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ConsultationSubmissionError(
      body?.error ?? 'Something went wrong submitting your request. Please try again or call us directly.',
    );
  }
}
