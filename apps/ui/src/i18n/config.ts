import localeUk from './locales/uk.json'
import localeEn from './locales/en.json'
import localeAU from './locales/au.json'

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
    uk: {
      translation: localeUk,
    },
    au: {
      translation: localeAU,
    },
  },
  fallbackLng: localStorage.getItem('lng') || 'en',
  lng: localStorage.getItem('lng') || 'en',
  interpolation: { escapeValue: false },
}
