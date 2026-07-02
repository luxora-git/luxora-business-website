import type { Metadata } from 'next';
import Link from 'next/link';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraStats } from '@/lib/content/global/stats';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export const metadata: Metadata = {
  title: 'About Us | Luxora Interiors',
  description: 'Luxora Interiors is a Jaipur-based interior design and execution studio — one team, from first sketch to final handover.',
  alternates: { canonical: '/luxury-v4/about-us' },
};

export default function AboutUsPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout eyebrow="Our Story" title="About Luxora">
        <p className="mb-8">
          Luxora Interiors is a Jaipur-based interior design and execution studio. We plan, design and build complete
          homes and workspaces under one roof — architecture, interiors, modular furniture and home automation — so
          our clients deal with a single accountable team instead of a chain of contractors who rarely speak to each
          other.
        </p>

        <LegalSection title="What We Do">
          <p>
            From a single wardrobe wall to a full villa, every Luxora project is designed around how a space will
            actually be lived in, not just how it photographs. Our in-house design and production team carries one
            material language from the first concept render through to the last light switch.
          </p>
          <LegalList
            items={[
              'Full home interior design and execution',
              'Modular kitchens, wardrobes and custom furniture, fabricated in our own facility',
              'Architectural design and space planning',
              'Home automation and smart-living integration',
              `${luxoraStats.homesDelivered} homes and workspaces delivered across ${luxoraStats.cities}+ cities`,
            ]}
          />
        </LegalSection>

        <LegalSection title="How We Work">
          <p>
            Every project starts with a free site visit and consultation, moves through a photorealistic 3D design
            stage with unlimited revisions, and is handed over backed by a {luxoraStats.warrantyYears}-year structural
            warranty and a {luxoraStats.qualityChecks}-point quality checklist. One project manager stays accountable
            for the entire scope, start to finish.
          </p>
        </LegalSection>

        <LegalSection title="Get in Touch">
          <p>
            We&apos;re based in Jaipur and work across Rajasthan and beyond. See our{' '}
            <Link href="/luxury-v4/portfolio" style={{ color: luxoraColors.gold }} className="underline">
              completed projects
            </Link>{' '}
            or{' '}
            <Link href="/luxury-v4/contact-us" style={{ color: luxoraColors.gold }} className="underline">
              get in touch
            </Link>{' '}
            to start your own.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
