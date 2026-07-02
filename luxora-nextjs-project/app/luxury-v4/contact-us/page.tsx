'use client';

import { ServicePageShell } from '@/components/v4/service';
import LegalPageLayout, { LegalSection } from '@/components/v4/common/LegalPageLayout';
import { useConsultationModal } from '@/components/v4/modal';
import { luxoraContact } from '@/lib/content/global/contact';
import { luxoraColors } from '@/lib/design/luxoraDesignTokens';

export default function ContactUsPage() {
  const { open: openConsultationModal } = useConsultationModal();

  return (
    <ServicePageShell>
      <LegalPageLayout eyebrow="Get in Touch" title="Contact Luxora">
        <p className="mb-10">
          Have a project in mind, or just want to talk it through first? Reach us directly using any of the details
          below, or book a free design consultation and our team will get back to you within one business day.
        </p>

        <LegalSection title="Studio">
          <p>Jaipur, Rajasthan, India</p>
        </LegalSection>

        <LegalSection title="Phone">
          <a href={luxoraContact.phone.href} className="hover:underline" style={{ color: luxoraColors.gold }}>
            {luxoraContact.phone.display}
          </a>
        </LegalSection>

        <LegalSection title="Email">
          <a href={luxoraContact.email.href} className="hover:underline" style={{ color: luxoraColors.gold }}>
            {luxoraContact.email.display}
          </a>
        </LegalSection>

        <LegalSection title="WhatsApp">
          <a href={luxoraContact.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: luxoraColors.gold }}>
            Message us on WhatsApp
          </a>
        </LegalSection>

        <div className="mt-12">
          <button
            type="button"
            onClick={openConsultationModal}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full font-bold text-[12px] tracking-[0.10em] uppercase transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: luxoraColors.gold, color: '#1C1005', boxShadow: '0 10px 30px rgba(201,162,39,0.30)' }}
          >
            Book Free Consultation
          </button>
        </div>
      </LegalPageLayout>
    </ServicePageShell>
  );
}
