import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that govern your use of the Luxora Interiors website and engagement of our design services.',
  alternates: { canonical: '/terms-conditions' },
};

export default function TermsConditionsPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Terms &amp; Conditions">
        <p className="mb-8">
          These Terms &amp; Conditions govern your use of the luxora.in website and any consultation, design or
          execution services you engage from Luxora Interiors. By using this website or booking a consultation, you
          agree to the terms below.
        </p>

        <LegalSection title="Using This Website">
          <p>
            This website is provided for the purpose of showcasing Luxora&apos;s design work and allowing visitors to
            request a consultation or budget estimate. Content, photography and design concepts shown here are the
            property of Luxora Interiors and may not be reproduced without permission.
          </p>
        </LegalSection>

        <LegalSection title="Consultations &amp; Estimates">
          <LegalList
            items={[
              'A free site visit and design consultation does not create a binding commitment on either side',
              'Budget estimates shown on the website or given verbally are indicative and based on typical project scope — a final quote is confirmed only after a detailed brief and site visit',
              'Design concepts shared during a consultation remain the intellectual property of Luxora until a project is formally engaged',
            ]}
          />
        </LegalSection>

        <LegalSection title="Project Engagement">
          <p>
            Once a project is confirmed, the specific scope, timeline, payment schedule and warranty terms are set
            out in a separate signed agreement between Luxora and the client. These Terms &amp; Conditions govern the
            website and initial enquiry process; the signed project agreement governs the execution of any actual
            interior design project.
          </p>
        </LegalSection>

        <LegalSection title="Payments, Cancellation &amp; Refunds">
          <p>
            Luxora Interiors operates a strict no-cancellation and no-refund policy. Once a booking amount, token
            amount, advance, design fee or execution milestone has been received, the booking is final:
          </p>
          <LegalList
            items={[
              'The project cannot be cancelled by the client once the booking amount is received',
              'All payments received are non-refundable in full, with no partial or pro-rata refund at any stage',
              'Amounts paid cannot be transferred, adjusted, carried forward or converted into a credit',
              'Making any payment towards a project constitutes acceptance of these terms',
            ]}
          />
          <p>
            Full details are set out in our{' '}
            <a href="/refund-policy" className="underline">
              Refund Policy
            </a>{' '}
            and{' '}
            <a href="/cancellation-policy" className="underline">
              Cancellation Policy
            </a>
            , which form part of these Terms.
          </p>
        </LegalSection>

        <LegalSection title="Limitation of Liability">
          <p>
            While we take care to keep information on this website accurate and current, Luxora makes no warranty
            that the website will be error-free or uninterrupted. Design renders and photography are representative
            of our work and finished projects may vary based on site conditions, material availability and client
            preferences finalised during the design process.
          </p>
        </LegalSection>

        <LegalSection title="Governing Law">
          <p>
            These terms are governed by the laws of India, and any disputes arising from them will be subject to the
            jurisdiction of the courts in Jaipur, Rajasthan.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            Questions about these terms can be sent to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>
            .
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
