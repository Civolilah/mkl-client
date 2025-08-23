/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { request, route, useToast } from '@helpers/index';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import countries from 'i18n-iso-countries';
import bs from 'i18n-iso-countries/langs/bs.json';
import de from 'i18n-iso-countries/langs/de.json';
import en from 'i18n-iso-countries/langs/en.json';
import es from 'i18n-iso-countries/langs/es.json';
import fr from 'i18n-iso-countries/langs/fr.json';
import hi from 'i18n-iso-countries/langs/hi.json';
import hr from 'i18n-iso-countries/langs/hr.json';
import it from 'i18n-iso-countries/langs/it.json';
import pt from 'i18n-iso-countries/langs/pt.json';
import sr from 'i18n-iso-countries/langs/sr.json';
import tr from 'i18n-iso-countries/langs/tr.json';
import zh from 'i18n-iso-countries/langs/zh.json';
import { useAtomValue } from 'jotai';
import { useTranslation as useTranslationBase } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { Box, Button, LayoutWrapper, Modal, Text } from '@components/index';
import {
  AVAILABLE_LANGUAGES,
  Languages,
} from '@components/layout/LanguageSwitcher';

import { useSwitchLanguage, useTheme, useTranslation } from '@hooks/index';

import { routes } from './routes';

countries.registerLocale(en);
countries.registerLocale(bs);
countries.registerLocale(de);
countries.registerLocale(fr);
countries.registerLocale(it);
countries.registerLocale(es);
countries.registerLocale(pt);
countries.registerLocale(tr);
countries.registerLocale(zh);
countries.registerLocale(hi);
countries.registerLocale(hr);
countries.registerLocale(sr);

dayjs.extend(utc);

const App = () => {
  const t = useTranslation();

  const theme = useTheme();
  const toast = useToast();
  const { i18n } = useTranslationBase();

  const navigate = useNavigate();
  const switchLanguage = useSwitchLanguage();

  const currentUserCompanyDetails = useAtomValue(userCompanyAtom);
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  const handleDisplayWelcomeModal = () => {
    if (currentUserCompanyDetails?.created_at) {
      const timeDifference = dayjs
        .utc(dayjs().utc().unix() * 1000)
        .diff(currentUserCompanyDetails.created_at * 1000, 'seconds');

      if (timeDifference <= 5) {
        setTimeout(() => {
          setIsWelcomeModalOpen(true);
        }, 250);
      }
    }
  };

  const handleNavigateNotFoundPage = () => {
    navigate(route('/not_found'));
  };

  const handleNavigateUnauthorizedPage = () => {
    navigate(route('/unauthorized'));
  };

  const handleLogoutUser = () => {
    localStorage.removeItem('MKL-TOKEN');
    localStorage.removeItem('DEFAULT-MKL-COMPANY');

    window.location.reload();
  };

  const handleDisplayErrorToaster = (event: Event) => {
    const { message } = (event as CustomEvent).detail;

    if (message) {
      toast.error(message);
    }
  };

  useEffect(() => {
    (async () => {
      const currentStoredLanguage = localStorage.getItem('MKL-LOCALE');

      let ipStackResponse = null;

      if (!currentStoredLanguage) {
        ipStackResponse = await request('POST', '/api/location').then(
          (res) => res.data.data
        );
      }

      const currentLocale =
        currentStoredLanguage || ipStackResponse?.language || 'en';

      if (
        currentLocale &&
        AVAILABLE_LANGUAGES.includes(currentLocale as Languages) &&
        i18n.language !== currentLocale
      ) {
        switchLanguage(currentLocale);
      }
    })();
  }, []);

  useEffect(() => {
    window.addEventListener(
      'navigate_not_found_page',
      handleNavigateNotFoundPage
    );

    window.addEventListener(
      'navigate_unauthorized_page',
      handleNavigateUnauthorizedPage
    );

    window.addEventListener('logout_user', handleLogoutUser);

    window.addEventListener('display_error_toaster', handleDisplayErrorToaster);

    return () => {
      window.removeEventListener(
        'navigate_not_found_page',
        handleNavigateNotFoundPage
      );

      window.removeEventListener(
        'navigate_unauthorized_page',
        handleNavigateUnauthorizedPage
      );

      window.removeEventListener(
        'display_error_toaster',
        handleDisplayErrorToaster
      );

      window.removeEventListener('logout_user', handleLogoutUser);
    };
  }, []);

  useEffect(() => {
    if (currentUserCompanyDetails?.created_at) {
      handleDisplayWelcomeModal();
    }
  }, [currentUserCompanyDetails?.created_at]);

  return (
    <Box className="w-screen h-screen">
      <ConfigProvider wave={{ disabled: true }} theme={theme}>
        <Modal
          size="small"
          title={t('welcome')}
          visible={isWelcomeModalOpen}
          onClose={() => setIsWelcomeModalOpen(false)}
        >
          <Box className="flex flex-col items-center space-y-6 w-full">
            <Text className="text-base font-medium">
              {t('add_first_product')}
            </Text>

            <Button
              type="primary"
              className="w-full"
              onClick={() => {
                navigate(route('/products/new'));
                setIsWelcomeModalOpen(false);
              }}
            >
              {t('add_product')}
            </Button>
          </Box>
        </Modal>

        <ToastContainer />

        <LayoutWrapper>{routes}</LayoutWrapper>
      </ConfigProvider>
    </Box>
  );
};

export default App;
