# Luxora Interiors - Information Architecture & Page Structure

## Project Overview
Create a premium luxury interior design website that surpasses Livspace in sophistication while maintaining modern, clean design and conversion optimization.

---

## 1. COMPLETE SITEMAP

### Primary Navigation Structure:
```
Home
Portfolio
  → Contemporary Collections
  → Minimalist Collections
  → Traditional Collections
  → Bespoke Projects
Services
  → Luxora Interiors (Full Home Design)
  → Luxora Modular (Kitchen & Wardrobe)
  → Luxora Renovation
  → Luxora Bespoke
Design Process
  → Our Approach
  → Designer Profiles
  → Timeline & Guarantees
  → Client Journey
About Luxora
  → Brand Story
  → Design Philosophy
  → Awards & Recognition
  → Careers
Contact
  → Schedule VIP Consultation
  → Visit Experience Centre
  → Request Callback
```

### Secondary Pages & Subpages:

**Portfolio Section:**
- `/portfolio` (Gallery overview with filters)
- `/portfolio/contemporary` (Contemporary design collection)
- `/portfolio/minimalist` (Minimalist design collection)
- `/portfolio/traditional` (Traditional design collection)
- `/portfolio/bespoke` (Bespoke projects)
- `/portfolio/project/[project-id]` (Individual project detail page)

**Services Section:**
- `/services` (Services overview)
- `/services/interiors` (Luxora Interiors - Full Home Design)
- `/services/modular` (Luxora Modular - Kitchen & Wardrobe)
- `/services/renovation` (Luxora Renovation)
- `/services/bespoke` (Luxora Bespoke)

**Design Process Section:**
- `/design-process` (Process overview)
- `/design-process/approach` (Our Approach methodology)
- `/design-process/designers` (Designer Profiles gallery)
- `/design-process/timeline` (Project Timeline & Guarantees)
- `/design-process/journey` (Client Journey experience)

**About Section:**
- `/about` (Brand overview)
- `/about/story` (Brand Story)
- `/about/philosophy` (Design Philosophy)
- `/about/awards` (Awards & Recognition)
- `/about/careers` (Careers/Join Us)

**Contact Section:**
- `/contact` (Contact overview)
- `/contact/consultation` (Schedule VIP Consultation form)
- `/contact/experience-centre` (Visit Experience Centre)
- `/contact/callback` (Request Callback form)

**Utility Pages:**
- `/materials` (Materials & Finishes Gallery)
- `/calculator` (Bespoke Design Estimator)
- `/blog` (Design Inspiration & Articles)
- `/terms` (Terms of Service)
- `/privacy` (Privacy Policy)
- `/warranty` (Premium Warranty Details)

---

## 2. HOMEPAGE SECTION HIERARCHY

### Section 1: Hero Banner (Full-width)
- **Content:** Luxury lifestyle imagery with subtle overlay
- **Headline:** "Crafting Bespoke Spaces for Discerning Clients"
- **Subheadline:** "Premium Interior Design Services Tailored to Your Vision"
- **Primary CTA:** "Schedule VIP Consultation" (Gold button)
- **Secondary CTA:** "Explore Portfolio" (Navy button)
- **Features:** Subtle animation, elegant typography

### Section 2: Curated Portfolio Highlights (3-5 featured projects)
- **Layout:** Grid of 3-5 large project cards
- **Content:** Project images with location, style, key features
- **CTA:** "View Full Portfolio" (Below grid)
- **Filters:** Style quick filters (Contemporary, Minimalist, Traditional)

### Section 3: Luxora Services Tiers
- **Layout:** 4 cards in grid
- **Cards:** Luxora Interiors, Luxora Modular, Luxora Renovation, Luxora Bespoke
- **Content:** Service description, timeline estimate, starting price range
- **CTA:** "Learn More" on each card
- **Visual:** Distinct visual differentiation between tiers

### Section 4: Luxury Design Process Visualization
- **Layout:** Horizontal timeline with 5 steps
- **Steps:** Consultation → Design → Craft → Install → Service
- **Visual:** Iconography, brief description for each step
- **CTA:** "See Our Process" (Link to Design Process page)
- **Guarantee Badge:** Premium craftsmanship guarantee

### Section 5: Materials & Finishes Gallery Preview
- **Layout:** Interactive grid with hover effects
- **Content:** Luxury finishes preview (Italian marbles, premium woods, custom metals)
- **CTA:** "Explore Materials Gallery" (Link to Materials page)
- **Brand Partnerships:** Premium brand logos (subtle display)

### Section 6: Luxora Edge (Trust Building Section)
- **Layout:** 3-column grid
- **Columns:** Premium Certifications, Luxury Partnerships, Designer Credentials
- **Content:** Certification badges, brand logos, designer achievements
- **CTA:** "Meet Our Designers" (Link to Designer Profiles)

### Section 7: Luxury Calculator Preview
- **Layout:** Interactive calculator preview widget
- **Content:** Step-by-step bespoke estimator preview
- **Steps:** Project Type → Space Details → Style Preferences → Material Tier → Additional Features
- **CTA:** "Request Bespoke Estimate" (Launches full calculator modal)

### Section 8: Contact Section
- **Layout:** Split layout with imagery and form
- **Left:** Luxury office/interior image
- **Right:** VIP consultation booking form
- **Form Fields:** Name, Email, Phone, Project Type, Property Size, Preferred Style, Budget Range, Consultation Date
- **CTA:** "Submit VIP Consultation Request"
- **Contact Info:** Concierge service phone, email, office hours

---

## 3. PAGE HIERARCHY

### Level 1 Pages (Primary Navigation):
1. **Home** - `/` (Landing page with all sections)
2. **Portfolio** - `/portfolio` (Project gallery with filters)
3. **Services** - `/services` (Services overview with tier descriptions)
4. **Design Process** - `/design-process` (Process visualization and details)
5. **About Luxora** - `/about` (Brand overview and philosophy)
6. **Contact** - `/contact` (Contact options and booking)

### Level 2 Pages (Subpages):
7. **Contemporary Collections** - `/portfolio/contemporary`
8. **Minimalist Collections** - `/portfolio/minimalist`
9. **Traditional Collections** - `/portfolio/traditional`
10. **Bespoke Projects** - `/portfolio/bespoke`
11. **Luxora Interiors** - `/services/interiors`
12. **Luxora Modular** - `/services/modular`
13. **Luxora Renovation** - `/services/renovation`
14. **Luxora Bespoke** - `/services/bespoke`
15. **Our Approach** - `/design-process/approach`
16. **Designer Profiles** - `/design-process/designers`
17. **Timeline & Guarantees** - `/design-process/timeline`
18. **Client Journey** - `/design-process/journey`
19. **Brand Story** - `/about/story`
20. **Design Philosophy** - `/about/philosophy`
21. **Awards & Recognition** - `/about/awards`
22. **Careers** - `/about/careers`
23. **Schedule VIP Consultation** - `/contact/consultation`
24. **Visit Experience Centre** - `/contact/experience-centre`
25. **Request Callback** - `/contact/callback`

### Level 3 Pages (Detail Pages):
26. **Project Detail** - `/portfolio/project/[project-id]` (Individual project showcase)
27. **Designer Detail** - `/design-process/designers/[designer-id]` (Individual designer profile)
28. **Material Detail** - `/materials/[material-id]` (Individual material showcase)

---

## 4. PORTFOLIO PAGE STRUCTURE

### Portfolio Gallery Page (`/portfolio`):
**Header Section:**
- Hero image with "Our Portfolio" headline
- Filter bar: Style (Contemporary, Minimalist, Traditional, Bespoke), Location (Mumbai, Delhi, Bangalore, Hyderabad, Chennai), Size (Apartment, Villa, Penthouse, Commercial)
- Subheadline: "Curated Luxury Interior Designs"

**Main Content Section:**
- Grid layout: 12-16 project cards
- Project card structure:
  * Large hero image (hover zoom effect)
  * Project title
  * Location
  * Style tag
  * Key features (3 bullet points)
  * "View Project" CTA button

**Sidebar/Filters:**
- Advanced filters: Year completed, Budget range, Designer
- Sort options: Most recent, Most popular, Featured
- View options: Grid view, List view

**Footer Section:**
- "Need a similar project?" section
- CTA: "Schedule Similar Project Consultation"
- Link to Designer Profiles

### Project Detail Page (`/portfolio/project/[project-id]`):
**Hero Section:**
- Full-width project hero image
- Project title, location, style tags
- Designer attribution with link
- "Schedule Similar Project" CTA

**Gallery Section:**
- Thumbnail gallery (8-12 images)
- Interactive lightbox for viewing
- Room breakdown (Living Room, Kitchen, Bedroom, etc.)

**Details Section:**
- Project overview paragraph
- Client requirements/vision
- Design challenges/solutions
- Timeline: Start date → Completion date
- Budget range (if disclosed)

**Materials Section:**
- Materials used breakdown
- Brand partnerships showcased
- "Explore Materials Gallery" CTA

**Designer Section:**
- Designer profile card
- Link to full designer profile
- Other projects by same designer

**CTA Section:**
- "Schedule Consultation for Similar Project" form
- Quick booking options

---

## 5. SERVICE PAGE STRUCTURE

### Services Overview Page (`/services`):
**Hero Section:**
- Luxury imagery with "Our Services" headline
- Subheadline: "Premium Interior Design Solutions Tailored to Your Vision"
- Brief service overview

**Service Tier Cards (4 cards):**
1. **Luxora Interiors (Full Home):**
   - Description: Comprehensive interior design service
   - Timeline: 3-6 months
   - Starting range: ₹15-30 lakhs
   - Includes: Design, materials selection, installation, project management
   - CTA: "Schedule Consultation"

2. **Luxora Modular (Kitchen & Wardrobe):**
   - Description: Premium modular solutions
   - Timeline: 45-60 days
   - Starting range: ₹5-15 lakhs
   - Includes: Design, premium materials, installation
   - CTA: "Get Modular Estimate"

3. **Luxora Renovation:**
   - Description: Luxury renovation services
   - Timeline: 2-4 months
   - Starting range: ₹10-20 lakhs
   - Includes: Design, structural changes, premium finishes
   - CTA: "Discuss Renovation"

4. **Luxora Bespoke:**
   - Description: Fully customized solutions
   - Timeline: 6-12 months
   - Price: Custom quotation
   - Includes: Everything custom-designed
   - CTA: "Request Bespoke Consultation"

**Process Integration Section:**
- Visual timeline linking to Design Process page
- CTA: "Explore Our Design Process"

**Calculator Section:**
- Bespoke estimator preview
- CTA: "Request Bespoke Estimate"

### Individual Service Pages (e.g., `/services/interiors`):
**Hero Section:**
- Service-specific imagery
- Service title and tagline
- Brief overview

**Detailed Service Breakdown:**
- What's included (bullet points)
- Process timeline (visual)
- Materials options (preview)
- Designer allocation explanation

**Portfolio Section:**
- Relevant project examples
- "View Similar Projects" CTA

**Calculator Section:**
- Service-specific estimator
- CTA: "Get Detailed Estimate"

**FAQ Section:**
- Common questions about this service
- Clear, concise answers

**CTA Section:**
- Primary booking form
- Secondary "Schedule Consultation" button

---

## 6. ABOUT PAGE STRUCTURE

### About Overview Page (`/about`):
**Hero Section:**
- Brand imagery with "About Luxora" headline
- Tagline: "Crafting Bespoke Spaces for Discerning Clients"

**Brand Story Preview:**
- Brief brand history and philosophy
- "Read Our Full Story" CTA linking to `/about/story`

**Design Philosophy Preview:**
- Core design principles
- "Explore Our Philosophy" CTA linking to `/about/philosophy`

**Designer Team Preview:**
- Featured designers with photos
- "Meet Our Designers" CTA linking to `/design-process/designers`

**Awards & Recognition Preview:**
- Notable awards and certifications
- "View All Awards" CTA linking to `/about/awards`

**Careers Preview:**
- "Join Our Team" section
- CTA linking to `/about/careers`

**Values Section:**
- Core values (Craftsmanship, Personalization, Excellence, Integrity)
- Visual representation of each value

### Subpages Structure:

**Brand Story (`/about/story`):**
- Founder story/vision
- Company evolution timeline
- Milestones and achievements
- Future vision

**Design Philosophy (`/about/philosophy`):**
- Core principles explained
- Design approach methodology
- Client collaboration philosophy
- Sustainability considerations

**Awards & Recognition (`/about/awards`):**
- Award grid with certificates
- Partnership logos
- Industry recognition
- Press mentions

**Careers (`/about/careers`):**
- Culture overview
- Available positions
- Application process
- Benefits and perks

---

## 7. CONTACT PAGE STRUCTURE

### Contact Overview Page (`/contact`):
**Hero Section:**
- Luxury office/studio imagery
- "Contact Luxora" headline
- Tagline: "Begin Your Bespoke Design Journey"

**Contact Options Grid (3 options):**
1. **Schedule VIP Consultation:**
   - Description: Book a personal consultation with our designers
   - CTA: "Schedule Now" linking to `/contact/consultation`

2. **Visit Experience Centre:**
   - Description: Visit our luxury experience centre
   - Address: Physical address with map preview
   - CTA: "View Location" linking to `/contact/experience-centre`

3. **Request Callback:**
   - Description: Request a callback from our concierge team
   - CTA: "Request Callback" linking to `/contact/callback`

**Concierge Service Section:**
- Concierge service explanation
- Contact details: Phone (+91 99999 99999), Email (concierge@luxora.com)
- Office hours: Mon-Fri 9AM-6PM, Sat 10AM-4PM

**Designer Assignment Section:**
- How designers are assigned
- Matching process explanation

### Subpages Structure:

**Schedule VIP Consultation (`/contact/consultation`):**
- Booking form with calendar integration
- Fields: Name, Email, Phone, Project Type, Property Size, Preferred Style, Budget Range, Consultation Date, Notes
- Form validation and confirmation
- Auto-response with booking details

**Visit Experience Centre (`/contact/experience-centre`):**
- Location details with address
- Google Maps integration
- Studio imagery
- Appointment booking option
- Directions and parking information

**Request Callback (`/contact/callback`):**
- Simple callback request form
- Fields: Name, Phone, Best time to call, Project interest
- Confirmation and callback scheduling

---

## 8. FOOTER STRUCTURE

### Footer Layout (4-column grid):

**Column 1: Quick Links**
- Portfolio
- Services
- Design Process
- About Luxora
- Contact
- Materials Gallery
- Bespoke Calculator

**Column 2: Design Collections**
- Contemporary
- Minimalist
- Traditional
- Bespoke
- Design Inspiration (Blog)

**Column 3: Locations (Curated - 5 cities)**
- Mumbai
- Delhi
- Bangalore
- Hyderabad
- Chennai
"View All Locations" link

**Column 4: Contact Luxora**
- Schedule VIP Consultation
- Concierge Service: +91 99999 99999
- Email: concierge@luxora.com
- Office Hours: Mon-Fri, 9AM-6PM
- Experience Centre Address

### Footer Bottom Section:

**Social Links (Premium platforms):**
- Instagram (luxury interior visuals)
- Pinterest (design inspiration)
- LinkedIn (professional network)

**Legal Links:**
- Privacy Policy
- Terms of Service
- Warranty Details

**Copyright:**
- © 2026 Luxora Interiors. All rights reserved.

---

## 9. CTA PLACEMENT STRATEGY

### CTA Hierarchy:

**Primary CTAs (Gold buttons):**
- "Schedule VIP Consultation" (Hero section, service pages, portfolio detail pages)
- "Request Bespoke Estimate" (Calculator section)
- "Submit VIP Consultation Request" (Contact forms)

**Secondary CTAs (Navy buttons):**
- "Explore Portfolio" (Hero section, homepage)
- "View Materials Gallery" (Materials section)
- "Learn More" (Service cards, process sections)

**Content CTAs (Subtle links):**
- "View Full Project" (Portfolio cards)
- "Meet Our Designers" (Designer section)
- "Read Our Story" (About section)

### Placement Rules:

**Hero Sections:** Always include primary CTA
**Section Endings:** Include relevant CTA after each major section
**Card Components:** Include appropriate CTA on each card
**Page Endings:** Include primary CTA at bottom of each page
**Sidebars/Navigation:** Contextual CTAs based on page content

### Conversion Path Optimization:

**Path 1 (Portfolio → Consultation):**
- Portfolio page → Project detail → "Schedule Similar Project" → Consultation booking

**Path 2 (Services → Estimator → Consultation):**
- Services page → Service detail → "Get Detailed Estimate" → Calculator → "Schedule Consultation"

**Path 3 (Materials → Consultation):**
- Materials gallery → Material detail → "Schedule Consultation to Discuss Materials" → Booking

**Path 4 (Design Process → Consultation):**
- Design Process page → "Begin Your Journey" → Consultation booking

---

## 10. MOBILE NAVIGATION STRUCTURE

### Mobile Navigation Bar:
**Top Bar:** Luxora logo + Hamburger menu icon

**Mobile Menu (Hamburger opens):**
```
Home
Portfolio
  → Contemporary
  → Minimalist
  → Traditional
  → Bespoke
Services
  → Luxora Interiors
  → Luxora Modular
  → Luxora Renovation
  → Luxora Bespoke
Design Process
  → Our Approach
  → Designer Profiles
  → Timeline & Guarantees
  → Client Journey
About Luxora
  → Brand Story
  → Design Philosophy
  → Awards & Recognition
  → Careers
Contact
  → Schedule VIP Consultation
  → Visit Experience Centre
  → Request Callback
Schedule VIP Consultation (Primary CTA button)
```

### Mobile Layout Adaptations:

**Hero Section:**
- Full-width image
- Headline and subheadline stacked
- Primary CTA button centered
- Secondary CTA button below

**Portfolio Grid:**
- Single column layout
- Project cards stack vertically
- Filters collapse into dropdowns

**Service Tiers:**
- Single column layout
- Cards stack vertically
- Reduced text for mobile

**Timeline Visualization:**
- Vertical stacking instead of horizontal
- Clear step indicators

**Materials Gallery:**
- Grid adapts to 2-column on mobile
- Hover effects replaced with tap interactions

**Calculator Preview:**
- Simplified step indicator
- Form fields stack vertically

**Footer:**
- Single column layout
- Links stack vertically
- Social icons in row

### Mobile-specific CTAs:
**Primary Mobile CTAs:** 
- Floating "Schedule Consultation" button on scroll
- Persistent CTA in mobile menu
- Tap-to-call button for phone number

**Mobile Form Optimization:** 
- Simplified form fields
- Auto-complete suggestions
- Calendar integration optimized for mobile

---

## IMPLEMENTATION PRIORITIES

### Phase 1 Priority Pages:
1. Homepage (complete structure)
2. Portfolio gallery (with basic filters)
3. Contact page with booking form
4. Services overview page

### Phase 2 Priority Pages:
5. Portfolio detail pages (template)
6. Service detail pages
7. Design Process page
8. About overview page

### Phase 3 Priority Pages:
9. Materials gallery
10. Bespoke calculator
11. Designer profiles
12. Blog/Inspiration pages

### Mobile Optimization:
- Responsive design from initial implementation
- Mobile navigation priority
- Touch-optimized interactions
- Mobile-specific CTA placement

This information architecture creates a premium luxury website that is simpler and more curated than Livspace, with clear conversion paths optimized for affluent clients while maintaining modern, clean design principles.