/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect } from 'react';

import { ConfigProvider } from 'antd';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import {
  AVAILABLE_LANGUAGES,
  Languages,
} from '@components/layout/LanguageSwitcher';

import { useSwitchLanguage, useTheme } from '@hooks/index';

import { routes } from './routes';

const App = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  const switchLanguage = useSwitchLanguage();

  useEffect(() => {
    const currentStoredLanguage = localStorage.getItem('MKL-LOCALE');
    const currentLocale =
      currentStoredLanguage || navigator.language.split('-')[0];

    if (
      currentLocale &&
      AVAILABLE_LANGUAGES.includes(currentLocale as Languages) &&
      i18n.language !== currentLocale
    ) {
      switchLanguage(currentLocale);
    }
  }, []);

  return (
    <div className="min-w-full min-h-screen">
      <ConfigProvider wave={{ disabled: true }} theme={theme}>
        <Toaster position="top-center" />

        {routes}
      </ConfigProvider>
    </div>
  );
};

export default App;
