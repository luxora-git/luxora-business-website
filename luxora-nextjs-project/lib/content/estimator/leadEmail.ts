import { formatEstimateINR, type EstimateRange } from './pricing';
import type { EstimateSummaryItem } from './summary';
import { sectionHeading, dataSection, renderEmailShell } from '@/lib/content/email/emailShell';

/**
 * Estimator lead notification email — pure presentation, no I/O. Built
 * from the same shared summary items that power the reveal screen and
 * the CRM note, so every surface reads the identical brief. Renders
 * through the shared `renderEmailShell` (see lib/content/email/emailShell.ts)
 * — the same branding/layout the Consultation notification email uses.
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

  const bodyHtml = `
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
        ])}`;

  const html = renderEmailShell({
    subject,
    headerTitle: 'New Website Estimator Lead',
    banner: { label: 'Estimated Investment', value: rangeText },
    bodyHtml,
    footerText: 'Automated notification from the Luxora Website Estimator.',
  });

  return { subject, html };
}
