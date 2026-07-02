import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Cancellation Policy | Luxora Interiors',
  description: 'How to reschedule or cancel a site visit, consultation or ongoing project with Luxora Interiors.',
  alternates: { canonical: '/cancellation-policy' },
};

export default function CancellationPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Cancellation Policy" updated="2 July 2026">
        <LegalSection title="Site Visits &amp; Consultations">
          <p>
            Our free site visit and design consultation can be rescheduled or cancelled at no cost, at any time,
            simply by calling or messaging us at{' '}
            <a href={luxoraContact.phone.href} className="underline">
              {luxoraContact.phone.display}
            </a>{' '}
            or{' '}
            <a href={luxoraContact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="underline">
              WhatsApp
            </a>
            . We only ask that you let us know as early as possible so we can offer the slot to another client.
          </p>
        </LegalSection>

        <LegalSection title="Booked Projects">
          <p>
            Once a project is confirmed and a design fee or execution milestone has been paid, cancellation is
            governed by the terms of your signed project agreement, which sets out:
          </p>
          <LegalList
            items={[
              'The notice period required to cancel or pause a project',
              'Which milestones are refundable, partially refundable, or non-refundable at the point of cancellation',
              'How custom-fabricated materials already cut or ordered for your space are handled',
            ]}
          />
          <p>See our <a href="/refund-policy" className="underline">Refund Policy</a> for how payments already made are treated.</p>
        </LegalSection>

        <LegalSection title="Rescheduling an Execution Date">
          <p>
            If your site isn&apos;t ready on the originally planned start date, tell your project manager as early as
            possible — we will work with you to find a new start date. Extended delays outside our control (for
            example, site handover delays) do not count against our delivery timeline commitments.
          </p>
        </LegalSection>

        <LegalSection title="Need to Cancel?">
          <p>
            Write to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            with your project reference and we will confirm the applicable terms within 2 business days.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
