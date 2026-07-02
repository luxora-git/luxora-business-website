import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Privacy Policy | Luxora Interiors',
  description: 'How Luxora Interiors collects, uses and protects the information you share with us.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Privacy Policy" updated="2 July 2026">
        <p className="mb-8">
          This Privacy Policy explains how Luxora Interiors (&quot;Luxora&quot;, &quot;we&quot;, &quot;us&quot;)
          collects, uses and protects the information you share with us when you visit luxora.in, request a
          consultation, or otherwise engage with our design and execution services.
        </p>

        <LegalSection title="Information We Collect">
          <LegalList
            items={[
              'Contact details you provide through our consultation form or by calling/emailing/WhatsApping us — name, phone number, email address and city',
              'Project details you share with us — property type, project type, budget range and any message you add',
              'Basic usage data collected automatically, such as pages viewed and general device/browser information',
            ]}
          />
        </LegalSection>

        <LegalSection title="How We Use Your Information">
          <LegalList
            items={[
              'To respond to your consultation request and discuss your project',
              'To share design recommendations, estimates and proposals relevant to your enquiry',
              'To improve our website and the services we offer',
              'To send occasional updates about Luxora, which you can opt out of at any time',
            ]}
          />
        </LegalSection>

        <LegalSection title="How We Share Information">
          <p>
            We do not sell your personal information. Consultation requests submitted through our website are
            recorded in our internal CRM system so our design team can follow up with you — we do not share your
            details with unrelated third parties for marketing purposes.
          </p>
        </LegalSection>

        <LegalSection title="Data Security">
          <p>
            We take reasonable technical and organisational measures to protect the information you share with us
            against unauthorised access, loss or misuse. No online transmission is ever completely secure, but we
            work to keep your data safe.
          </p>
        </LegalSection>

        <LegalSection title="Your Choices">
          <p>
            You can ask us to update or delete the information we hold about you, or to stop contacting you, at any
            time by writing to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>
            .
          </p>
        </LegalSection>

        <LegalSection title="Changes to This Policy">
          <p>
            We may update this policy from time to time to reflect changes in our practices. The &quot;last
            updated&quot; date at the top of this page will always reflect the most recent revision.
          </p>
        </LegalSection>

        <LegalSection title="Contact Us">
          <p>
            Questions about this policy can be sent to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            or{' '}
            <a href={luxoraContact.phone.href} className="underline">
              {luxoraContact.phone.display}
            </a>
            .
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
