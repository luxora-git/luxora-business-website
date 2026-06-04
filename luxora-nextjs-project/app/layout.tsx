import type { Metadata } from "next";
import './globals.css';
import PremiumNavbar from '@/components/PremiumNavbar';

export const metadata: Metadata = {
  title: 'Luxora Interiors | Premium Interior Design Consultancy',
  description: 'Premium interior design consultancy and architectural solutions tailored to your vision. Luxora combines architectural precision with interior artistry to create spaces that reflect your personality and lifestyle.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-inter bg-luxora-cream text-luxora-charcoal">
        <PremiumNavbar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
