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

import { useToast } from '@helpers/index';
import { ConfigProvider } from 'antd';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  AVAILABLE_LANGUAGES,
  Languages,
} from '@components/layout/LanguageSwitcher';

import { useSwitchLanguage, useTheme } from '@hooks/index';

import { routes } from './routes';

const App = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  const toast = useToast();

  const navigate = useNavigate();
  const switchLanguage = useSwitchLanguage();

  const handleDisplayWelcomeMessage = () => {
    toast.success('Welcome!');
  };

  const handleNavigateNotFoundPage = () => {
    navigate('/not_found');
  };

  const handleDisplayErrorToaster = (event: Event) => {
    const { message } = (event as CustomEvent).detail;

    if (message) {
      toast.error(message);
    }
  };

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

    window.addEventListener(
      'navigate_not_found_page',
      handleNavigateNotFoundPage
    );

    window.addEventListener(
      'display_welcome_message',
      handleDisplayWelcomeMessage
    );

    window.addEventListener('display_error_toaster', handleDisplayErrorToaster);

    return () => {
      window.removeEventListener(
        'navigate_not_found_page',
        handleNavigateNotFoundPage
      );

      window.removeEventListener(
        'display_error_toaster',
        handleDisplayErrorToaster
      );

      window.removeEventListener(
        'display_welcome_message',
        handleDisplayWelcomeMessage
      );
    };
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
