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

import { useTheme } from '@hooks/index';

import { routes } from './routes';

const App = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = localStorage.getItem('MKL-LOCALE');

    if (currentLanguage) {
      i18n.changeLanguage(currentLanguage);
    }
  }, []);

  return (
    <div className="min-w-full min-h-screen select-none">
      <ConfigProvider wave={{ disabled: true }} theme={theme}>
        <Toaster position="top-center" />

        {routes}
      </ConfigProvider>
    </div>
  );
};

export default App;
