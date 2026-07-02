import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Refund Policy | Luxora Interiors',
  description: 'How advance payments, milestones and refunds are handled for Luxora Interiors design and execution projects.',
  alternates: { canonical: '/luxury-v4/refund-policy' },
};

export default function RefundPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Refund Policy" updated="2 July 2026">
        <p className="mb-8">
          This policy explains how advance payments and milestone payments are handled for interior design and
          execution projects booked through Luxora Interiors. It does not apply to the free site visit or design
          consultation, which carry no charge.
        </p>

        <LegalSection title="Design Fee">
          <p>
            Once a project moves past the free consultation into paid 3D design and detailing, a design fee is
            payable as agreed in your project proposal. This fee covers the design time, renders and material
            planning already delivered and is non-refundable once the design work has been completed and shared,
            since the deliverable has been provided in full.
          </p>
        </LegalSection>

        <LegalSection title="Execution Milestones">
          <p>
            Execution is billed against a milestone schedule set out in your signed project agreement (for example:
            advance booking, material procurement, and progress-linked instalments). Refunds against a paid milestone
            are assessed case by case, based on:
          </p>
          <LegalList
            items={[
              'Work already completed or materials already procured against that milestone',
              'Custom-fabricated items (modular kitchens, wardrobes, furniture) that cannot be resold once cut or built to your space',
              'Any cancellation notice period specified in your signed agreement',
            ]}
          />
        </LegalSection>

        <LegalSection title="Cancellations Before Execution Begins">
          <p>
            If you cancel before any material has been ordered or fabrication has started, we will refund payments
            made toward that stage, less the design fee and any documented third-party costs already committed on
            your behalf (such as vendor bookings).
          </p>
        </LegalSection>

        <LegalSection title="How to Request a Refund">
          <p>
            Refund requests should be sent in writing to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            with your project reference. We aim to review and respond within 7 business days, and any approved refund
            is processed to the original payment method within 14 business days of approval.
          </p>
        </LegalSection>

        <LegalSection title="See Also">
          <p>
            For details on rescheduling or cancelling a booked site visit or project start date, see our{' '}
            <a href="/luxury-v4/cancellation-policy" className="underline">
              Cancellation Policy
            </a>
            .
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
