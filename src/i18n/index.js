import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esTranslation from './es/translation.json';
import enTranslation from './en/translation.json';

const STORAGE_KEY = 'portfolio_lang';
const supportedLanguages = ['es', 'en'];

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return 'es';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored && supportedLanguages.includes(stored)) return stored;

  const browserCandidates = [
    ...(window.navigator.languages || []),
    window.navigator.language,
    window.navigator.userLanguage,
  ].filter(Boolean);

  for (const candidate of browserCandidates) {
    const normalized = candidate.toLowerCase().split('-')[0];
    if (supportedLanguages.includes(normalized)) {
      return normalized;
    }
  }

  return 'es';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { translation: esTranslation },
      en: { translation: enTranslation },
    },
    lng: getInitialLanguage(),
    fallbackLng: 'es',
    supportedLngs: supportedLanguages,
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined' && supportedLanguages.includes(lng)) {
    window.localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
