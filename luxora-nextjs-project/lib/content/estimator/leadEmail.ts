import { formatEstimateINR, type EstimateRange } from './pricing';
import type { EstimateSummaryItem } from './summary';

/**
 * Estimator lead notification email — pure presentation, no I/O. Built
 * from the same shared summary items that power the reveal screen and
 * the CRM note, so every surface reads the identical brief. Table-based
 * layout with inline styles (the only reliable approach across email
 * clients), single column, max-width 600px so it reads well on mobile.
 * Every user-provided string is HTML-escaped.
 */

export interface EstimatorLeadEmailInput {
  lead: {
    fullName: string;
    mobileNumber: string;
    email?: string;
    city: string;
    timeline?: string;
    whatsappConsent: boolean;
  };
  categoryLabel: string;
  /** Human-readable area answer (e.g. "1,200 – 1,800 sq ft"); absent for wardrobe. */
  areaLabel?: string;
  /** Selected style labels; empty when the visitor skipped the style step. */
  styleLabels: string[];
  chosenTierName: string;
  recommendedTierName: string;
  range: EstimateRange;
  /** Every question + answer collected, in flow order. */
  summaryItems: EstimateSummaryItem[];
  meta: {
    submittedAt: Date;
    requestId: string;
    crmStatus: string;
    leadId?: number;
    ip?: string;
    userAgent?: string;
  };
}

const TIMELINE_LABELS: Record<string, string> = {
  immediate: 'Immediately',
  '3-months': 'Within 3 months',
  '6-months': 'Within 6 months',
  exploring: 'Just exploring',
};

/* ── Palette (matches luxoraDesignTokens) ─────────────────────────── */
const GOLD = '#C9A227';
const ESPRESSO_DEEP = '#1C1005';
const ESPRESSO = '#2C1F14';
const SOFT_BROWN = '#6B4C3B';
const CREAM = '#F5EFE6';
const IVORY = '#FDFAF6';
const HAIRLINE = '#E5D9C5';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function sectionHeading(title: string): string {
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

function dataSection(rows: Array<[string, string | undefined]>): string {
  const rendered = rows
    .filter((r): r is [string, string] => Boolean(r[1] && r[1].trim()))
    .map(([label, value]) => dataRow(label, value))
    .join('');
  return `<tr><td style="padding:0 0 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rendered}</table></td></tr>`;
}

export function buildEstimatorLeadEmail(input: EstimatorLeadEmailInput): { subject: string; html: string } {
  const { lead, meta } = input;
  const rangeText = `${formatEstimateINR(input.range.min)} – ${formatEstimateINR(input.range.max)}`;
  const timelineLabel = lead.timeline ? (TIMELINE_LABELS[lead.timeline] ?? lead.timeline) : undefined;
  const submittedIst = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(meta.submittedAt);

  const subject = `New Estimator Lead — ${lead.fullName} · ${input.categoryLabel} · ${rangeText}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${CREAM};padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:${IVORY};border-radius:12px;overflow:hidden;border:1px solid ${HAIRLINE};">

        <!-- Header -->
        <tr><td style="background:${ESPRESSO_DEEP};padding:26px 28px;text-align:center;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:${GOLD};font-family:Arial,Helvetica,sans-serif;">Luxora Interiors</p>
          <p style="margin:8px 0 0;font-size:20px;color:${IVORY};font-family:Georgia,'Times New Roman',serif;">New Website Estimator Lead</p>
        </td></tr>

        <!-- Estimate banner -->
        <tr><td style="background:${ESPRESSO};padding:18px 28px;text-align:center;">
          <p style="margin:0;font-size:10px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(253,250,246,0.6);font-family:Arial,Helvetica,sans-serif;">Estimated Investment</p>
          <p style="margin:6px 0 0;font-size:26px;color:${GOLD};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(rangeText)}</p>
        </td></tr>

        ${sectionHeading('Customer Details')}
        ${dataSection([
          ['Name', lead.fullName],
          ['Phone', lead.mobileNumber],
          ['Email', lead.email],
          ['City', lead.city],
          ['WhatsApp Updates', lead.whatsappConsent ? 'Yes' : 'No'],
        ])}

        ${sectionHeading('Project Details')}
        ${dataSection([
          ['Project Category', input.categoryLabel],
          ['Area', input.areaLabel],
          ['Selected Styles', input.styleLabels.length > 0 ? input.styleLabels.join(', ') : 'Skipped'],
          ['Timeline', timelineLabel],
          ['Chosen Package', input.chosenTierName],
          ['Recommended Package', input.recommendedTierName],
          ['Estimated Price Range', rangeText],
        ])}

        ${sectionHeading('Questions & Answers')}
        ${dataSection(input.summaryItems.map((item) => [item.label, item.value] as [string, string]))}

        ${sectionHeading('Lead Summary')}
        ${dataSection([
          ['Estimated Project Value', rangeText],
          ['Recommended Package', input.recommendedTierName],
          ['Submission Time', `${submittedIst} IST`],
          ['Source', 'Luxora Website Estimator'],
          ['Bitrix Lead ID', meta.leadId !== undefined ? String(meta.leadId) : undefined],
          ['CRM Status', meta.crmStatus],
          ['IP Address', meta.ip],
          ['Device / Browser', meta.userAgent],
          ['Request ID', meta.requestId],
        ])}

        <!-- Footer -->
        <tr><td style="padding:20px 28px 24px;text-align:center;border-top:1px solid ${HAIRLINE};">
          <p style="margin:0;font-size:11px;color:${SOFT_BROWN};font-family:Arial,Helvetica,sans-serif;">Automated notification from the Luxora Website Estimator.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return { subject, html };
}
