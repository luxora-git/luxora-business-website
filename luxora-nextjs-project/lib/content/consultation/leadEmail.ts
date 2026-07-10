import { sectionHeading, dataSection, renderEmailShell } from '@/lib/content/email/emailShell';

/**
 * Consultation lead notification email — the same shared shell the
 * Estimator's notification email renders through (see
 * lib/content/email/emailShell.ts), so both surfaces share identical
 * Luxora branding, palette, and layout. Content here is limited to what
 * the consultation form actually collects — no invented fields.
 */

export interface ConsultationLeadEmailInput {
  lead: {
    fullName: string;
    mobileNumber: string;
    email: string;
    city: string;
    propertyType: string;
    projectType: string;
    budgetRange: string;
    message?: string;
  };
  meta: {
    submittedAt: Date;
    requestId: string;
    crmStatus: string;
    leadId?: number;
    ip?: string;
    userAgent?: string;
  };
}

export function buildConsultationLeadEmail(input: ConsultationLeadEmailInput): { subject: string; html: string } {
  const { lead, meta } = input;
  const submittedIst = new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(meta.submittedAt);

  const subject = `New Consultation Request — ${lead.fullName} · ${lead.city}`;

  const bodyHtml = `
        ${sectionHeading('Customer Details')}
        ${dataSection([
          ['Name', lead.fullName],
          ['Phone', lead.mobileNumber],
          ['Email', lead.email],
          ['City', lead.city],
        ])}

        ${sectionHeading('Project Details')}
        ${dataSection([
          ['Property Type', lead.propertyType],
          ['Project Type', lead.projectType],
          ['Budget Range', lead.budgetRange],
          ['Message', lead.message],
        ])}

        ${sectionHeading('Lead Summary')}
        ${dataSection([
          ['Submission Time', `${submittedIst} IST`],
          ['Source', 'Luxora Website Consultation'],
          ['Bitrix Lead ID', meta.leadId !== undefined ? String(meta.leadId) : undefined],
          ['CRM Status', meta.crmStatus],
          ['IP Address', meta.ip],
          ['Device / Browser', meta.userAgent],
          ['Request ID', meta.requestId],
        ])}`;

  const html = renderEmailShell({
    subject,
    headerTitle: 'New Website Consultation Request',
    bodyHtml,
    footerText: 'Automated notification from the Luxora Website Consultation form.',
  });

  return { subject, html };
}
