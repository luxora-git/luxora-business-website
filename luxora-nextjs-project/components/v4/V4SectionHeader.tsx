interface V4SectionHeaderProps {
  eyebrow: string;
  title: string;
  titleItalic?: string;
  description?: string;
  centered?: boolean;
  light?: boolean; // for dark backgrounds
}

export default function V4SectionHeader({
  eyebrow, title, titleItalic, description, centered = true, light = false,
}: V4SectionHeaderProps) {
  const textColor = light ? '#FDFAF6' : '#2C1F14';
  const descColor = light ? 'rgba(253,250,246,0.75)' : '#6B4C3B';

  return (
    <div style={{ marginBottom: '48px', textAlign: centered ? 'center' : 'left' }}>
      <span className="text-[11px] font-semibold tracking-[0.28em] uppercase mb-5 block" style={{ color: '#C9A227' }}>
        {eyebrow}
      </span>
      <h2 className="font-playfair font-normal leading-[1.1] tracking-[-0.02em]"
        style={{ fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: textColor, margin: 0 }}>
        {title}
      </h2>
      {titleItalic && (
        <h2 className="font-playfair italic font-normal leading-[1.1] tracking-[-0.02em]"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: textColor, margin: '0 0 16px' }}>
          {titleItalic}
        </h2>
      )}
      {description && (
        <p className="text-base md:text-lg leading-relaxed font-light"
          style={{ color: descColor, maxWidth: centered ? '560px' : '100%', margin: centered ? '16px auto 0' : '16px 0 0' }}>
          {description}
        </p>
      )}
    </div>
  );
}