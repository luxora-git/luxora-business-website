import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Careers | Luxora Interiors',
  description: 'Join the Luxora Interiors design and execution team in Jaipur.',
  alternates: { canonical: '/careers' },
};

const OPEN_ROLES = [
  'Interior Designer — Full Home Projects',
  '3D Visualiser',
  'Site Execution & Project Manager',
  'Modular Furniture Production Lead',
  'Client Relationship Manager',
];

export default function CareersPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout eyebrow="Join Us" title="Careers at Luxora">
        <p className="mb-8">
          Luxora is a design-and-execution studio, which means designers, visualisers, project managers and
          craftsmen all work side by side on the same projects — not in separate silos. If you want to see your work
          go from a sketch to a finished, lived-in home, we&apos;d like to hear from you.
        </p>

        <LegalSection title="What We Look For">
          <LegalList
            items={[
              'A genuine interest in how people actually live in the spaces we design, not just how they photograph',
              'Comfort working as part of one accountable project team, across design and execution',
              'Attention to the details that show up only after a client has lived with a space for a few months',
            ]}
          />
        </LegalSection>

        <LegalSection title="Current Openings">
          <LegalList items={OPEN_ROLES} />
        </LegalSection>

        <LegalSection title="How to Apply">
          <p>
            Send your resume and portfolio (if applicable) to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            with the role you&apos;re applying for in the subject line. We review every application and reply to
            shortlisted candidates within two weeks.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
