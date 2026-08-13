'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/lib/useScrollReveal';
import {
  V4Navbar,
  V4HeroSection,
  V4ServicesSection,
  V4ProcessSection,
  V4PremiumTrustSection,
  V4BeforeAfterSection,
  V4DesignGallerySection,
  V4PortfolioShowcaseSection,
  V4VirtualWalkthroughSection,
  V4FurnitureCollectionSection,
  V4SmartLivingSection,
  V4TestimonialsSection,
  V4FooterSection,
  V4SmoothScroll,
} from '@/components/v4';
import GlobalClosingCTA from '@/components/v4/common/GlobalClosingCTA';

// Stacking layer — gives the bonito.in section-over-section scroll effect
function Layer({ children, z }: { children: React.ReactNode; z: number }) {
  return (
    <div style={{ position: 'relative', zIndex: z }}>
      {children}
    </div>
  );
}

export default function HomeClient() {
  useScrollReveal({ selector: '[data-v4-reveal]',         threshold: 0.08, stagger: 0.06, duration: 0.7,  y: 30 });
  useScrollReveal({ selector: '[data-v4-reveal-heading]', threshold: 0.10, stagger: 0.05, duration: 0.55, y: 24 });

  return (
    <>
      <V4SmoothScroll />
      <motion.div
        style={{ minHeight: '100vh', backgroundColor: '#F5EFE6' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <V4Navbar />

        {/* Hero — base layer, not sticky */}
        <V4HeroSection />

        {/* All sections stack over each other as user scrolls */}
        <Layer z={10}><V4ServicesSection /></Layer>
        <Layer z={11}><V4ProcessSection /></Layer>
        <Layer z={13}><V4PremiumTrustSection /></Layer>
        <Layer z={13.5}><V4BeforeAfterSection /></Layer>
        <Layer z={14}><V4DesignGallerySection /></Layer>
        <Layer z={14.5}><V4PortfolioShowcaseSection /></Layer>
        <Layer z={15}><V4VirtualWalkthroughSection /></Layer>
        <Layer z={16}><V4FurnitureCollectionSection /></Layer>
        <Layer z={17}><V4SmartLivingSection /></Layer>
        <Layer z={18}><V4TestimonialsSection /></Layer>
        <Layer z={19}>
          <GlobalClosingCTA
            eyebrow="Start Your Journey"
            title="Ready To Transform"
            titleItalic="Your Dream Space?"
            description="Book a free site visit and consultation — no obligation, no pressure, just a clear plan for your home."
            image="/img/General/hero-banner-living-1.webp"
            imageAlt="Fully styled luxury living room in a completed Luxora home"
          />
        </Layer>
        <Layer z={20}><V4FooterSection /></Layer>
      </motion.div>
    </>
  );
}
