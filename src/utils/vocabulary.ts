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