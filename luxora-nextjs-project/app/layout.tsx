import type { Metadata } from "next";
import './globals.css';
import { ConsultationModalProvider } from '@/components/v4/modal';
import { LightboxProvider } from '@/components/v4/lightbox';

export const metadata: Metadata = {
  metadataBase: new URL('https://luxora.in'),
  title: 'Luxora Interiors | Premium Interior Design Consultancy',
  description:
    'Premium interior design consultancy and architectural solutions tailored to your vision. Luxora combines architectural precision with interior artistry to create spaces that reflect your personality and lifestyle.',
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
    <html lang="en" className="scroll-smooth">
      <body className="font-inter bg-luxora-cream text-luxora-charcoal">
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