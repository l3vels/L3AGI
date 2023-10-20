import localeEn from './locales/en.json'

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  detection: {
    order: ['localStorage'],
    caches: ['localStorage'],
  },
  whitelist: ['en', 'uk', 'au'],
  resources: {
    en: {
      translation: localeEn,
    },
  },
  fallbackLng: localStorage.getItem('lng') || 'en',
  lng: localStorage.getItem('lng') || 'en',
  interpolation: { escapeValue: false },
}
