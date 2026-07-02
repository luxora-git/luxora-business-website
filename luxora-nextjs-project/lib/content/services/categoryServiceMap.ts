/**
 * Maps a Design Gallery category slug to its matching Service page slug,
 * so a visitor browsing a room type in the Gallery can jump straight to
 * "book this exact service" — the Gallery → Service leg of the site's
 * navigation chain (Gallery → Category → Single Design → Related Designs →
 * Relevant Service → Relevant Portfolio → Consultation → Estimate).
 */
export const categoryToServiceSlug: Record<string, string> = {
  'living-room': 'living-room-interior-design',
  bedroom: 'bedroom-interior-design',
  kitchen: 'modular-kitchen-design',
  wardrobes: 'wardrobe-design',
  'full-home': 'full-home-interior-design',
  office: 'commercial-office-interior-design',
};

export function getServiceHrefForCategory(categorySlug: string): string | null {
  const slug = categoryToServiceSlug[categorySlug];
  return slug ? `/services/${slug}` : null;
}
