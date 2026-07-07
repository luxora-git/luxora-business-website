import type { EstimatorCategorySlug } from './types';

/**
 * Category-specific personalisation questions — Phase 5. Config-driven so
 * the Questions screen is one generic renderer, not three hand-rolled
 * flows (approved Implementation Plan: "one flow engine, three skins").
 * Option value slugs deliberately match the established pricing ranges so
 * the Budget phase can key its rate tables directly off these answers.
 */

export interface EstimatorQuestionOption {
  value: string;
  label: string;
  description?: string;
}

export interface EstimatorRoomConfig {
  key: string;
  label: string;
  min: number;
  max: number;
}

export interface EstimatorQuestion {
  /** Answer key in flow state (answers[key]). */
  key: string;
  question: string;
  questionItalic?: string;
  subtitle?: string;
  type: 'option-select' | 'room-counter';
  options?: EstimatorQuestionOption[];
  rooms?: EstimatorRoomConfig[];
}

export const FULL_HOME_ROOMS: EstimatorRoomConfig[] = [
  { key: 'livingRoom', label: 'Living Room', min: 1, max: 3 },
  { key: 'kitchen', label: 'Kitchen', min: 1, max: 3 },
  { key: 'bedroom', label: 'Bedroom', min: 0, max: 10 },
  { key: 'bathroom', label: 'Bathroom', min: 0, max: 10 },
  { key: 'dining', label: 'Dining', min: 0, max: 3 },
  { key: 'balcony', label: 'Balcony', min: 0, max: 5 },
];

export const estimatorQuestions: Record<EstimatorCategorySlug, EstimatorQuestion[]> = {
  'full-home': [
    {
      key: 'bhkType',
      question: 'How large is',
      questionItalic: 'your home?',
      subtitle: 'Choose the configuration that matches your home.',
      type: 'option-select',
      options: [
        { value: '1bhk', label: '1 BHK', description: '1 bedroom, hall & kitchen' },
        { value: '2bhk', label: '2 BHK', description: '2 bedrooms, hall & kitchen' },
        { value: '3bhk', label: '3 BHK', description: '3 bedrooms, hall & kitchen' },
        { value: '4bhk', label: '4 BHK', description: '4 bedrooms, hall & kitchen' },
        { value: '5plus-bhk', label: '5+ BHK', description: '5 or more bedrooms' },
      ],
    },
    {
      key: 'carpetAreaRange',
      question: "What's your",
      questionItalic: 'carpet area?',
      subtitle: 'An approximate range is perfect — your designer will measure precisely later.',
      type: 'option-select',
      options: [
        { value: 'below-800', label: 'Below 800 sq ft', description: 'Compact & considered' },
        { value: '800-1200', label: '800 – 1,200 sq ft', description: 'Comfortable mid-size' },
        { value: '1200-1800', label: '1,200 – 1,800 sq ft', description: 'Spacious living' },
        { value: '1800-2500', label: '1,800 – 2,500 sq ft', description: 'Large premium home' },
        { value: '2500-plus', label: '2,500+ sq ft', description: 'Luxury estate' },
      ],
    },
    {
      key: 'rooms',
      question: 'Which rooms shall',
      questionItalic: 'we design?',
      subtitle: 'Defaults are set from your BHK — adjust to match your plans.',
      type: 'room-counter',
      rooms: FULL_HOME_ROOMS,
    },
  ],
  kitchen: [
    {
      key: 'kitchenShape',
      question: 'What shape is',
      questionItalic: 'your kitchen?',
      subtitle: 'The layout shapes what your kitchen can become.',
      type: 'option-select',
      options: [
        { value: 'l-shape', label: 'L-Shape', description: 'Two adjacent walls' },
        { value: 'u-shape', label: 'U-Shape', description: 'Three walls of counter' },
        { value: 'parallel', label: 'Parallel', description: 'Two facing counters' },
        { value: 'straight', label: 'Straight', description: 'A single clean wall' },
        { value: 'island', label: 'Island', description: 'With a central island' },
      ],
    },
    {
      key: 'kitchenSizeRange',
      question: 'How large is',
      questionItalic: 'your kitchen?',
      subtitle: 'An approximate range is perfect.',
      type: 'option-select',
      options: [
        { value: 'below-60', label: 'Below 60 sq ft', description: 'Compact kitchen' },
        { value: '60-100', label: '60 – 100 sq ft', description: 'Standard size' },
        { value: '100-150', label: '100 – 150 sq ft', description: 'Spacious kitchen' },
        { value: '150-plus', label: '150+ sq ft', description: 'Large gourmet kitchen' },
      ],
    },
    {
      key: 'kitchenFinish',
      question: 'Choose your',
      questionItalic: 'finish level',
      subtitle: 'From timeless classics to ultra-premium surfaces.',
      type: 'option-select',
      options: [
        { value: 'laminate', label: 'Laminate', description: 'Durable, versatile, timeless' },
        { value: 'acrylic', label: 'Acrylic', description: 'High-gloss premium look' },
        { value: 'membrane', label: 'Membrane', description: 'Textured matte elegance' },
        { value: 'lacquer', label: 'Lacquer Glass', description: 'Ultra-premium glass finish' },
      ],
    },
  ],
  wardrobe: [
    {
      key: 'wardrobeType',
      question: 'What type of',
      questionItalic: 'wardrobe?',
      subtitle: 'Choose the configuration that fits your space.',
      type: 'option-select',
      options: [
        { value: 'sliding', label: 'Sliding', description: 'Space-saving sliding doors' },
        { value: 'openable', label: 'Openable', description: 'Classic hinged doors' },
        { value: 'walk-in', label: 'Walk-In', description: 'A dedicated dressing room' },
      ],
    },
    {
      key: 'wardrobeFinish',
      question: 'Choose your',
      questionItalic: 'finish',
      subtitle: 'The surface you’ll touch every day.',
      type: 'option-select',
      options: [
        { value: 'laminate', label: 'Laminate', description: 'Wide range of textures' },
        { value: 'membrane', label: 'Membrane', description: 'Textured matte elegance' },
        { value: 'lacquer', label: 'Lacquer Glass', description: 'High-gloss premium finish' },
      ],
    },
  ],
};

const BHK_COUNTS: Record<string, number> = {
  '1bhk': 1,
  '2bhk': 2,
  '3bhk': 3,
  '4bhk': 4,
  '5plus-bhk': 5,
};

/** Derives sensible room-count defaults from the visitor's BHK answer. */
export function getRoomDefaultsFromBhk(bhkValue: unknown): Record<string, number> {
  const count = typeof bhkValue === 'string' ? (BHK_COUNTS[bhkValue] ?? 2) : 2;
  return {
    livingRoom: 1,
    kitchen: 1,
    bedroom: count,
    bathroom: count,
    dining: 0,
    balcony: 0,
  };
}
