/**
 * Estimator lead submission — client for `/api/estimator-lead`, the
 * estimator's counterpart to lib/api/consultation.ts (same fetch-wrapper
 * + typed-error pattern). The payload carries the full configuration
 * (category, styles, answers, package) — the server recomputes the
 * estimate range itself via the shared pure pricing module, so the figure
 * the sales team sees can never be tampered with client-side.
 */

export interface EstimatorLeadPayload {
  fullName: string;
  mobileNumber: string;
  city: string;
  email?: string;
  timeline?: string;
  whatsappConsent: boolean;
  category: string;
  styles: string[];
  answers: Record<string, unknown>;
  packageTier: string;
}

export class EstimatorLeadSubmissionError extends Error {}

export async function submitEstimatorLead(payload: EstimatorLeadPayload): Promise<void> {
  let response: Response;
  try {
    response = await fetch('/api/estimator-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new EstimatorLeadSubmissionError('Network error — please check your connection and try again.');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new EstimatorLeadSubmissionError(
      body?.error ?? 'Something went wrong. Please try again or call us directly.',
    );
  }
}
