/**
 * Consultation request submission — client for `/api/consultation`, which
 * forwards every submission to Bitrix24 CRM as a Lead (see
 * `lib/integrations/bitrix24.ts`). Intentionally a real network call rather
 * than a faked success so the modal's loading/success/error states are
 * honest about backend/CRM availability.
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

/**
 * POSTs the consultation request to `/api/consultation`. There is no route
 * handler for this yet — until one is added, this will reject and the
 * modal will surface its error state. That is expected and correct: it
 * keeps the UI honest rather than pretending a backend exists.
 */
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
