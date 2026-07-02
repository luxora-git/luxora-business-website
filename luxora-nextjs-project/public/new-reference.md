# LUXORA HOMEPAGE — EXACT FIGMA REDESIGN PROMPT FOR CLINE

## 🚨 SCOPE LOCK — READ THIS FIRST BEFORE ANYTHING ELSE

**These changes are EXCLUSIVELY for the V4 version of the homepage.**
The project has multiple homepage versions (v1, v2, v3, v4, etc.). You must ONLY touch V4 files.

### Files you are ALLOWED to modify or create:
- `app/(routes)/luxury-v4/` — the V4 page route and its files
- `components/sections/v4/` — V4-specific section components (create this folder if it doesn't exist)
- `components/ui/v4/` — V4-specific UI components like BotanicalDecor, SectionHeader (create if needed)
- Any file that has `v4` in its path or filename

### Files you are STRICTLY FORBIDDEN from touching:
- `globals.css` or any global stylesheet — **DO NOT edit** (changes would affect all versions)
- `tailwind.config.js` / `tailwind.config.ts` — **DO NOT edit**
- `app/layout.tsx` or `app/(routes)/layout.tsx` — **DO NOT edit**
- `components/sections/` (root level, non-v4) — **DO NOT edit**
- `components/ui/` (root level, non-v4) — **DO NOT edit**
- Any file inside `luxury-v1/`, `luxury-v2/`, `luxury-v3/` folders — **DO NOT touch**
- Any shared/common component that other versions depend on

### How to handle CSS Variables and Fonts for V4:
Instead of editing `globals.css`, add all V4-specific CSS inside the V4 page or a V4-scoped stylesheet:

```tsx
// At the top of app/(routes)/luxury-v4/page.tsx or in a v4-specific layout:
// Use a <style> tag or a V4-scoped CSS module

// Option A — inline style tag in the V4 page component:
<style>{`
  .luxora-v4 {
    --lux-cream: #F8F0DC;
    --lux-gold: #C8A44A;
    /* ... all v4 variables ... */
  }
`}</style>

// Wrap the entire V4 page in: <div className="luxora-v4">...</div>
// This scopes ALL v4 styles to only that page.
```

```tsx
// Option B — create app/(routes)/luxury-v4/v4.css (new file, V4 only):
// Import it only inside the V4 page/layout file.
// Do NOT import it in globals.css or root layout.
```

### For Google Fonts in V4:
Do NOT add fonts to the root `layout.tsx`. Instead add a `<Head>` or `<link>` tag only inside the V4 page or its local layout file (`app/(routes)/luxury-v4/layout.tsx` — create if needed).

### Verification before each file edit:
Before editing ANY file, ask yourself:
> "Does this file path contain 'v4' OR is this a brand-new file I am creating inside a v4 folder?"
> If NO → **do not touch it**.

---

## ⚠️ CRITICAL RULES
1. **DO NOT TOUCH** the Hero/HeroSlider component or its section at all. Keep it 100% as-is.
2. Redesign ALL other sections to exactly match the Figma reference.
3. Read this entire prompt before writing a single line of code.
4. Implement section by section, commit after each section.
5. **SCOPE CHECK after every file change** — confirm the file is inside a v4 path.

---

## STEP 1 — V4 DESIGN SYSTEM SETUP

### 1A. Create V4-scoped CSS file

**Create NEW file:** `app/(routes)/luxury-v4/v4.module.css`
(Do NOT edit globals.css)

```css
/* V4-ONLY design tokens — scoped to .v4Wrapper */
/* This file is imported ONLY in luxury-v4/page.tsx */

.v4Wrapper {
  /* Core backgrounds */
  --lux-cream:        #F8F0DC;
  --lux-cream-dark:   #F0E6C8;
  --lux-cream-card:   #FFFFFF;

  /* Gold system */
  --lux-gold:         #C8A44A;
  --lux-gold-hover:   #A8842A;
  --lux-gold-light:   rgba(200, 164, 74, 0.10);
  --lux-gold-border:  rgba(200, 164, 74, 0.25);

  /* Text */
  --lux-text-dark:    #1C1005;
  --lux-text-mid:     #6B5535;
  --lux-text-light:   #9B8B6A;

  /* Shadows */
  --lux-shadow-sm:    0 2px 12px rgba(26, 16, 5, 0.06);
  --lux-shadow-md:    0 6px 28px rgba(26, 16, 5, 0.09);
  --lux-shadow-lg:    0 16px 48px rgba(26, 16, 5, 0.12);

  /* Page background */
  background-color: #F8F0DC;
  color: #1C1005;
}
```

### 1B. Wrap V4 page with the scoped class

**Edit ONLY:** `app/(routes)/luxury-v4/page.tsx`

```tsx
import styles from './v4.module.css';

export default function LuxuryV4Page() {
  return (
    <div className={styles.v4Wrapper}>
      {/* All V4 sections go here */}
    </div>
  );
}
```

### 1C. Add Google Fonts to V4-only layout

**Create NEW file:** `app/(routes)/luxury-v4/layout.tsx`
(If it already exists, edit ONLY that file — do NOT touch root layout.tsx)

```tsx
export default function LuxuryV4Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      {children}
    </>
  );
}
```

### 1D. Create Reusable `BotanicalDecor` Component

**Create NEW file:** `components/ui/v4/BotanicalDecor.tsx`
(New file inside v4 subfolder — does NOT affect other versions)

```tsx
// This component renders the tropical palm leaf SVG decorations
// that appear on the left and right edges of several sections.
// They are a KEY visual element of the Figma design — gold stroke, ~8% opacity.

interface BotanicalDecorProps {
  side: 'left' | 'right';
  variant?: 'large' | 'small';
  className?: string;
}

export default function BotanicalDecor({ side, variant = 'large', className = '' }: BotanicalDecorProps) {
  const isLeft = side === 'left';
  
  return (
    <div
      className={`absolute top-0 ${isLeft ? 'left-0' : 'right-0'} h-full pointer-events-none overflow-hidden ${className}`}
      style={{ width: variant === 'large' ? '220px' : '140px', zIndex: 0 }}
      aria-hidden="true"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 600"
        preserveAspectRatio="xMidYMid meet"
        style={{
          transform: isLeft ? 'none' : 'scaleX(-1)',
          opacity: 0.085,
        }}
      >
        {/* Main large palm frond */}
        <path
          d="M20,80 Q60,120 40,200 Q30,260 80,300 Q120,340 100,420 Q85,480 110,540"
          fill="none"
          stroke="#C8A44A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Frond leaflets left side */}
        <path d="M40,200 Q-10,180 -30,140 Q-40,120 -20,100" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        <path d="M55,240 Q5,220 -15,190 Q-25,170 -5,155" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        <path d="M65,280 Q20,265 0,240 Q-10,220 5,205" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        <path d="M78,320 Q35,310 15,285 Q5,265 22,250" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        {/* Frond leaflets right side */}
        <path d="M40,200 Q90,175 110,140 Q120,118 100,105" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        <path d="M55,240 Q110,220 128,192 Q138,172 118,158" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        <path d="M65,280 Q125,268 142,240 Q152,218 130,205" fill="none" stroke="#C8A44A" strokeWidth="1" strokeLinecap="round" />
        {/* Secondary smaller frond */}
        <path
          d="M5,350 Q50,390 30,460 Q20,500 60,540"
          fill="none"
          stroke="#C8A44A"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path d="M30,460 Q-15,445 -30,415" fill="none" stroke="#C8A44A" strokeWidth="0.8" strokeLinecap="round" />
        <path d="M30,460 Q75,445 88,415" fill="none" stroke="#C8A44A" strokeWidth="0.8" strokeLinecap="round" />
        {/* Circular decorative dots */}
        <circle cx="110" cy="80" r="3" fill="none" stroke="#C8A44A" strokeWidth="1" />
        <circle cx="115" cy="90" r="1.5" fill="#C8A44A" />
        <circle cx="5" cy="460" r="2.5" fill="none" stroke="#C8A44A" strokeWidth="1" />
      </svg>
    </div>
  );
}
```

### 1E. Global Section Heading Pattern

Create reusable `SectionHeader` component:

**Create NEW file:** `components/ui/v4/SectionHeader.tsx`

```tsx
// components/ui/v4/SectionHeader.tsx
interface SectionHeaderProps {
  eyebrow: string;       // e.g. "OUR SERVICES"
  title: string;         // first line of heading
  titleItalic?: string;  // optional italic second line
  description?: string;
  centered?: boolean;
}

export default function SectionHeader({ eyebrow, title, titleItalic, description, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px',
        fontWeight: 500,
        letterSpacing: '4px',
        textTransform: 'uppercase',
        color: '#C8A44A',
        display: 'block',
        marginBottom: '12px',
      }}>
        {eyebrow}
      </span>
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(32px, 3.5vw, 46px)',
        fontWeight: 400,
        color: '#1C1005',
        lineHeight: 1.2,
        marginBottom: titleItalic ? '0' : '16px',
      }}>
        {title}
      </h2>
      {titleItalic && (
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 3.5vw, 46px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: '#1C1005',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          {titleItalic}
        </h2>
      )}
      {description && (
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '15px',
          color: '#6B5535',
          lineHeight: 1.8,
          maxWidth: centered ? '560px' : '100%',
          margin: centered ? '0 auto' : '0',
        }}>
          {description}
        </p>
      )}
    </div>
  );
}
```

---

## STEP 2 — SERVICES SECTION

**File:** `components/sections/v4/ServicesSection.tsx` (create new file in v4 folder)

### Layout & Background
```
Background: #F8F0DC
Position: relative
Overflow: hidden
Padding: 100px 0
```

### Structure (top to bottom)
1. BotanicalDecor side="left"
2. BotanicalDecor side="right"  
3. Centered container (max-width: 1200px, padding: 0 24px):
   - SectionHeader with eyebrow="OUR SERVICES", title="Complete Interior Solutions", titleItalic="Crafted Around Your Lifestyle"
   - Description text centered
4. 3×2 Card Grid

### Service Cards — EXACT SPECS

```tsx
// Each card structure:
<div style={{
  background: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(26,16,5,0.07)',
  overflow: 'visible',
  position: 'relative',
}}>
  {/* Image wrapper */}
  <div style={{ position: 'relative', borderRadius: '16px 16px 0 0', overflow: 'hidden', aspectRatio: '4/3' }}>
    <Image src={...} alt={...} fill style={{ objectFit: 'cover' }} />
    
    {/* GOLD CIRCULAR NUMBER BADGE — top-right of image */}
    <div style={{
      position: 'absolute',
      top: '12px',
      right: '12px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#C8A44A',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF',
      fontFamily: "'Playfair Display', serif",
      fontSize: '15px',
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(200,164,74,0.4)',
    }}>
      {cardNumber}  {/* 01, 02, 03 ... */}
    </div>
  </div>
  
  {/* Text content */}
  <div style={{ padding: '18px 20px 22px' }}>
    <h3 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '18px',
      fontWeight: 600,
      color: '#1C1005',
      marginBottom: '8px',
    }}>
      {title}
    </h3>
    <p style={{
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px',
      color: '#6B5535',
      lineHeight: 1.6,
    }}>
      {description}
    </p>
  </div>
</div>
```

### Grid CSS
```css
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 24px;
```

### 6 Service Cards Content
1. Number: "01" | Title: "Residential Designing" 
2. Number: "02" | Title: "Luxury Living Upgrades"
3. Number: "03" | Title: "Studio Property Design"
4. Number: "04" | Title: "Interior & Digital Renders"
5. Number: "05" | Title: "Elegant Home Design"
6. Number: "06" | Title: "Construction With 100% Design"

---

## STEP 3 — PORTFOLIO SECTION ("Bringing Your Vision to Life")

**Background:** #FFFFFF
**Padding:** 90px 0

### Structure
1. SectionHeader — eyebrow="OUR PORTFOLIO", title="Bringing Your Vision", titleItalic="to Life"
2. Room Tab Navigation
3. Large Main Image (full-width with arrows)
4. Floating Stats Bar (overlaps image bottom)

### Tab Navigation
```tsx
// Horizontal scrollable tab row
// Active tab: gold bottom border 2px + dark text
// Inactive: #9B8B6A text, no border
// Font: DM Sans 14px, 500 weight
// Tabs: "Grand Living Room" | "Master Bedroom" | "Modular Kitchen" | "Dining Area" | "Study Room"
// Bottom border on container: 1px solid rgba(200,164,74,0.2)
// Active indicator: position absolute, bottom: -1px, height: 2px, bg: #C8A44A
```

### Main Image Container
```tsx
<div style={{
  position: 'relative',
  borderRadius: '24px',
  overflow: 'hidden',
  width: '100%',
  aspectRatio: '16/8',
  marginTop: '24px',
}}>
  <Image src={portfolioImage} alt="..." fill style={{ objectFit: 'cover' }} />
  
  {/* Left Arrow Button */}
  <button style={{
    position: 'absolute', left: '20px', top: '50%',
    transform: 'translateY(-50%)',
    width: '48px', height: '48px', borderRadius: '50%',
    background: 'rgba(255,255,255,0.92)',
    border: 'none', cursor: 'pointer',
    boxShadow: '0 4px 16px rgba(26,16,5,0.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    ← {/* or chevron icon, color: #C8A44A */}
  </button>
  
  {/* Right Arrow Button — same styles, right: 20px */}
</div>
```

### Floating Stats Bar
```tsx
// This OVERLAPS the bottom of the image — critical detail
<div style={{
  background: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 8px 40px rgba(26,16,5,0.12)',
  padding: '20px 40px',
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '0',
  marginTop: '-40px',        // NEGATIVE MARGIN — overlaps image
  position: 'relative',
  zIndex: 10,
  maxWidth: '800px',
  margin: '-40px auto 0',
}}>
  {/* Each metric: */}
  <div style={{ textAlign: 'center', borderRight: '1px solid rgba(200,164,74,0.2)', padding: '0 24px' }}>
    <div style={{ fontFamily: "'DM Sans'", fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: '#C8A44A', marginBottom: '6px' }}>
      AREA
    </div>
    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 600, color: '#1C1005' }}>
      2,400 Sq.Ft
    </div>
  </div>
  {/* Repeat for: Budget (₹1 Cr), Timeline (2.5 Weeks), Rooms (4 Rooms) */}
  {/* Last item: no border-right */}
</div>
```

---

## STEP 4 — STATS SECTION ("Creating Spaces That Reflect You")

**Background:** #F8F0DC with BotanicalDecor left and right
**Padding:** 100px 0

### Layout — CRITICAL: 3-column symmetric

```
[LEFT 2 stats column] [CENTER large image] [RIGHT 2 stats column]
```

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1.6fr 1fr',
  gap: '40px',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto',
}}>
  {/* LEFT STATS — 2 stats stacked */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'right' }}>
    <StatItem number="450" label="Projects Completed" />
    <StatItem number="10" label="Years Experience" />
  </div>
  
  {/* CENTER IMAGE */}
  <div style={{
    borderRadius: '32px',
    overflow: 'hidden',
    border: '2px solid rgba(200,164,74,0.3)',
    boxShadow: '0 20px 60px rgba(26,16,5,0.15)',
    aspectRatio: '4/5',
  }}>
    <Image src={statsImage} alt="luxury interior" fill style={{ objectFit: 'cover' }} />
  </div>
  
  {/* RIGHT STATS — 2 stats stacked */}
  <div style={{ display: 'flex', flexDirection: 'column', gap: '48px', textAlign: 'left' }}>
    <StatItem number="98" label="Client Satisfaction" />
    <StatItem number="50" label="Design Themes" />
  </div>
</div>
```

### StatItem Component
```tsx
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(42px, 4vw, 58px)',
        fontWeight: 400,
        color: '#1C1005',
        lineHeight: 1,
      }}>
        {number}
        <span style={{ color: '#C8A44A', fontSize: '0.7em' }}>+</span>
      </div>
      <div style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '2.5px',
        textTransform: 'uppercase',
        color: '#9B8B6A',
        marginTop: '8px',
      }}>
        {label}
      </div>
      {/* Thin divider line below label */}
      <div style={{ width: '40px', height: '1px', background: 'rgba(200,164,74,0.4)', marginTop: '12px' }} />
    </div>
  );
}
```

---

## STEP 5 — GALLERY SECTION ("Discover Inspiring Spaces")

**Background:** #FFFFFF
**Padding:** 90px 0

### Section Header
eyebrow="OUR GALLERY", title="Discover Inspiring Spaces", titleItalic="Crafted For Every Room"

### MASONRY GRID LAYOUT — EXACT structure from Figma

```tsx
// Use CSS Grid with specific row heights to create masonry effect
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(12, 1fr)',
  gridTemplateRows: 'auto auto',
  gap: '16px',
  maxWidth: '1400px',
  margin: '0 auto',
}}>
  {/* Image 1: LARGE landscape — spans 6 cols, row 1 */}
  {/* Image 2: portrait — spans 3 cols, row 1 */}
  {/* Image 3: landscape — spans 3 cols, row 1 */}
  {/* Image 4-7: 4 equal images — each 3 cols, row 2 */}
</div>
```

OR use CSS columns approach:
```tsx
<div style={{
  columns: '4',
  columnGap: '16px',
  maxWidth: '1400px',
  margin: '0 auto',
}}>
  {galleryImages.map((img, i) => (
    <GalleryCard key={i} image={img} number={i+1} label={img.roomType} />
  ))}
</div>
```

### Gallery Card Component
```tsx
function GalleryCard({ image, number, label }: GalleryCardProps) {
  return (
    <div style={{
      position: 'relative',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '16px',
      breakInside: 'avoid',
      cursor: 'pointer',
    }}>
      <Image src={image.src} alt={label} width={400} height={image.height} style={{ width: '100%', height: 'auto', display: 'block' }} />
      
      {/* Dark gradient overlay — bottom to mid */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(26,16,5,0.65) 0%, transparent 50%)',
        transition: 'opacity 0.3s',
      }} />
      
      {/* Gold circular number badge — top-right */}
      <div style={{
        position: 'absolute', top: '12px', right: '12px',
        width: '34px', height: '34px', borderRadius: '50%',
        background: '#C8A44A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#FFFFFF',
        fontFamily: "'Playfair Display', serif",
        fontSize: '13px', fontWeight: 600,
      }}>
        {String(number).padStart(2, '0')}
      </div>
      
      {/* Room type label — bottom-left GOLD PILL */}
      <div style={{
        position: 'absolute', bottom: '14px', left: '14px',
        background: 'rgba(200,164,74,0.88)',
        backdropFilter: 'blur(4px)',
        color: '#FFFFFF',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '11px', fontWeight: 500,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        padding: '5px 14px',
        borderRadius: '20px',
      }}>
        {label}
      </div>
    </div>
  );
}
```

### Gallery Images (7 total)
Room types: "Living Room", "Master Bedroom", "Modular Kitchen", "Dining Area", "Home Office", "Bathroom", "Balcony"

---

## STEP 6 — 3D VIEWER SECTION ("Explore Every Corner")

**CRITICAL: This is a DARK SECTION — do not use cream background**
**Background:** #1C1005 (very dark warm brown, almost black)
**Padding:** 0 (full-bleed)

### Section heading area (above viewer)
```
Background: #F8F0DC (cream, contrast transition)
Padding: 60px 0 40px
SectionHeader: eyebrow="VIRTUAL TOUR", title="Explore Every Corner", titleItalic="Before It Comes Alive"
```

### Main Viewer Container
```tsx
<div style={{
  background: '#1C1005',
  display: 'flex',
  height: '520px',
  position: 'relative',
}}>
  
  {/* LEFT CATEGORY PANEL — 260px wide */}
  <div style={{
    width: '260px',
    flexShrink: 0,
    background: 'rgba(255,255,255,0.04)',
    borderRight: '1px solid rgba(200,164,74,0.15)',
    padding: '28px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }}>
    {categories.map((cat, i) => (
      <button key={i} style={{
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: isActive ? 'rgba(200,164,74,0.12)' : 'transparent',
        borderLeft: isActive ? '3px solid #C8A44A' : '3px solid transparent',
        color: isActive ? '#C8A44A' : 'rgba(255,255,255,0.6)',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        cursor: 'pointer',
        border: 'none',
        textAlign: 'left',
        transition: 'all 0.2s',
      }}>
        <span style={{ fontSize: '16px' }}>{cat.icon}</span>
        {cat.name}
      </button>
    ))}
  </div>
  {/* Categories: 🛋 Living Room | 🛏 Bedroom | 🍳 Kitchen | 🛁 Bathroom | 🌿 Balcony | 📚 Study Room */}
  
  {/* MAIN IMAGE AREA */}
  <div style={{ flex: 1, position: 'relative' }}>
    <Image src={panoramicImage} alt="3D virtual tour" fill style={{ objectFit: 'cover' }} />
    
    {/* Navigation arrows */}
    <button style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFFFFF', cursor: 'pointer' }}>←</button>
    <button style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', /* same styles */ }}>→</button>
    
    {/* Top-right icons (share, fullscreen) */}
    <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
      {/* 2 circular white icon buttons: share + expand */}
    </div>
    
    {/* BOTTOM THUMBNAIL ROW */}
    <div style={{
      position: 'absolute', bottom: '0', left: '0', right: '0',
      background: 'linear-gradient(to top, rgba(28,16,5,0.9), transparent)',
      padding: '40px 20px 16px',
      display: 'flex',
      gap: '10px',
    }}>
      {thumbnails.map((thumb, i) => (
        <div key={i} style={{
          width: '80px', height: '56px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: isActive ? '2px solid #C8A44A' : '2px solid rgba(255,255,255,0.2)',
          cursor: 'pointer',
          flexShrink: 0,
        }}>
          <Image src={thumb} alt="" width={80} height={56} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
        </div>
      ))}
    </div>
  </div>
</div>
```

---

## STEP 7 — FURNITURE SECTION ("Wide Collection Of Designer Furniture")

**Background:** #F8F0DC with BotanicalDecor left and right
**Padding:** 90px 0

### Section Header: centered
eyebrow="FURNITURE COLLECTION", title="Wide Collection Of Designer Furniture", titleItalic="For Every Space"

### Two-Column Layout

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '280px 1fr',
  gap: '40px',
  maxWidth: '1200px',
  margin: '48px auto 0',
  alignItems: 'start',
}}>
  {/* LEFT SIDEBAR */}
  <div>
    <h3 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: '20px',
      fontWeight: 600,
      color: '#1C1005',
      marginBottom: '24px',
      lineHeight: 1.3,
    }}>
      Explore Our<br />Furniture Range
    </h3>
    
    {/* Category list */}
    {categories.map((cat, i) => (
      <div key={i} style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 0',
        borderBottom: '1px solid rgba(200,164,74,0.12)',
        cursor: 'pointer',
      }}>
        {/* Active dot */}
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: isActive ? '#C8A44A' : 'rgba(200,164,74,0.3)',
          flexShrink: 0,
        }} />
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '14px',
          color: isActive ? '#1C1005' : '#9B8B6A',
          fontWeight: isActive ? 500 : 400,
        }}>
          {cat.name}
        </span>
        {/* Count badge */}
        <span style={{
          marginLeft: 'auto',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: '#C8A44A',
        }}>
          {cat.count}
        </span>
      </div>
    ))}
    {/* Categories: Sofa & Seating | Beds & Wardrobes | Dining Sets | Lighting | Decor & Accessories | Outdoor */}
  </div>
  
  {/* RIGHT CONTENT */}
  <div>
    {/* Main large product image */}
    <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9' }}>
      <Image src={mainProductImage} alt="Luxora Edit" fill style={{ objectFit: 'cover' }} />
      {/* "The Luxora Edit" overlay label */}
      <div style={{
        position: 'absolute',
        bottom: '20px', left: '20px',
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '22px',
        color: '#FFFFFF',
        textShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        The Luxora Edit
      </div>
    </div>
    
    {/* Product thumbnails row */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
      marginTop: '16px',
    }}>
      {products.map((product, i) => (
        <div key={i} style={{ cursor: 'pointer' }}>
          <div style={{ borderRadius: '12px', overflow: 'hidden', aspectRatio: '1', background: '#FFFFFF', marginBottom: '8px' }}>
            <Image src={product.image} alt={product.name} width={160} height={160} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', color: '#1C1005', marginBottom: '2px' }}>{product.name}</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#C8A44A' }}>₹{product.price}</div>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Bottom Stats Row (below the grid)
```tsx
<div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: '0',
  marginTop: '56px',
  background: '#FFFFFF',
  borderRadius: '16px',
  boxShadow: '0 4px 24px rgba(26,16,5,0.06)',
  padding: '28px 0',
  maxWidth: '800px',
  margin: '56px auto 0',
}}>
  {[
    { number: '10,000+', label: 'Furniture Pieces' },
    { number: '500+',    label: 'Partner Brands' },
    { number: '300+',    label: 'Style Themes' },
  ].map((stat, i) => (
    <div key={i} style={{
      flex: 1,
      textAlign: 'center',
      borderRight: i < 2 ? '1px solid rgba(200,164,74,0.2)' : 'none',
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, color: '#C8A44A' }}>{stat.number}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9B8B6A', marginTop: '4px' }}>{stat.label}</div>
    </div>
  ))}
</div>
```

---

## STEP 8 — SMART HOME SECTION ("Live Smarter With Luxora")

**Background:** #FFFFFF
**Padding:** 90px 0

### Two-Column Layout

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
  alignItems: 'center',
}}>
  {/* LEFT: Large dark interior image */}
  <div style={{
    borderRadius: '24px',
    overflow: 'hidden',
    border: '2px solid rgba(200,164,74,0.25)',
    boxShadow: '0 20px 60px rgba(26,16,5,0.15)',
    aspectRatio: '4/5',
  }}>
    <Image src={smartHomeImage} alt="smart home" fill style={{ objectFit: 'cover' }} />
  </div>
  
  {/* RIGHT: Content + Toggles */}
  <div>
    <SectionHeader
      eyebrow="SMART LIVING"
      title="Live Smarter"
      titleItalic="With Luxora"
      description="Experience the luxury of light, climate, and ambiance — all at your fingertips."
      centered={false}
    />
    
    {/* Toggle list */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      {smartFeatures.map((feature, i) => (
        <div key={i} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px 0',
          borderBottom: '1px solid rgba(200,164,74,0.12)',
        }}>
          {/* Icon */}
          <div style={{
            width: '40px', height: '40px', borderRadius: '10px',
            background: 'rgba(200,164,74,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#C8A44A', fontSize: '18px',
          }}>
            {feature.icon}
          </div>
          
          {/* Label */}
          <span style={{
            flex: 1,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 500,
            color: '#1C1005',
          }}>
            {feature.name}
          </span>
          
          {/* iOS TOGGLE SWITCH — EXACT STYLING */}
          <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', cursor: 'pointer' }}>
            <input type="checkbox" defaultChecked={feature.defaultOn} style={{ opacity: 0, width: 0, height: 0 }} />
            <span style={{
              position: 'absolute', inset: 0,
              background: feature.defaultOn ? '#C8A44A' : '#E0D5C5',
              borderRadius: '26px',
              transition: 'background 0.25s',
            }}>
              <span style={{
                position: 'absolute',
                width: '20px', height: '20px',
                background: '#FFFFFF',
                borderRadius: '50%',
                top: '3px',
                left: feature.defaultOn ? '25px' : '3px',
                transition: 'left 0.25s',
                boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              }} />
            </span>
          </label>
        </div>
      ))}
    </div>
  </div>
</div>
```

### Smart Features Data (6 items with emojis as icons)
```tsx
const smartFeatures = [
  { name: 'Ambient Lighting',  icon: '💡', defaultOn: true  },
  { name: 'Ceiling Fan',       icon: '🌀', defaultOn: true  },
  { name: 'Television',        icon: '📺', defaultOn: false },
  { name: 'Sound System',      icon: '🔊', defaultOn: true  },
  { name: 'Climate Control',   icon: '❄️', defaultOn: true  },
  { name: 'Security System',   icon: '🔒', defaultOn: false },
];
```
> Note: Replace emoji with Lucide or Heroicon SVGs for production quality. Use Lucide icons: `Lightbulb`, `Wind`, `Tv`, `Volume2`, `Thermometer`, `Lock`

---

## STEP 9 — REAL HOMES SECTION ("Real Homes. Beautifully Designed Experiences")

**Background:** #F8F0DC with BotanicalDecor left and right
**Padding:** 90px 0

### Section Header (MUST match Figma exactly)
eyebrow="REAL HOMES"  
title="Real Homes. Beautifully Designed"  
titleItalic="Experiences"

### Cards Grid
```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  maxWidth: '1100px',
  margin: '48px auto 0',
}}>
  {/* Card 1: "4 BHK Luxury Interior" */}
  <div style={{
    position: 'relative',
    borderRadius: '20px',
    overflow: 'hidden',
    aspectRatio: '16/10',
    cursor: 'pointer',
  }}>
    <Image src={homes[0].image} alt="4 BHK Luxury Interior" fill style={{ objectFit: 'cover' }} />
    
    {/* Dark gradient overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(to top, rgba(28,16,5,0.80) 0%, rgba(28,16,5,0.2) 50%, transparent 100%)',
    }} />
    
    {/* Play button center */}
    <div style={{
      position: 'absolute',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60px', height: '60px',
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.18)',
      backdropFilter: 'blur(6px)',
      border: '2px solid rgba(255,255,255,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#FFFFFF',
      fontSize: '20px',
    }}>
      ▶
    </div>
    
    {/* Property type badge — GOLD PILL, bottom-left */}
    <div style={{
      position: 'absolute',
      bottom: '16px', left: '16px',
      background: '#C8A44A',
      color: '#FFFFFF',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '11px', fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      padding: '5px 14px',
      borderRadius: '20px',
    }}>
      4 BHK
    </div>
    
    {/* Title — bottom, above badge */}
    <div style={{
      position: 'absolute',
      bottom: '44px', left: '16px', right: '16px',
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#FFFFFF', marginBottom: '4px' }}>
        4 BHK Luxury Interior
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.75)' }}>
        Designed by Luxora • Jaipur
      </div>
    </div>
  </div>
  
  {/* Card 2: "Get to Know About Luxora" — brand highlight card */}
  {/* Same structure, different content. Title: "Get to Know About Luxora", badge: "BRAND STORY" */}
</div>
```

### Dot Pagination
```tsx
<div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
  {[0,1,2].map(i => (
    <div key={i} style={{
      width: i === activeSlide ? '24px' : '8px',
      height: '8px',
      borderRadius: '4px',
      background: i === activeSlide ? '#C8A44A' : 'rgba(200,164,74,0.3)',
      transition: 'all 0.3s',
    }} />
  ))}
</div>
```

---

## STEP 10 — FOOTER

**Background:** #F8F0DC
**Border-top:** 1px solid rgba(200,164,74,0.25)
**Padding:** 64px 0 32px

### 4-Column Layout
```tsx
<footer style={{ background: '#F8F0DC', borderTop: '1px solid rgba(200,164,74,0.25)' }}>
  <div style={{
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 24px 32px',
    display: 'grid',
    gridTemplateColumns: '1.8fr 1fr 1fr 1.4fr',
    gap: '48px',
  }}>
    
    {/* COLUMN 1: Brand */}
    <div>
      {/* Luxora logo — italic serif, large */}
      <div style={{
        fontFamily: "'Playfair Display', serif",
        fontStyle: 'italic',
        fontSize: '32px',
        fontWeight: 600,
        color: '#1C1005',
        marginBottom: '16px',
      }}>
        Luxora
      </div>
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        color: '#6B5535',
        lineHeight: 1.8,
        marginBottom: '24px',
        maxWidth: '260px',
      }}>
        Crafting luxury interiors that reflect your lifestyle and vision. Your dream space awaits.
      </p>
      {/* Social Icons — GOLD CIRCULAR BACKGROUNDS */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['Facebook', 'Instagram', 'YouTube', 'Pinterest'].map((platform) => (
          <a key={platform} href="#" style={{
            width: '36px', height: '36px',
            borderRadius: '50%',
            background: '#C8A44A',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFFFFF',
            fontSize: '15px',
            textDecoration: 'none',
            transition: 'background 0.2s, transform 0.2s',
          }}>
            {/* Icon for each platform — use Lucide: Facebook, Instagram, Youtube, Pinterest */}
          </a>
        ))}
      </div>
    </div>
    
    {/* COLUMN 2: Our Pages */}
    <FooterLinkColumn title="Our Pages" links={['Home', 'About Us', 'Projects', 'Services', 'Blog', 'Contact']} />
    
    {/* COLUMN 3: Services */}
    <FooterLinkColumn title="Services" links={['Residential Design', 'Commercial Interiors', 'Space Planning', 'Modular Kitchen', '3D Visualization', 'Turnkey Projects']} />
    
    {/* COLUMN 4: Contact */}
    <div>
      <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 600, color: '#1C1005', marginBottom: '20px' }}>
        Contact Us
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Each contact item: icon + text, DM Sans 13px, color #6B5535 */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <span style={{ color: '#C8A44A', flexShrink: 0 }}>📍</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B5535', lineHeight: 1.6 }}>
            Jaipur, Rajasthan, India
          </span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#C8A44A' }}>📞</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B5535' }}>+91 XXXXX XXXXX</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ color: '#C8A44A' }}>✉️</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B5535' }}>hello@luxora.in</span>
        </div>
      </div>
    </div>
  </div>
  
  {/* Bottom copyright bar */}
  <div style={{
    borderTop: '1px solid rgba(200,164,74,0.15)',
    padding: '20px 24px',
    textAlign: 'center',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '12px',
    color: '#9B8B6A',
  }}>
    © 2026 Luxora. All rights reserved. | Designed with luxury in mind.
  </div>
</footer>
```

---

## STEP 11 — FINAL CHECKLIST (run after all sections)

### Scope Verification (run FIRST)
- [ ] `globals.css` was NOT modified
- [ ] `tailwind.config` was NOT modified  
- [ ] Root `app/layout.tsx` was NOT modified
- [ ] No files in `luxury-v1/`, `luxury-v2/`, `luxury-v3/` were touched
- [ ] All new components created inside `components/sections/v4/` or `components/ui/v4/`
- [ ] Fonts added only to `luxury-v4/layout.tsx` (not root layout)
- [ ] CSS variables scoped to `.v4Wrapper` class (not `:root`)

After implementing all sections, verify these items:

- [ ] Page background is `#F8F0DC` warm cream (not white, not cool gray)
- [ ] Gold color `#C8A44A` is used consistently everywhere (badges, borders, labels, toggles-on, social icons)
- [ ] BotanicalDecor appears on: Services, Stats, Smart Home, Real Homes sections (both sides)
- [ ] Services cards have gold circular number badges (01-06)
- [ ] Portfolio stats bar has `margin-top: -40px` overlapping the image
- [ ] Stats section is 3-column: left-stats | center-image | right-stats (NOT image-left, stats-right)
- [ ] Gallery uses masonry/varied layout (NOT uniform grid)
- [ ] Gallery images have both gold number badges AND gold pill room labels
- [ ] 3D Viewer is DARK background (#1C1005) with left category panel + bottom thumbnails
- [ ] Furniture section has left sidebar + right content (two columns)
- [ ] Smart home toggles: ON = `#C8A44A` gold, OFF = `#E0D5C5` warm gray
- [ ] Real Homes section title = "Real Homes. Beautifully Designed Experiences" (not "Experience Life")
- [ ] Real homes cards have gold pill property badge (bottom-left) + play button (center)
- [ ] Dot pagination below real homes cards
- [ ] Footer has gold circular social icon backgrounds
- [ ] Footer has 4 columns (not 2 or 3)
- [ ] Section eyebrow labels: all uppercase, gold, 11px, letter-spacing 4px, DM Sans
- [ ] Headings: all Playfair Display, second line italic where specified
- [ ] Hero section: UNCHANGED ✅

---

## IMPORTANT IMPLEMENTATION ORDER

```
1. app/(routes)/luxury-v4/v4.module.css        ← NEW file (V4 CSS variables)
2. app/(routes)/luxury-v4/layout.tsx           ← NEW or edit V4-only layout (fonts)
3. components/ui/v4/BotanicalDecor.tsx         ← NEW component
4. components/ui/v4/SectionHeader.tsx          ← NEW component
5. components/sections/v4/ServicesSection.tsx  ← NEW component
6. components/sections/v4/PortfolioSection.tsx ← NEW component
7. components/sections/v4/StatsSection.tsx     ← NEW component
8. components/sections/v4/GallerySection.tsx   ← NEW component
9. components/sections/v4/ThreeDViewerSection.tsx ← NEW component
10. components/sections/v4/FurnitureSection.tsx   ← NEW component
11. components/sections/v4/SmartHomeSection.tsx   ← NEW component
12. components/sections/v4/RealHomesSection.tsx   ← NEW component
13. components/sections/v4/Footer.tsx             ← NEW component
14. app/(routes)/luxury-v4/page.tsx           ← EDIT: import all new V4 sections
```

Implement ONE section at a time, verify visually, then move to next.
Every file above is either a NEW file or lives inside the `luxury-v4` path.
**Zero changes to any shared/global file.**
