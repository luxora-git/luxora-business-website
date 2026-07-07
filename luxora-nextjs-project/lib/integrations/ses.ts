import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

/**
 * Amazon SES integration — the single shared email sender, sibling of
 * lib/integrations/bitrix24.ts and following its exact conventions:
 * configured entirely via environment variables, typed error classes,
 * an isConfigured() guard so callers can degrade gracefully, and no
 * secrets anywhere in code.
 *
 * Required environment variables:
 *   AWS_REGION            — SES region, e.g. "ap-south-1"
 *   AWS_ACCESS_KEY_ID     — IAM user key with ses:SendEmail permission
 *   AWS_SECRET_ACCESS_KEY — matching secret
 *   SES_FROM_EMAIL        — verified SES sender identity
 *
 * Optional:
 *   SES_NOTIFY_EMAILS     — comma-separated recipient override
 *                           (defaults to tech@luxora.in)
 *   SES_AWS_REGION / SES_AWS_ACCESS_KEY_ID / SES_AWS_SECRET_ACCESS_KEY
 *                         — take precedence over the plain AWS_* names,
 *                           for hosts (e.g. Vercel) that reserve the
 *                           AWS_* namespace.
 */

const DEFAULT_NOTIFY_RECIPIENTS = ['tech@luxora.in'];

export class SesConfigError extends Error {}
export class SesRequestError extends Error {}

function getRegion(): string | undefined {
  return process.env.SES_AWS_REGION?.trim() || process.env.AWS_REGION?.trim();
}
function getAccessKeyId(): string | undefined {
  return process.env.SES_AWS_ACCESS_KEY_ID?.trim() || process.env.AWS_ACCESS_KEY_ID?.trim();
}
function getSecretAccessKey(): string | undefined {
  return process.env.SES_AWS_SECRET_ACCESS_KEY?.trim() || process.env.AWS_SECRET_ACCESS_KEY?.trim();
}
function getFromEmail(): string | undefined {
  return process.env.SES_FROM_EMAIL?.trim();
}

export function isSesConfigured(): boolean {
  return Boolean(getRegion() && getAccessKeyId() && getSecretAccessKey() && getFromEmail());
}

/** Recipient list — SES_NOTIFY_EMAILS (comma-separated) with a safe default. */
export function getNotifyRecipients(): string[] {
  const raw = process.env.SES_NOTIFY_EMAILS?.trim();
  if (!raw) return DEFAULT_NOTIFY_RECIPIENTS;
  const parsed = raw.split(',').map((e) => e.trim()).filter(Boolean);
  return parsed.length > 0 ? parsed : DEFAULT_NOTIFY_RECIPIENTS;
}

let client: SESClient | null = null;
function getClient(): SESClient {
  if (!client) {
    const region = getRegion();
    const accessKeyId = getAccessKeyId();
    const secretAccessKey = getSecretAccessKey();
    if (!region || !accessKeyId || !secretAccessKey) {
      throw new SesConfigError('Amazon SES is not configured (missing region or credentials).');
    }
    client = new SESClient({ region, credentials: { accessKeyId, secretAccessKey } });
  }
  return client;
}

export interface NotificationEmail {
  subject: string;
  html: string;
}

/**
 * Sends one HTML notification email to the configured recipients. Throws
 * SesConfigError when unconfigured and SesRequestError on any send
 * failure — callers are expected to catch, log, and degrade rather than
 * letting either bubble up raw.
 */
export async function sendNotificationEmail(email: NotificationEmail): Promise<{ messageId: string }> {
  const from = getFromEmail();
  if (!from || !isSesConfigured()) {
    throw new SesConfigError('Amazon SES is not configured (missing SES_FROM_EMAIL or credentials).');
  }

  try {
    const result = await getClient().send(
      new SendEmailCommand({
        Source: `Luxora Interiors <${from}>`,
        Destination: { ToAddresses: getNotifyRecipients() },
        Message: {
          Subject: { Data: email.subject, Charset: 'UTF-8' },
          Body: { Html: { Data: email.html, Charset: 'UTF-8' } },
        },
      }),
    );
    return { messageId: result.MessageId ?? 'unknown' };
  } catch (err) {
    if (err instanceof SesConfigError) throw err;
    const message = err instanceof Error ? err.message : 'Unknown SES failure.';
    throw new SesRequestError(`Amazon SES send failed: ${message}`);
  }
}
