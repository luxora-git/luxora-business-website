import { interiorElements } from './elements';
import { products } from './products';
import type { CatalogItem } from './types';

export { interiorElements } from './elements';
export { products } from './products';
export type { CatalogItem, CatalogImage } from './types';

export function getInteriorElement(slug: string): CatalogItem | undefined {
  return interiorElements.find((e) => e.slug === slug);
}

export function getProduct(slug: string): CatalogItem | undefined {
  return products.find((p) => p.slug === slug);
}
