import HeroSection from '@/components/HeroSection';
import ExploreByRoom from '@/components/ExploreByRoom';
import ServicesSection from '@/components/ServicesSection';
import PremiumTrustSection from '@/components/PremiumTrustSection';
import BeforeAfterSection from '@/components/BeforeAfterSection';
import FeaturedProjectsSection from '@/components/FeaturedProjectsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import SmartLivingSection from '@/components/SmartLivingSection';
import LuxoraLifestyles from '@/components/LuxoraLifestyles';
import VirtualWalkthroughSection from '@/components/VirtualWalkthroughSection';
import CTASection from '@/components/CTASection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BeforeAfterSection />
      <ExploreByRoom />
      <ServicesSection />
      <SmartLivingSection />
      <LuxoraLifestyles />
      <VirtualWalkthroughSection />
      <PremiumTrustSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
