/**
 * Luxora company statistics — the ONE source of truth for every marketing
 * number shown anywhere on the site (hero trust bars, navbar utility strip,
 * process/trust sections, service pages, footer, etc.). Previously these
 * numbers were hardcoded independently in a dozen+ components and had
 * drifted out of sync (e.g. "500+" vs "2,500+" homes delivered in
 * different places). Change a value here once; every consumer updates.
 */

export const luxoraStats = {
  /** Headline "homes/projects delivered" figure, shown as "500+". */
  homesDelivered: '500+',
  /** Aggregate client rating out of 5, shown as "4.9★". */
  clientRating: '4.9',
  /** Years Luxora has been operating, shown as "10+". */
  yearsExperience: '10+',
  /** Cities served, shown as "15". */
  cities: '15',
  /** Total published design ideas across the Design Gallery, shown as "5,000+". */
  totalDesignIdeas: '5,000+',
  /** Average full-home delivery time in days, shown as "45 Day". */
  avgDeliveryDays: '45',
  /** Structural warranty period in years, shown as "10 Year". */
  warrantyYears: '10',
  /** Quality checkpoints per project, shown as "150". */
  qualityChecks: '150',
  /** In-house design experts, shown as "50+". */
  experts: '50+',
  /** Design awards won, shown as "3". */
  awards: '3',
  /** Material/finish catalogue size, shown as "2 Lakh+". */
  catalogueChoices: '2 Lakh+',
  /** Standard free-site-visit trust claim, used verbatim across trust bars. */
  freeSiteVisitLabel: 'Free Site Visit',
} as const;

/** Per-room design counts on the Design Gallery — one shared table so every listing agrees. */
export const luxoraDesignCountsByRoom = {
  livingRooms: '1,200+',
  bedrooms: '900+',
  kitchens: '800+',
  bathrooms: '700+',
  wardrobes: '600+',
  homeOffices: '400+',
} as const;
