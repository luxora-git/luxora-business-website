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
  alternates: { canonical: '/sitemap' },
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
              { label: 'Homepage', href: '/' },
              { label: 'Design Gallery', href: '/gallery' },
              { label: 'Portfolio', href: '/portfolio' },
              { label: 'Interior Elements', href: '/elements' },
              { label: 'Products', href: '/products' },
            ]}
          />
        </LegalSection>

        <LegalSection title="Services">
          <LinkList links={allServices.map((s) => ({ label: s.title, href: `/services/${s.slug}` }))} />
        </LegalSection>

        <LegalSection title="Design Gallery — By Room">
          <LinkList links={galleryCategories.map((c) => ({ label: c.label, href: `/gallery/${c.slug}` }))} />
        </LegalSection>

        <LegalSection title="Interior Elements">
          <LinkList links={interiorElements.map((e) => ({ label: e.title, href: `/elements/${e.slug}` }))} />
        </LegalSection>

        <LegalSection title="Products">
          <LinkList links={products.map((p) => ({ label: p.title, href: `/products/${p.slug}` }))} />
        </LegalSection>

        <LegalSection title="Company">
          <LinkList
            links={[
              { label: 'About Us', href: '/about-us' },
              { label: 'Contact Us', href: '/contact-us' },
              { label: 'Careers', href: '/careers' },
            ]}
          />
        </LegalSection>

        <LegalSection title="Policies">
          <LinkList
            links={[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms & Conditions', href: '/terms-conditions' },
              { label: 'Disclaimer', href: '/disclaimer' },
              { label: 'Refund Policy', href: '/refund-policy' },
              { label: 'Cancellation Policy', href: '/cancellation-policy' },
              { label: 'Shipping & Delivery Policy', href: '/shipping-policy' },
            ]}
          />
        </LegalSection>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
