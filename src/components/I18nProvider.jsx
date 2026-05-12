'use client';

import { useEffect } from 'react';
import { syncClientLanguage } from '../i18n';

const I18nProvider = ({ children }) => {
  useEffect(() => {
    syncClientLanguage();
  }, []);

  return children;
};

export default I18nProvider;
