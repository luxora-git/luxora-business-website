/**
 * Bitrix24 CRM integration — the single shared client every lead-capture
 * form on the site sends through (currently just the Consultation modal;
 * any future form should call `createBitrix24Lead` directly, or POST to
 * `/api/consultation`, rather than re-implementing this).
 *
 * Configured entirely via environment variables so real credentials can be
 * dropped in later without touching code:
 *
 *   BITRIX24_WEBHOOK_URL  — inbound webhook base URL, e.g.
 *     https://yourcompany.bitrix24.in/rest/1/xxxxxxxxxxxxxxxxxxxx/
 *   BITRIX24_LEAD_SOURCE_ID — optional CRM source code (defaults to "WEB")
 *
 * Until BITRIX24_WEBHOOK_URL is set, `isBitrix24Configured()` returns false
 * and callers should surface a clear "not yet configured" error instead of
 * silently pretending the lead was sent.
 */

export interface BitrixLeadInput {
  title: string;
  name: string;
  phone: string;
  email?: string;
  comments?: string;
  sourceId?: string;
}

export class Bitrix24ConfigError extends Error {}
export class Bitrix24RequestError extends Error {}

export function isBitrix24Configured(): boolean {
  return Boolean(process.env.BITRIX24_WEBHOOK_URL?.trim());
}

function getWebhookBaseUrl(): string {
  const url = process.env.BITRIX24_WEBHOOK_URL?.trim();
  if (!url) {
    throw new Bitrix24ConfigError('BITRIX24_WEBHOOK_URL is not configured.');
  }
  return url.endsWith('/') ? url : `${url}/`;
}

/**
 * Creates a Lead in Bitrix24 via `crm.lead.add`. Throws `Bitrix24RequestError`
 * on any network failure or a non-success response from Bitrix24 — callers
 * are expected to catch this and surface a friendly message rather than
 * letting it bubble up raw.
 */
export async function createBitrix24Lead(lead: BitrixLeadInput): Promise<{ id: number }> {
  const webhookBaseUrl = getWebhookBaseUrl();

  const payload = {
    fields: {
      TITLE: lead.title,
      NAME: lead.name,
      PHONE: [{ VALUE: lead.phone, VALUE_TYPE: 'WORK' }],
      ...(lead.email ? { EMAIL: [{ VALUE: lead.email, VALUE_TYPE: 'WORK' }] } : {}),
      COMMENTS: lead.comments ?? '',
      SOURCE_ID: lead.sourceId ?? process.env.BITRIX24_LEAD_SOURCE_ID ?? 'WEB',
    },
    params: { REGISTER_SOURCED_LEAD: 'Y' },
  };

  let response: Response;
  try {
    response = await fetch(`${webhookBaseUrl}crm.lead.add.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new Bitrix24RequestError('Could not reach Bitrix24 — network or timeout error.');
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || !data || typeof data.result === 'undefined') {
    const message = data?.error_description || data?.error || `Bitrix24 rejected the request (HTTP ${response.status}).`;
    throw new Bitrix24RequestError(message);
  }

  return { id: data.result as number };
}
