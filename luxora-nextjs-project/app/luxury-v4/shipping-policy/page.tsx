import type { Metadata } from 'next';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection, LegalList } from '@/components/v4/common/LegalPageLayout';
import { luxoraContact } from '@/lib/content/global/contact';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Luxora Interiors',
  description: 'How materials and fabricated products are delivered and installed for Luxora Interiors projects.',
  alternates: { canonical: '/luxury-v4/shipping-policy' },
};

export default function ShippingPolicyPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout title="Shipping &amp; Delivery Policy" updated="2 July 2026">
        <p className="mb-8">
          Luxora is a design-and-execution studio, not an e-commerce store — we don&apos;t ship parcels to a
          checkout address. Instead, every modular kitchen, wardrobe, furniture piece and finish we design is
          fabricated to your exact space and delivered directly to your site as part of installation. This policy
          explains how that works.
        </p>

        <LegalSection title="Fabrication &amp; Site Delivery">
          <LegalList
            items={[
              'Modular furniture (kitchens, wardrobes, TV units, custom pieces) is fabricated in our own facility to the measurements taken during your site visit',
              'Finished units are transported directly to your project site and installed by our own execution team — there is no separate courier delivery or unboxing on your end',
              'Loose materials (tiles, stone, hardware, fixtures) are procured and delivered to site in line with your project schedule',
            ]}
          />
        </LegalSection>

        <LegalSection title="Delivery Timelines">
          <p>
            Fabrication and site-delivery timelines are set out in your project schedule and depend on project scope
            — typically 8–10 weeks for a full home, shorter for a single room. Your project manager will keep you
            updated on material readiness and installation dates throughout.
          </p>
        </LegalSection>

        <LegalSection title="Site Readiness">
          <p>
            Timely delivery depends on your site being ready to receive materials and installation teams (civil work
            complete, power and water available, clear access). Delays caused by site readiness are communicated as
            soon as they&apos;re identified and do not count against our delivery commitments.
          </p>
        </LegalSection>

        <LegalSection title="Damage or Discrepancies">
          <p>
            Every delivered and installed item is inspected against our quality checklist before handover. If you
            notice any damage or discrepancy after installation, contact your project manager or write to{' '}
            <a href={luxoraContact.email.href} className="underline">
              {luxoraContact.email.display}
            </a>{' '}
            immediately so it can be corrected under warranty.
          </p>
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
