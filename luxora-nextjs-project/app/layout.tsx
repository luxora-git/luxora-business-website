import type { Metadata } from "next";
import './globals.css';
import { ConsultationModalProvider } from '@/components/v4/modal';
import { LightboxProvider } from '@/components/v4/lightbox';
import JsonLd from '@/components/seo/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo/schema';
import {
  SITE_ORIGIN,
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_LANG,
  BRAND,
  DEFAULT_OG_IMAGE,
} from '@/lib/seo/siteConfig';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'Luxora Interiors — Interior Designers in Jaipur',
    template: '%s | Luxora Interiors',
  },
  description: SITE_DESCRIPTION,
  applicationName: BRAND.name,
  openGraph: {
    type: 'website',
    siteName: BRAND.name,
    locale: SITE_LOCALE,
    title: 'Luxora Interiors — Interior Designers in Jaipur',
    description: SITE_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxora Interiors — Interior Designers in Jaipur',
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LANG} className="scroll-smooth">
      <body className="font-inter bg-luxora-cream text-luxora-charcoal">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <ConsultationModalProvider>
          <LightboxProvider>
            <main className="min-h-screen">
              {children}
            </main>
          </LightboxProvider>
        </ConsultationModalProvider>
      </body>
    </html>
  );
}