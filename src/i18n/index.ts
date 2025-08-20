// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import tr from './locales/tr.json';

const getLanguageCode = () => {
  const locales = RNLocalize.getLocales();
  if (locales.length > 0) {
    return locales[0].languageCode;
  }
  return 'en';
};

const languageCode = getLanguageCode();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    tr: { translation: tr },
  },
  lng: languageCode,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
