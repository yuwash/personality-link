import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    title: 'Personality Links',
    subtitle: 'Create and share your personality profile',
    places: {
      underground: 'Underground',
      bedroom: 'Bedroom',
      street: 'Street',
      nature: 'Nature',
      workplace: 'Workplace',
      home: 'Home'
    },
    interactions: {
      collaborative: 'Collaborative',
      protecting: 'Protecting and growing value',
      kind: 'Kind',
      wise: 'Wise',
      punctual: 'Punctual',
      courageous: 'Courageous'
    },
    labels: {
      selectPlace: 'Select a place',
      selectInteraction: 'Select an interaction',
      add: 'Add',
      share: 'Share',
      remove: 'Remove',
      moveUp: 'Move up',
      moveDown: 'Move down',
      noStatements: 'No personality links created yet. Start by selecting a place and interaction above.',
      linkCopied: 'Link copied to clipboard!',
      copyFailed: 'Failed to copy link. Please copy the URL manually.'
    }
  }
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});