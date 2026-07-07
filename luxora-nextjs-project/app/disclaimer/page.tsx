import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Disclaimer | Luxora Interiors',
  description: 'Important information about the content, imagery and estimates shown on the Luxora Interiors website.',
  alternates: { canonical: '/disclaimer' },
};

export default function DisclaimerPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Disclaimer" updated="2 July 2026">
        <LegalSection title="Design Renders &amp; Photography">
          <p>
            The Design Gallery on this website includes both real, completed Luxora projects and approved AI-assisted
            design concepts, clearly labelled as such where shown. Photography of completed projects is real and
            unedited beyond standard colour correction. Concept renders are representative of a design direction and
            may differ from the final built space due to site conditions, material availability, or changes made
            during the design process.
          </p>
        </LegalSection>

        <LegalSection title="Budget Estimates">
          <p>
            Any budget ranges, price calculators, or cost estimates shown on this website — including our online
            Estimate tool — are indicative only, based on typical scope for similar projects. They do not constitute
            a binding quote. A firm, itemised quote is provided only after a free site visit and detailed brief
            discussion with our design team.
          </p>
        </LegalSection>

        <LegalSection title="Timelines">
          <p>
            Delivery timelines referenced on this website (such as our average handover figures) reflect typical
            project experience and are not a guaranteed delivery date for any specific project. Actual timelines
            depend on project scope, site readiness, and material lead times, and are confirmed in your project
            agreement.
          </p>
        </LegalSection>

        <LegalSection title="Third-Party Links">
          <p>
            This website links to external platforms we operate or partner with, including Luxora Lifestyles. We are
            not responsible for the content or availability of third-party websites linked from here.
          </p>
        </LegalSection>

        <LegalSection title="Questions">
          <p>
            If anything on this website is unclear, contact us at{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            before relying on it for a purchase or project decision.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
