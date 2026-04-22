import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

const LANGUAGES = ['es', 'en'];
const OUT_CLASS = 'lang-switching-out';
const IN_CLASS = 'lang-switching-in';
const OUT_DURATION_MS = 170;
const IN_DURATION_MS = 260;

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [isSwitching, setIsSwitching] = useState(false);
  const timersRef = useRef([]);
  const currentLanguage = i18n.resolvedLanguage || i18n.language || 'es';

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => {
      clearTimers();
      document.body.classList.remove(OUT_CLASS, IN_CLASS);
    };
  }, []);

  const handleChangeLanguage = async (lang) => {
    if (lang === currentLanguage || isSwitching) return;

    setIsSwitching(true);
    clearTimers();
    document.body.classList.remove(IN_CLASS);
    document.body.classList.add(OUT_CLASS);

    const outTimer = window.setTimeout(async () => {
      await i18n.changeLanguage(lang);
      document.body.classList.remove(OUT_CLASS);
      document.body.classList.add(IN_CLASS);

      const inTimer = window.setTimeout(() => {
        document.body.classList.remove(IN_CLASS);
        setIsSwitching(false);
      }, IN_DURATION_MS);
      timersRef.current.push(inTimer);
    }, OUT_DURATION_MS);

    timersRef.current.push(outTimer);
  };

  return (
    <div className="language-switcher" aria-label={t('languageSwitcher.label')}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleChangeLanguage(lang)}
          className={`language-switcher-btn ${currentLanguage === lang ? 'active' : ''}`}
          aria-label={`${t('languageSwitcher.label')}: ${t(`languageSwitcher.${lang}`)}`}
          disabled={isSwitching}
        >
          {t(`languageSwitcher.${lang}`)}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
