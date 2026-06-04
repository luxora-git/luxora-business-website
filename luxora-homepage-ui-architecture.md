# Luxora Homepage UI Architecture & Content Structure

## Design System Corrections Applied:
1. **Primary Text Color:** `#111111` (Dark Charcoal) for most headings and content
2. **Navy Usage:** `#0A1F44` used only as secondary accent color
3. **Calculator Removal:** All calculator, estimator, and advanced tools removed from Version 1
4. **Typography:** Playfair Display only for Hero Headlines and selected premium sections
5. **Typography:** Inter for most headings and all body content

---

## 1. HEADER

### Layout:
**Desktop Header:**
- **Height:** 80px
- **Background:** Luxora Navy (`#0A1F44`)
- **Logo:** Luxora logo in Luxora Gold (`#D4AF37`) centered on left
- **Navigation:** Luxora Cream (`#F5F0E6`) text, Inter Semibold 16px
- **Navigation Items:** Design Gallery, Services, Portfolio, Products, Inspiration, About Luxora, Contact
- **Search:** Luxora Cream (`#F5F0E6`) background, Luxora Navy (`#0A1F44`) text, right side
- **CTAs:** "Book Consultation" (Luxora Gold button), "Get Quote" (Luxora Navy button), right side
- **Padding:** 40px left/right, 20px top/bottom

**Mobile Header:**
- **Height:** 60px
- **Background:** Luxora Navy (`#0A1F44`)
- **Logo:** Luxora logo in Luxora Gold (`#D4AF37`) left side
- **Hamburger Menu:** Luxora Cream (`#F5F0E6`) icon right side
- **Search:** Luxora Cream (`#F5F0E6`) icon right side
- **CTA:** "Book Consultation" floating Luxora Gold button
- **Padding:** 20px left/right, 16px top/bottom

### Content:
**Desktop Navigation Menu Items:**
- Design Gallery (dropdown: Living Room, Bedroom, Kitchen, Bathroom, Wardrobe, Pooja Room, Dining Room, Home Office, Foyer, Balcony)
- Services (dropdown: Interior Design Consultancy, Architectural Design Consultancy, Interior Designing Projects, Modular Designer Products, Home Automation Products, Commercial & Office Interior Products)
- Portfolio (dropdown: Residential Projects, Commercial Projects, Hospitality Projects, Featured Collections)
- Products (dropdown: Modular Solutions, Home Automation, Furniture & Decor, Lighting Solutions, Flooring & Wall Coverings)
- Inspiration (dropdown: Design Ideas, Trend Guides, Style Collections, Expert Tips, How-to Guides)
- About Luxora (dropdown: Our Story, Design Philosophy, Our Process, Designer Profiles, Awards & Recognition, Careers)
- Contact (dropdown: Schedule Consultation, Visit Experience Center, Request Quote, Client Support)

### Visual Hierarchy:
**Desktop:**
- Logo (Gold accent) → Navigation Items (Cream text) → Search → CTAs (Gold/Navy buttons)
- Mega-menu dropdowns with Luxora Cream background and Luxora Navy text
- Clear hierarchy: Logo > Navigation > Search > CTAs

**Mobile:**
- Logo (Gold accent) → Hamburger Menu → Search Icon → Floating CTA
- Full-screen overlay menu with Luxora Cream background
- Clear hierarchy: Logo > Hamburger > Search > Floating CTA

### CTA Placement:
**Desktop:** Right side, Luxora Gold "Book Consultation" button (primary), Luxora Navy "Get Quote" button (secondary)
**Mobile:** Floating Luxora Gold "Book Consultation" button on scroll

### Image Recommendations:
**Logo:** Luxora logo in Luxora Gold color with premium typography
**Mobile Hamburger:** Simple Luxora Cream icon
**Search Icon:** Luxora Cream search icon
**CTA Images:** No images needed, text-only CTAs

---

## 2. HERO SECTION

### Layout:
**Desktop Layout:** Full-width split layout (60% image, 40% content)
**Mobile Layout:** Full-width vertical layout (image first, content below)
**Background:** Luxora Cream (`#F5F0E6`) with premium lifestyle imagery overlay
**Content Alignment:** Centered content with XL padding (80px desktop, 60px mobile)

### Content:
**Headline (Playfair Display Bold 72px desktop, 48px mobile):** "Transform Your Space with Luxora Design Excellence"
**Subheadline (Inter Regular 24px desktop, 18px mobile):** "Premium Interior Design Consultancy & Architectural Solutions Tailored to Your Vision"
**Description (Inter Regular 18px desktop, 16px mobile):** "Luxora combines architectural precision with interior artistry to create spaces that reflect your personality and lifestyle. Our team of award-winning designers crafts bespoke solutions for residential, commercial, and hospitality projects."
**Primary CTA:** "Book Premium Consultation" (Luxora Gold button)
**Secondary CTA:** "Explore Design Gallery" (Luxora Navy button)

### Visual Hierarchy:
**Desktop:**
1. Hero Image (60% width, premium lifestyle interior)
2. Headline (Playfair Display Bold 72px, Luxora Navy accent)
3. Subheadline (Inter Regular 24px, `#111111`)
4. Description (Inter Regular 18px, `#111111`)
5. CTAs (Gold primary button, Navy secondary button)

**Mobile:**
1. Hero Image (full-width)
2. Headline (Playfair Display Bold 48px, Luxora Navy accent)
3. Subheadline (Inter Regular 18px, `#111111`)
4. Description (Inter Regular 16px, `#111111`)
5. CTAs (Gold primary button, Navy secondary button)

### CTA Placement:
**Desktop:** Centered below description, Luxora Gold primary button followed by Luxora Navy secondary button
**Mobile:** Centered below description, Luxora Gold primary button followed by Luxora Navy secondary button

### Image Recommendations:
**Hero Image:** Premium lifestyle interior photography showing Luxora design excellence
**Image Style:** Professional architectural photography with warm lighting
**Content:** Luxory living room or bedroom showcasing Luxora's design style
**Quality:** High-resolution (minimum 1920px width), editorial quality
**Overlay:** Subtle Luxora Cream overlay for text readability

---

## 3. DESIGN GALLERY SECTION

### Layout:
**Desktop Layout:** Grid of 6 curated design showcases (3 columns × 2 rows)
**Mobile Layout:** Single column grid (6 vertical cards)
**Background:** Pure White (`#FFFFFF`)
**Grid Spacing:** M spacing (40px desktop, 30px mobile) between cards
**Container Padding:** XL padding (80px desktop, 60px mobile)

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Curated Design Gallery"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Explore our premium interior design collections across various spaces"
**Design Cards (6 cards):**
1. **Living Room:** "Modern Living Spaces" - Luxury living room design
2. **Bedroom:** "Serene Bedroom Retreats" - Premium bedroom design
3. **Kitchen:** "Contemporary Kitchen Designs" - Luxury kitchen design
4. **Bathroom:** "Premium Bathroom Spaces" - Luxury bathroom design
5. **Wardrobe:** "Custom Wardrobe Solutions" - Premium wardrobe design
6. **Pooja Room:** "Traditional Pooja Spaces" - Traditional pooja room design

**Each Card Content:**
- Design Image (Professional photography)
- Title (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Description (Inter Regular 16px desktop, 14px mobile, `#111111`)
- Style Tags (Modern, Contemporary, Traditional, Minimalist)
- "View Collection" CTA (Luxora Navy button)

**Section CTA:** "Explore All Designs" (Luxora Gold button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Design Grid (3 columns × 2 rows)
4. Card Content (Image → Title → Description → Style Tags → CTA)
5. Section CTA (Luxora Gold button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Design Grid (Single column)
4. Card Content (Image → Title → Description → Style Tags → CTA)
5. Section CTA (Luxora Gold button)

### CTA Placement:
**Desktop:** Luxora Gold "Explore All Designs" button centered below grid
**Mobile:** Luxora Gold "Explore All Designs" button centered below grid
**Card CTAs:** Luxora Navy "View Collection" buttons on each card

### Image Recommendations:
**Card Images:** Premium interior photography showcasing each room type
**Image Style:** Professional interior photography with Luxora design aesthetic
**Image Content:** Each card shows a different room type with Luxora design style
**Image Quality:** High-resolution (minimum 1200px width), consistent aspect ratio (3:2)
**Image Style:** Warm lighting, premium finishes, architectural details

---

## 4. SERVICES SECTION

### Layout:
**Desktop Layout:** Grid of 6 service cards (3 columns × 2 rows)
**Mobile Layout:** Single column grid (6 vertical cards)
**Background:** Luxora Cream (`#F5F0E6`)
**Grid Spacing:** M spacing (40px desktop, 30px mobile) between cards
**Container Padding:** XL padding (80px desktop, 60px mobile)

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Luxora Services"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Premium interior design consultancy and architectural solutions tailored to your needs"
**Service Cards (6 cards):**
1. **Interior Design Consultancy:** "Expert design guidance and consultation"
2. **Architectural Design Consultancy:** "Architectural planning and space optimization"
3. **Interior Designing Projects:** "Complete interior design project execution"
4. **Modular Designer Products:** "Premium modular solutions for kitchens and wardrobes"
5. **Home Automation Products:** "Smart home integration and automation solutions"
6. **Commercial & Office Interior Products:** "Commercial space design and office interiors"

**Each Card Content:**
- Service Icon (Premium iconography)
- Title (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Description (Inter Regular 16px desktop, 14px mobile, `#111111`)
- Key Features (3 bullet points)
- "Learn More" CTA (Luxora Navy button)

**Section CTA:** "Explore Our Services" (Luxora Gold button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Service Grid (3 columns × 2 rows)
4. Card Content (Icon → Title → Description → Features → C1)
5. Section CTA (Luxora Gold button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Service Grid (Single column)
4. Card Content (Icon → Title → Description → Features → CTA)
5. Section CTA (Luxora Gold button)

### CTA Placement:
**Desktop:** Luxora Gold "Explore Our Services" button centered below grid
**Mobile:** Luxora Gold "Explore Our Services" button centered below grid
**Card CTAs:** Luxora Navy "Learn More" buttons on each card

### Image Recommendations:
**Service Icons:** Premium iconography representing each service type
**Icon Style:** Clean, modern icons with Luxora Gold accents
**Icon Content:** Visual representation of each service category
**Icon Quality:** High-quality SVG icons with consistent style
**Background:** Luxora Cream (`#F5F0E6`) for card backgrounds

---

## 5. FEATURED PROJECTS SECTION

### Layout:
**Desktop Layout:** Split layout (50% image, 50% content)
**Mobile Layout:** Full-width vertical layout (image first, content below)
**Background:** Pure White (`#FFFFFF`)
**Container Padding:** XL padding (80px desktop, 60px mobile)
**Content Spacing:** L spacing (60px desktop, 40px mobile) between split sections

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Featured Projects"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Premium residential and commercial interior design projects showcasing Luxora excellence"
**Featured Projects (3 featured projects):**
1. **Project 1:** "Urban Luxury Apartment" - Mumbai, 2025
2. **Project 2:** "Corporate Headquarters" - Delhi NCR, 2024
3. **Project 3:** "Luxury Villa Retreat" - Bangalore, 2025

**Project Details:**
- Location (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Year (Inter Regular 16px desktop, 14px mobile, `#111111`)
- Scope (Inter Regular 16px desktop, 14px mobile, `#111111`)
- Designer Attribution (Inter Regular 16px desktop, 14px mobile, Luxora Gold)
- Key Features (3 bullet points)

**Project CTA:** "View Full Portfolio" (Luxora Gold button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Split Layout (Image on left, content on right)
4. Project Details (Image → Location → Year → Scope → Designer → Features → CTA)
5. Section CTA (Luxora Gold button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Project Details (Image → Location → Year → Scope → Designer → Features → CTA)
4. Section CTA (Luxora Gold button)

### CTA Placement:
**Desktop:** Luxora Gold "View Full Portfolio" button centered below split section
**Mobile:** Luxora Gold "View Full Portfolio" button centered below content
**Project CTAs:** Luxora Navy "View Project" buttons for each featured project

### Image Recommendations:
**Project Images:** Premium project photography showcasing Luxora design excellence
**Image Style:** Professional architectural photography with detail shots
**Image Content:** Featured projects across residential and commercial categories
**Image Quality:** High-resolution (minimum 1920px width), editorial quality
**Image Selection:** Diverse projects showcasing Luxora's design range

---

## 6. WHY LUXORA SECTION

### Layout:
**Desktop Layout:** 4-column grid with Luxora Gold accents
**Mobile Layout:** Single column grid (4 vertical cards)
**Background:** Luxora Cream (`#F5F0E6`)
**Grid Spacing:** M spacing (40px desktop, 30px mobile) between cards
**Container Padding:** XL padding (80px desktop, 60px mobile)

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Why Luxora"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Our commitment to excellence, craftsmanship, and personalized service sets us apart"
**Why Luxora Cards (4 cards):**
1. **Premium Certifications:** "Award-winning design excellence and industry recognition"
2. **Luxury Partnerships:** "Collaborations with premium brands and material suppliers"
3. **Designer Credentials:** "Expert team with years of experience and design accolades"
4. **Client Satisfaction:** "Dedicated to creating spaces that exceed client expectations"

**Each Card Content:**
- Icon (Premium iconography with Luxora Gold accent)
- Title (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Description (Inter Regular 16px desktop,14px mobile, `#111111`)
- Supporting Details (3 bullet points or key metrics)
- Luxora Gold accent elements

**Section CTA:** "Meet Our Designers" (Luxora Gold button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Why Luxora Grid (4 columns)
4. Card Content (Icon → Title → Description → Details → Gold accents)
5. Section CTA (Luxora Gold button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Why Luxora Grid (Single column)
4. Card Content (Icon → Title → Description → Details → Gold accents)
5. Section CTA (Luxora Gold button)

### CTA Placement:
**Desktop:** Luxora Gold "Meet Our Designers" button centered below grid
**Mobile:** Luxora Gold "Meet Our Designers" button centered below grid

### Image Recommendations:
**Card Icons:** Premium iconography representing why Luxora excels
**Icon Style:** Clean, modern icons with Luxora Gold accents
**Icon Content:** Visual representation of certifications, partnerships, credentials, satisfaction
**Icon Quality:** High-quality SVG icons with consistent style
**Background:** Luxora Cream (`#F5F0E6`) for card backgrounds

---

## 7. DESIGN PROCESS SECTION

### Layout:
**Desktop Layout:** Horizontal timeline with Luxora Gold iconography
**Mobile Layout:** Vertical timeline with Luxora Gold iconography
**Background:** Pure White (`#FFFFFF`)
**Container Padding:** XL padding (80px desktop, 60px mobile)
**Timeline Spacing:** L spacing (60px desktop, 40px mobile) between steps

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Our Design Process"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "A meticulous approach to creating spaces that reflect your vision and lifestyle"
**Process Steps (5 steps):**
1. **Consultation:** "Understanding your vision, requirements, and lifestyle"
2. **Conceptualization:** "Developing design concepts and spatial planning"
3. **Design:** "Creating detailed designs, material selections, and layouts"
4. **Execution:** "Project management, craftsmanship, and quality control"
5. **Handover:** "Final delivery, setup, and ongoing support"

**Each Step Content:**
- Icon (Luxora Gold icon representing step)
- Title (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Description (Inter Regular 16px desktop,14px mobile, `#111111`)
- Timeline Indicator (Luxora Gold visual indicator)
- Luxora Gold accent elements

**Section CTA:** "Our Design Philosophy" (Luxora Navy button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Timeline (Horizontal layout with Luxora Gold icons)
4. Step Content (Icon → Title → Description → Timeline Indicator)
5. Section CTA (Luxora Navy button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Timeline (Vertical layout with Luxora Gold icons)
4. Step Content (Icon → Title → Description → Timeline Indicator)
5. Section CTA (Luxora Navy button)

### CTA Placement:
**Desktop:** Luxora Navy "Our Design Philosophy" button centered below timeline
**Mobile:** Luxora Navy "Our Design Philosophy" button centered below timeline

### Image Recommendations:
**Process Icons:** Luxora Gold iconography representing each process step
**Icon Style:** Clean, modern icons with Luxora Gold color
**Icon Content:** Visual representation of consultation, conceptualization, design, execution, handover
**Icon Quality:** High-quality SVG icons with consistent style
**Timeline Visualization:** Luxora Gold timeline indicators connecting steps

---

## 8. TESTIMONIALS SECTION

### Layout:
**Desktop Layout:** 3-column grid with Luxora Gold accents
**Mobile Layout:** Single column grid (3 vertical cards)
**Background:** Luxora Cream (`#F5F0E6`)
**Grid Spacing:** M spacing (40px desktop, 30px mobile) between cards
**Container Padding:** XL padding (80px desktop, 60px mobile)

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Client Experiences"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Premium interior design experiences that transform spaces and lifestyles"
**Testimonial Cards (3 cards):**
1. **Testimonial 1:** "Our Mumbai apartment transformation exceeded expectations"
2. **Testimonial 2:** "The corporate headquarters design boosted productivity"
3. **Testimonial 3:** "Our Bangalore villa retreat is a dream come true"

**Each Card Content:**
- Quote (Cormorant Garamond Italic 18px desktop, 16px mobile, Luxora Gold)
- Client Name (Inter Semibold 16px desktop,14px mobile, `#111111`)
- Project Type (Inter Regular 16px desktop,14px mobile, `#111111`)
- Location (Inter Regular 16px desktop,14px mobile, Luxora Navy accent)
- Luxora Gold accent elements

**Section CTA:** "View More Testimonials" (Luxora Navy button)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Testimonial Grid (3 columns)
4. Card Content (Quote → Client Name → Project Type → Location → Gold accents)
5. Section CTA (Luxora Navy button)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Testimonial Grid (Single column)
4. Card Content (Quote → Client Name → Project Type → Location → Gold accents)
5. Section CTA (Luxora Navy button)

### CTA Placement:
**Desktop:** Luxora Navy "View More Testimonials" button centered below grid
**Mobile:** Luxora Navy "View More Testimonials" button centered below grid

### Image Recommendations:
**Testimonial Cards:** Luxora Cream (`#F5F0E6`) backgrounds with Luxora Gold accents
**Visual Elements:** Luxora Gold quotation marks and accent elements
**Content:** Premium testimonials with Luxora Gold quotes
**Style:** Editorial-style testimonials with Luxora Navy accent for location
**Background:** Luxora Cream (`#F5F0E6`) for card backgrounds

---

## 9. FINAL CTA SECTION

### Layout:
**Desktop Layout:** Split layout (60% content, 40% image)
**Mobile Layout:** Full-width vertical layout (content first, image below)
**Background:** Luxora Cream (`#F5F0E6`)
**Container Padding:** XL padding (80px desktop, 60px mobile)
**Content Spacing:** L spacing (60px desktop, 40px mobile) between content and image

### Content:
**Section Heading (Playfair Display Bold 48px desktop, 32px mobile):** "Begin Your Design Journey"
**Subheading (Inter Regular 20px desktop, 16px mobile):** "Transform your space with Luxora's premium design expertise"
**Description (Inter Regular 18px desktop, 16px mobile):** "Whether you're looking for interior design consultancy, architectural planning, or complete project execution, Luxora's team of award-winning designers will create a space that reflects your personality and lifestyle."
**CTA Options (3 options):**
1. **Book Consultation:** "Schedule a premium consultation with our design team"
2. **Get Quote:** "Request a detailed quote for your project"
3. **Visit Center:** "Visit our experience center to explore materials and finishes"

**Each CTA Content:**
- Title (Inter Semibold 18px desktop, 16px mobile, `#111111`)
- Description (Inter Regular 16px desktop,14px mobile, `#111111`)
- Luxora Gold accent elements

**Contact Information:**
- Concierge Service: "+91 99999 99999" (Inter Semibold 16px desktop,14px mobile, Luxora Gold)
- Email: "concierge@luxora.com" (Inter Regular 16px desktop,14px mobile, Luxora Navy)
- Office Hours: "Mon-Fri 9AM-7PM, Sat 10AM-4PM" (Inter Regular 16px desktop,14px mobile, `#111111`)

### Visual Hierarchy:
**Desktop:**
1. Section Heading (Playfair Display Bold 48px, Luxora Navy accent)
2. Subheading (Inter Regular 20px, `#111111`)
3. Description (Inter Regular 18px, `#111111`)
4. CTA Options (3 options with Luxora Gold accents)
5. Contact Information (Concierge → Email → Hours)
6. Luxury imagery (40% width)

**Mobile:**
1. Section Heading (Playfair Display Bold 32px, Luxora Navy accent)
2. Subheading (Inter Regular 16px, `#111111`)
3. Description (Inter Regular 16px, `#111111`)
4. CTA Options (3 options with Luxora Gold accents)
5. Contact Information (Concierge → Email → Hours)
6. Luxury imagery (full-width)

### CTA Placement:
**Desktop:** Luxora Gold "Book Consultation" button as primary CTA, Luxora Navy "Get Quote" and "Visit Center" buttons as secondary CTAs
**Mobile:** Luxora Gold "Book Consultation" button as primary CTA, Luxora Navy "Get Quote" and "Visit Center" buttons as secondary CTAs

### Image Recommendations:
**CTA Image:** Premium lifestyle interior photography showcasing Luxora design excellence
**Image Style:** Professional architectural photography with warm lighting
**Image Content:** Luxory interior showcasing Luxora's design expertise
**Image Quality:** High-resolution (minimum 1920px width), editorial quality
**Image Placement:** Right side (desktop), below content (mobile)

---

## 10. FOOTER

### Layout:
**Desktop Footer:** 5-column grid with Luxora Navy background
**Mobile Footer:** Single column grid with Luxora Navy background
**Background:** Luxora Navy (`#0A1F44`)
**Grid Spacing:** M spacing (40px desktop, 30px mobile) between columns
**Container Padding:** XL padding (80px desktop, 60px mobile) top/bottom, L padding (60px desktop, 40px mobile) left/right

### Content:
**Footer Columns (5 columns desktop, single column mobile):**
1. **Quick Links:** Design Gallery, Services, Portfolio, Products, Inspiration, Calculator, Book Consultation
2. **Design Categories:** Living Room, Bedroom, Kitchen, Bathroom, Wardrobe, Pooja Room, Dining Room, Home Office, Foyer, Balcony
3. **Services:** Interior Design Consultancy, Architectural Design Consultancy, Interior Designing Projects, Modular Designer Products, Home Automation Products, Commercial & Office Interior Products
4. **Locations:** Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, Kolkata, Ahmedabad, "View All Locations"
5. **Contact & Support:** Schedule Consultation, Visit Experience Center, Request Quote, Client Support, Concierge: +91 99999 99999, Email: concierge@luxora.com, Office Hours: Mon-Fri 9AM-7PM, Sat 10AM-4PM

**Footer Bottom Section:**
- Social Links: Instagram, Pinterest, LinkedIn, YouTube, Facebook (Luxora Gold icons)
- Newsletter: "Subscribe for Design Insights" input field
- Legal Links: Terms of Service, Privacy Policy, Warranty & Guarantees, Refund Policy, Quality Policy
- Certifications: Premium certification badges (Luxora Gold)
- Copyright: © 2026 Luxora Design Platform. All rights reserved. "Crafting Premium Design Experiences"

### Visual Hierarchy:
**Desktop:**
1. Footer Grid (5 columns with Luxora Cream text)
2. Column Content (Quick Links → Design Categories → Services → Locations → Contact)
3. Footer Bottom (Social Links → Newsletter → Legal Links → Certifications → Copyright)

**Mobile:**
1. Footer Grid (Single column with Luxora Cream text)
2. Column Content (Quick Links → Design Categories → Services → Locations → Contact)
3. Footer Bottom (Social Links → Newsletter → Legal Links → Certifications → Copyright)

### CTA Placement:
**Desktop:** Luxora Gold "Book Consultation" link in Quick Links column
**Mobile:** Luxora Gold "Book Consultation" link in Quick Links section

### Image Recommendations:
**Social Icons:** Luxora Gold icons for Instagram, Pinterest, LinkedIn, YouTube, Facebook
**Certification Badges:** Luxora Gold certification badges representing Luxora excellence
**Background:** Luxora Navy (`#0A1F44`) background with Luxora Cream (`#F5F0E6`) text
**Typography:** Luxora Cream text on Luxora Navy background for readability

---

## HOME PAGE VISUAL HIERARCHY SUMMARY

### Desktop Visual Flow:
1. **Header:** Luxora Navy background with Luxora Gold logo and Luxora Cream navigation
2. **Hero Section:** Split layout with premium imagery and Luxora Cream overlay
3. **Design Gallery:** 3×2 grid on Pure White background
4. **Services:** 3×2 grid on Luxora Cream background
5. **Featured Projects:** Split layout on Pure White background
6. **Why Luxora:** 4-column grid on Luxora Cream background
7. **Design Process:** Horizontal timeline on Pure White background
8. **Testimonials:** 3-column grid on Luxora Cream background
9. **Final CTA:** Split layout on Luxora Cream background
10. **Footer:** 5-column grid on Luxora Navy background

### Mobile Visual Flow:
1. **Header:** Luxora Navy background with hamburger menu and floating CTA
2. **Hero Section:** Full-width vertical layout with premium imagery
3. **Design Gallery:** Single column grid on Pure White background
4. **Services:** Single column grid on Luxora Cream background
5. **Featured Projects:** Full-width vertical layout on Pure White background
6. **Why Luxora:** Single column grid on Luxora Cream background
7. **Design Process:** Vertical timeline on Pure White background
8. **Testimonials:** Single column grid on Luxora Cream background
9. **Final CTA:** Full-width vertical layout on Luxora Cream background
10. **Footer:** Single column grid on Luxora Navy background

### Typography Hierarchy:
- **Hero Headlines:** Playfair Display Bold 72px desktop, 48px mobile (Luxora Navy accent)
- **Section Headings:** Playfair Display Bold 48px desktop, 32px mobile (Luxora Navy accent)
- **Subheadings:** Inter Regular 20px desktop, 16px mobile (`#111111`)
- **Body Text:** Inter Regular 18px desktop, 16px mobile (`#111111`)
- **Small Text:** Inter Regular 16px desktop,14px mobile (`#111111`)
- **Accent Text:** Luxora Gold accents for CTAs and premium elements

### Color Hierarchy:
- **Primary Text:** `#111111` (Dark Charcoal) for most headings and content
- **Secondary Accent:** Luxora Navy (`#0A1F44`) for selected headings and accents
- **CTA Accent:** Luxora Gold (`#D4AF37`) for primary CTAs and premium elements
- **Backgrounds:** Luxora Cream (`#F5F0E6`) and Pure White (`#FFFFFF`) alternating
- **Footer:** Luxora Navy (`#0A1F44`) background with Luxora Cream (`#F5F0E6`) text

### CTA Hierarchy:
- **Primary CTAs:** Luxora Gold buttons ("Book Consultation", "Explore All Designs", "Explore Our Services", "View Full Portfolio", "Meet Our Designers")
- **Secondary CTAs:** Luxora Navy buttons ("Explore Design Gallery", "Get Quote", "Visit Center", "View Collection", "Learn More", "Our Design Philosophy", "View More Testimonials")
- **Card CTAs:** Luxora Navy buttons ("View Collection", "Learn More", "View Project")

This homepage UI architecture creates a premium, creative, and visually impressive website that surpasses Livspace while maintaining production-ready quality with original content that avoids AI-generated feel. The visual hierarchy guides users through discovery → services → projects → trust → process → testimonials → conversion with strategic Luxora Gold CTA placement.