// src/utils/vocabulary.ts
import type { ComposerTranslation } from 'vue-i18n'; // Import the type for better type safety

export interface VocabularyItem {
  id: string;
  key: string;
}

export const PLACES: VocabularyItem[] = [
  { id: 'lupa', key: 'places.underground' },
  { id: 'mun', key: 'places.bedroom' },
  { id: 'nasin', key: 'places.street' },
  { id: 'nena', key: 'places.nature' },
  { id: 'suno', key: 'places.workplace' },
  { id: 'tomo', key: 'places.home' }
];

export const INTERACTIONS: VocabularyItem[] = [
  { id: 'esun', key: 'interactions.collaborative' },
  { id: 'mani', key: 'interactions.protecting' },
  { id: 'pilin', key: 'interactions.kind' },
  { id: 'sona', key: 'interactions.wise' },
  { id: 'tenpo', key: 'interactions.punctual' },
  { id: 'utala', key: 'interactions.courageous' }
];

// Accept the translation function 't' as a parameter
export function getPlaceName(t: ComposerTranslation, placeId: string): string {
  const place = PLACES.find((p) => p.id === placeId);
  return place ? t(place.key) : placeId;
}

// Accept the translation function 't' as a parameter
export function getInteractionName(t: ComposerTranslation, interactionId: string): string {
  const interaction = INTERACTIONS.find((i) => i.id === interactionId);
  return interaction ? t(interaction.key) : interactionId;
}