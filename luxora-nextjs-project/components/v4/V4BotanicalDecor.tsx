interface V4BotanicalDecorProps {
  side: 'left' | 'right';
  variant?: 'large' | 'small';
  className?: string;
}

export default function V4BotanicalDecor({ side, variant = 'large', className = '' }: V4BotanicalDecorProps) {
  const isLeft = side === 'left';
  const size = variant === 'large' ? 220 : 140;

  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} h-full pointer-events-none overflow-hidden ${className}`}
      style={{ width: `${size}px`, zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%" height="100%"
        viewBox="0 0 220 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ transform: isLeft ? 'none' : 'scaleX(-1)', opacity: 0.085 }}
      >
        <path d="M20,80 Q60,120 40,200 Q30,260 80,300 Q120,340 100,420 Q85,480 110,540"
          fill="none" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M40,200 Q-10,180 -30,140" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M55,240 Q5,220 -15,190" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M65,280 Q20,265 0,240" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M78,320 Q35,310 15,285" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M40,200 Q90,175 110,140" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M55,240 Q110,220 128,192" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M65,280 Q125,268 142,240" fill="none" stroke="#C9A227" strokeWidth="1" strokeLinecap="round" />
        <path d="M5,350 Q50,390 30,460 Q20,500 60,540" fill="none" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M30,460 Q-15,445 -30,415" fill="none" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M30,460 Q75,445 88,415" fill="none" stroke="#C9A227" strokeWidth="0.8" strokeLinecap="round" />
        <circle cx="110" cy="80" r="3" fill="none" stroke="#C9A227" strokeWidth="1" />
        <circle cx="115" cy="90" r="1.5" fill="#C9A227" />
      </svg>
    </div>
  );
}