'use client';

export default function LuxuryUtilityBar() {
  return (
    <div className="relative w-full bg-[#061D4D] h-[38px] md:h-[40px] z-[60]">
      <div className="h-full max-w-[90rem] mx-auto px-8 md:px-12 lg:px-16 flex items-center justify-center">
        <div className="flex items-center gap-3 md:gap-5 text-[10px] md:text-[11px] tracking-[0.12em] uppercase font-medium text-luxora-gold/80">
          <span className="text-white/60">Free Site Visit</span>
          <span className="text-luxora-gold/30 text-[6px]">|</span>
          <span className="text-white/60">3D Design Preview</span>
          <span className="text-luxora-gold/30 text-[6px]">|</span>
          <span className="text-white/60">Transparent Pricing</span>
          <span className="text-luxora-gold/30 text-[6px]">|</span>
          <span className="text-white/60">10 Year Warranty</span>
        </div>
      </div>
    </div>
  );
}