import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList, LegalHighlight } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'Luxora Interiors operates a strict no-refund policy — all payments made towards a booked project are non-refundable.',
  alternates: { canonical: '/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Refund Policy">
        <LegalHighlight>
          Luxora Interiors operates a strict no-refund policy. Once a booking amount, design fee or any other
          payment has been received against a project, that payment is final and non-refundable under all
          circumstances.
        </LegalHighlight>

        <p className="mb-8">
          This policy applies to every interior design and execution project booked through Luxora Interiors. It
          does not apply to the free site visit or design consultation, which carry no charge at all.
        </p>

        <LegalSection title="No Refund After Booking">
          <p>
            A project is treated as booked the moment we receive any payment from you — whether that payment is
            described as a booking amount, token amount, advance, design fee or execution milestone. From that
            point onwards, no refund of any kind is issued:
          </p>
          <LegalList
            items={[
              'No full refund, no partial refund and no pro-rata refund of any amount already paid',
              'No refund if you choose to cancel, pause, postpone or withdraw from the project at any stage',
              'No refund if the scope is reduced, or if you decide not to proceed after designs have been shared',
              'No refund is issued in the form of cash, bank transfer, credit note, adjustment or any other means',
            ]}
          />
        </LegalSection>

        <LegalSection title="Why Payments Are Non-Refundable">
          <p>
            Every Luxora project is bespoke. From the moment a booking is confirmed we block execution capacity,
            allocate a design and project team, begin space planning and 3D detailing, and commit to vendors for
            materials fabricated to your exact measurements. Custom-built modular kitchens, wardrobes and furniture
            cut to your space carry no resale value once fabrication begins. These commitments are made immediately
            and cannot be reversed, which is why all payments received are non-refundable.
          </p>
        </LegalSection>

        <LegalSection title="Design Fee">
          <p>
            The design fee covers design time, 3D renders, material planning and detailing. It is non-refundable
            from the moment it is paid, irrespective of whether the design work has been started, partially
            delivered or fully shared with you, and irrespective of whether you proceed to execution.
          </p>
        </LegalSection>

        <LegalSection title="Execution Milestones">
          <p>
            Execution is billed against a milestone schedule set out in your signed project agreement (for example:
            booking amount, material procurement and progress-linked instalments). Every milestone payment is
            non-refundable once received. No milestone — paid in advance or otherwise — is refundable, in whole or
            in part, at any stage of the project.
          </p>
        </LegalSection>

        <LegalSection title="Payments Made in Error">
          <p>
            The only exception to this policy is a demonstrable duplicate or technical payment error — for example,
            the same invoice paid twice, or an amount debited without any corresponding booking. Such cases must be
            reported in writing to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            within 7 days of the transaction, along with proof of payment. This exception does not extend to
            cancellations, change of mind, or dissatisfaction with scope.
          </p>
        </LegalSection>

        <LegalSection title="Acceptance of This Policy">
          <p>
            By making any payment towards a Luxora Interiors project, you confirm that you have read, understood
            and accepted this no-refund policy in full, and that no refund will be claimed by you at any point
            thereafter.
          </p>
        </LegalSection>

        <LegalSection title="See Also">
          <p>
            Bookings also cannot be cancelled once payment is received — see our{' '}
            <a href="/cancellation-policy" className="underline">
              Cancellation Policy
            </a>
            .
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
