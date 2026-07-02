import type { Metadata } from 'next';
import Link from 'next/link';
import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection } from '@/components/v4/common/LegalPageLayout';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';
import { galleryCategories } from '@/lib/content/gallery/categories';
import { allServices } from '@/lib/content/services/serviceIndex';
import { interiorElements, products } from '@/lib/content/catalog';

export const metadata: Metadata = {
  title: 'Sitemap | Luxora Interiors',
  description: 'A complete map of every page on the Luxora Interiors website.',
  alternates: { canonical: '/luxury-v4/sitemap' },
};

function LinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} className="hover:underline" style={{ color: luxoraColors.softBrown }}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function SitemapPage() {
  return (
    <ServicePageShell>
      <LegalPageLayout eyebrow="Explore" title="Sitemap">
        <p className="mb-10">A complete map of every page on the Luxora Interiors website.</p>

        <LegalSection title="Main">
          <LinkList
            links={[
              { label: 'Homepage', href: '/luxury-v4' },
              { label: 'Design Gallery', href: '/luxury-v4/gallery' },
              { label: 'Portfolio', href: '/luxury-v4/portfolio' },
              { label: 'Interior Elements', href: '/luxury-v4/elements' },
              { label: 'Products', href: '/luxury-v4/products' },
            ]}
          />
        </LegalSection>

        <LegalSection title="Services">
          <LinkList links={allServices.map((s) => ({ label: s.title, href: `/luxury-v4/services/${s.slug}` }))} />
        </LegalSection>

        <LegalSection title="Design Gallery — By Room">
          <LinkList links={galleryCategories.map((c) => ({ label: c.label, href: `/luxury-v4/gallery/${c.slug}` }))} />
        </LegalSection>

        <LegalSection title="Interior Elements">
          <LinkList links={interiorElements.map((e) => ({ label: e.title, href: `/luxury-v4/elements/${e.slug}` }))} />
        </LegalSection>

        <LegalSection title="Products">
          <LinkList links={products.map((p) => ({ label: p.title, href: `/luxury-v4/products/${p.slug}` }))} />
        </LegalSection>

        <LegalSection title="Company">
          <LinkList
            links={[
              { label: 'About Us', href: '/luxury-v4/about-us' },
              { label: 'Contact Us', href: '/luxury-v4/contact-us' },
              { label: 'Careers', href: '/luxury-v4/careers' },
            ]}
          />
        </LegalSection>

        <LegalSection title="Policies">
          <LinkList
            links={[
              { label: 'Privacy Policy', href: '/luxury-v4/privacy-policy' },
              { label: 'Terms & Conditions', href: '/luxury-v4/terms-conditions' },
              { label: 'Disclaimer', href: '/luxury-v4/disclaimer' },
              { label: 'Refund Policy', href: '/luxury-v4/refund-policy' },
              { label: 'Cancellation Policy', href: '/luxury-v4/cancellation-policy' },
              { label: 'Shipping & Delivery Policy', href: '/luxury-v4/shipping-policy' },
            ]}
          />
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
