import { use } from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import config from 'i18n/config'

const i18next = use(initReactI18next).use(LanguageDetector).init(config)

export default i18next
