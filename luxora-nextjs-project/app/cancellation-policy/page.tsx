import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList, LegalHighlight } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Cancellation Policy',
  description: 'Luxora Interiors bookings cannot be cancelled once the booking amount is received, and no refund is issued.',
  alternates: { canonical: '/cancellation-policy' },
};

export default function CancellationPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Cancellation Policy">
        <LegalHighlight>
          Luxora Interiors operates a strict no-cancellation policy. Once the booking amount has been received, a
          project cannot be cancelled and no refund is issued under any circumstances.
        </LegalHighlight>

        <p className="mb-8">
          Free site visits and design consultations, which carry no charge, can still be rescheduled freely — the
          terms below explain both.
        </p>

        <LegalSection title="Site Visits &amp; Consultations (Free)">
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
            . We only ask that you let us know as early as possible so we can offer the slot to another client. No
            payment is involved at this stage.
          </p>
        </LegalSection>

        <LegalSection title="No Cancellation After Booking Amount Is Received">
          <p>
            The moment we receive any payment from you — booking amount, token amount, advance, design fee or
            execution milestone — the project is confirmed and becomes non-cancellable. From that point:
          </p>
          <LegalList
            items={[
              'The booking cannot be cancelled by the client, at any stage of the project',
              'No refund is issued against a cancellation request — in full or in part',
              'Amounts already paid cannot be transferred, adjusted, carried forward or converted into a credit',
              'This applies equally to design-only engagements and full design-and-execution projects',
            ]}
          />
          <p>
            See our{' '}
            <a href="/refund-policy" className="underline">
              Refund Policy
            </a>{' '}
            for how payments already made are treated.
          </p>
        </LegalSection>

        <LegalSection title="Why Bookings Cannot Be Cancelled">
          <p>
            On receiving a booking amount we immediately block execution capacity in our schedule, assign a design
            and project team, and commit to vendors for materials fabricated to your exact measurements. Custom
            modular units cut to your space cannot be reassigned to another project. These commitments are made
            upfront and cannot be withdrawn, which is why bookings are final once payment is received.
          </p>
        </LegalSection>

        <LegalSection title="Rescheduling an Execution Date">
          <p>
            If your site isn&apos;t ready on the originally planned start date, tell your project manager as early
            as possible — we will work with you to find a new start date. Rescheduling a start date is not a
            cancellation, and does not alter the non-refundable status of payments already made. Extended delays
            outside our control (for example, site handover delays) do not count against our delivery timeline
            commitments.
          </p>
        </LegalSection>

        <LegalSection title="Cancellation by Luxora">
          <p>
            In the rare event that Luxora is unable to proceed with a booked project for reasons entirely
            attributable to us, we will inform you in writing and mutually agree a way forward, which may include
            completing the work through an alternative timeline or team.
          </p>
        </LegalSection>

        <LegalSection title="Acceptance of This Policy">
          <p>
            By making any payment towards a Luxora Interiors project, you confirm that you have read, understood
            and accepted this no-cancellation and no-refund policy in full. Questions can be sent to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            before you make any payment.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
