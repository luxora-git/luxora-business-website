/**
 * Content for every desktop mega menu on the global navbar. Every href here
 * must resolve to a real, already-built route — this file is the single
 * source of truth the navigation audit checks against.
 */
import { galleryCategories } from '../gallery/categories';
import { galleryStyles } from '../gallery/styles';
import { galleryCollections } from '../gallery/collections';
import { allServices } from '../services/serviceIndex';
import { interiorElements } from '../catalog/elements';
import { products } from '../catalog/products';
import { luxoraPriceCalculatorUrl } from '../global/contact';

export interface MegaMenuLink {
  label: string;
  href: string;
}

export interface MegaMenuColumn {
  heading: string;
  links: MegaMenuLink[];
}

export interface MegaMenuPreview {
  title: string;
  image: string;
  imageAlt: string;
  href: string;
}

export interface MegaMenuData {
  columns: MegaMenuColumn[];
  previews?: MegaMenuPreview[];
  previewsHeading?: string;
  viewAllHref: string;
  viewAllLabel: string;
}

/* ── Design Gallery ──────────────────────────────────────────────── */
export const galleryMenu: MegaMenuData = {
  columns: [
    {
      heading: 'Browse by Room',
      links: [
        ...galleryCategories.map((c) => ({ label: c.label, href: `/gallery/${c.slug}` })),
        { label: 'Dining', href: '/elements/dining' },
        { label: "Kids' Room", href: '/elements/kids-room' },
        { label: 'Balcony', href: '/elements/balcony' },
      ],
    },
    {
      heading: 'Browse by Style',
      links: galleryStyles.map((s) => ({ label: s.label, href: `/gallery/style/${s.slug}` })),
    },
    {
      heading: 'Collections',
      links: [
        ...galleryCollections.map((c) => ({ label: c.label, href: `/gallery/collections/${c.slug}` })),
        { label: 'Browse by Budget', href: '/gallery' },
        { label: 'Browse by Property Type', href: '/gallery' },
      ],
    },
  ],
  previewsHeading: "Editor's Picks",
  previews: [
    { title: 'The Vaishali Nagar Residence', image: '/img/AI%20BASED/LIVING%20BEDROOM%20DESIGNS/lr3.webp', imageAlt: 'Living room design concept, Jaipur', href: '/gallery/living-room/the-vaishali-nagar-residence' },
    { title: 'Malviya Nagar Master Suite', image: '/img/AI%20BASED/MASTER%20BEDROOM%20DESIGNS/mb2.webp', imageAlt: 'Master bedroom design concept, Jaipur', href: '/gallery/bedroom/malviya-nagar-master-suite' },
    { title: 'C-Scheme Kitchen Suite', image: '/img/AI%20BASED/MODULAR%20KITCHEN/mk2.webp', imageAlt: 'Modular kitchen design concept, Jaipur', href: '/gallery/kitchen/c-scheme-kitchen-suite' },
  ],
  viewAllHref: '/gallery',
  viewAllLabel: 'View Complete Gallery',
};

/* ── Services ─────────────────────────────────────────────────────── */
const half = Math.ceil(allServices.length / 2);
export const servicesMenu: MegaMenuData = {
  columns: [
    { heading: 'Residential Services', links: allServices.slice(0, half).map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
    { heading: 'Specialised Services', links: allServices.slice(half).map((s) => ({ label: s.title, href: `/services/${s.slug}` })) },
  ],
  viewAllHref: '/services/full-home-interior-design',
  viewAllLabel: 'Start a Project',
};

/* ── Portfolio ────────────────────────────────────────────────────── */
export const portfolioMenu: MegaMenuData = {
  columns: [
    {
      heading: 'Luxury Villas',
      links: [
        { label: 'Vizora House', href: '/portfolio/vizora-house' },
        { label: 'The Krish Residence', href: '/portfolio/krish-ji-residence' },
        { label: 'The Rakesh Residence', href: '/portfolio/rakesh-ji-residence' },
      ],
    },
    {
      heading: 'Apartments',
      links: [
        { label: 'The Ved Prakash Residence', href: '/portfolio/ved-prakash-residence' },
        { label: 'The Saurabh Jain Residence', href: '/portfolio/saurabh-jain-residence' },
        { label: 'The Khichar Residence', href: '/portfolio/khichar-residence' },
      ],
    },
    {
      heading: 'Office Projects',
      links: [
        { label: 'Ashrit Corporate Studio', href: '/portfolio/ashrit-corporate-studio' },
        { label: 'Bansal Office Studio', href: '/portfolio/bansal-ji-office' },
        { label: 'Eat Better Office', href: '/portfolio/eat-better-office' },
      ],
    },
  ],
  previewsHeading: 'Featured Case Studies',
  previews: [
    { title: 'The Krish Residence', image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Krish%20ji%20S.F.%20A01_View120000.webp', imageAlt: 'Living room of the Krish Residence, Jaipur', href: '/portfolio/krish-ji-residence' },
    { title: 'Vizora House', image: '/img/PROJECT%20BASED/LIVING%20ROOM%20DESIGN/Vizora%20House%20G.F.%20A01_View010000.webp', imageAlt: 'Living room of Vizora House, Jaipur', href: '/portfolio/vizora-house' },
    { title: 'The Rishabh Residence', image: '/img/PROJECT%20BASED/MASTER%20BEDROOM%20DESIGN/Rishabh%20ji%20final%20render%2001.webp', imageAlt: 'Master bedroom of the Rishabh Residence, Jaipur', href: '/portfolio/rishabh-ji-residence' },
  ],
  viewAllHref: '/portfolio',
  viewAllLabel: 'View Complete Portfolio',
};

/* ── Products ─────────────────────────────────────────────────────── */
export const productsMenu: MegaMenuData = {
  columns: [
    { heading: 'Products', links: products.map((p) => ({ label: p.title, href: `/products/${p.slug}` })) },
  ],
  viewAllHref: '/products',
  viewAllLabel: 'View All Products',
};

/* ── Interior Elements ────────────────────────────────────────────── */
const elemThird = Math.ceil(interiorElements.length / 3);
export const elementsMenu: MegaMenuData = {
  columns: [
    { heading: 'Spaces', links: interiorElements.slice(0, elemThird).map((e) => ({ label: e.title, href: `/elements/${e.slug}` })) },
    { heading: 'Surfaces & Systems', links: interiorElements.slice(elemThird, elemThird * 2).map((e) => ({ label: e.title, href: `/elements/${e.slug}` })) },
    { heading: 'Fittings & Finishes', links: interiorElements.slice(elemThird * 2).map((e) => ({ label: e.title, href: `/elements/${e.slug}` })) },
  ],
  viewAllHref: '/elements',
  viewAllLabel: 'View All Interior Elements',
};

export const priceCalculatorHref = luxoraPriceCalculatorUrl;
