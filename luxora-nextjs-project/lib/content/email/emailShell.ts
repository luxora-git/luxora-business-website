/**
 * Shared HTML email primitives — the Luxora branding, palette, and
 * table-based layout every lead-notification email renders through
 * (currently the Estimator and the Consultation form; any future lead
 * source should build its email on this same shell rather than starting
 * from scratch). Table-based layout with inline styles is deliberate: it's
 * the only approach that renders reliably across email clients. Single
 * column, max-width 600px so it reads well on mobile. Every user-provided
 * string passed through `escapeHtml`.
 */

/* ── Palette (matches luxoraDesignTokens) ─────────────────────────── */
export const GOLD = '#C9A227';
export const ESPRESSO_DEEP = '#1C1005';
export const ESPRESSO = '#2C1F14';
export const SOFT_BROWN = '#6B4C3B';
export const CREAM = '#F5EFE6';
export const IVORY = '#FDFAF6';
export const HAIRLINE = '#E5D9C5';

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sectionHeading(title: string): string {
  return `<tr><td style="padding:26px 28px 10px;">
    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${GOLD};font-family:Arial,Helvetica,sans-serif;">${title}</p>
    <div style="height:1px;background:${HAIRLINE};margin-top:8px;"></div>
  </td></tr>`;
}

function dataRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:7px 28px 7px;vertical-align:top;width:42%;font-size:12px;font-weight:700;letter-spacing:0.5px;color:${SOFT_BROWN};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(label)}</td>
    <td style="padding:7px 28px 7px 0;vertical-align:top;font-size:13px;color:${ESPRESSO};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(value)}</td>
  </tr>`;
}

export function dataSection(rows: Array<[string, string | undefined]>): string {
  const rendered = rows
    .filter((r): r is [string, string] => Boolean(r[1] && r[1].trim()))
    .map(([label, value]) => dataRow(label, value))
    .join('');
  return `<tr><td style="padding:0 0 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rendered}</table></td></tr>`;
}

export interface EmailBanner {
  label: string;
  value: string;
}

export interface EmailShellOptions {
  /** Used only for the `<title>` tag — the actual visible subject is set on the SES send call. */
  subject: string;
  /** e.g. "New Website Estimator Lead" / "New Website Consultation Request". */
  headerTitle: string;
  /** Optional highlight banner directly under the header (the estimator's "Estimated Investment"). Omit when there's no single figure worth calling out. */
  banner?: EmailBanner;
  /** Pre-rendered `sectionHeading` + `dataSection` `<tr>` blocks, concatenated. */
  bodyHtml: string;
  footerText: string;
}

/** Renders the full HTML document — header, optional banner, body sections, footer. */
export function renderEmailShell({ subject, headerTitle, banner, bodyHtml, footerText }: EmailShellOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${IVORY};border-radius:12px;overflow:hidden;border:1px solid ${HAIRLINE};">

        <!-- Header -->
        <tr><td style="background:${ESPRESSO_DEEP};padding:26px 28px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-family:Arial,Helvetica,sans-serif;">Luxora Interiors</p>
          <p style="margin:8px 0 0;font-size:20px;color:${IVORY};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(headerTitle)}</p>
        </td></tr>

        ${
          banner
            ? `<tr><td style="background:${ESPRESSO};padding:18px 28px;text-align:center;">
          <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(253,250,246,0.6);font-family:Arial,Helvetica,sans-serif;">${escapeHtml(banner.label)}</p>
          <p style="margin:6px 0 0;font-size:26px;color:${GOLD};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(banner.value)}</p>
        </td></tr>`
            : ''
        }

        ${bodyHtml}

        <!-- Footer -->
        <tr><td style="padding:20px 28px 24px;text-align:center;border-top:1px solid ${HAIRLINE};">
          <p style="margin:0;font-size:11px;color:${SOFT_BROWN};font-family:Arial,Helvetica,sans-serif;">${escapeHtml(footerText)}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
