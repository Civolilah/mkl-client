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
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { useTranslation as useTranslationBase } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CustomFieldsType } from '@pages/settings/pages/custom-fields/CustomFields';
import { ProfileType } from '@pages/settings/pages/profile/Profile';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { Box, Button, LayoutWrapper, Modal, Text } from '@components/index';
import {
  AVAILABLE_LANGUAGES,
  Languages,
} from '@components/layout/LanguageSwitcher';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';
import {
  useFetchEntity,
  useHasPermission,
  useSwitchLanguage,
  useTheme,
  useTranslation,
} from '@hooks/index';

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

export const profileSettingsAtom = atom<ProfileType | undefined>(undefined);
export const customFieldsAtom = atom<CustomFieldsType | undefined>(undefined);

const App = () => {
  const t = useTranslation();

  const theme = useTheme();
  const toast = useToast();
  const location = useLocation();
  const { i18n } = useTranslationBase();

  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const switchLanguage = useSwitchLanguage();

  const currentUserCompanyDetails = useAtomValue(userCompanyAtom);
  const setPageLayoutAndActions = useSetAtom(pageLayoutAndActionsAtom);

  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState<boolean>(false);

  const setProfile = useSetAtom(profileSettingsAtom);
  const setCustomFields = useSetAtom(customFieldsAtom);

  useFetchEntity<ProfileType>({
    queryIdentifiers: ['/api/users/profile'],
    endpoint: '/api/users/profile',
    setEntity: setProfile,
    withoutQueryId: true,
    enableByPermission:
      location.pathname.includes('login') &&
      location.pathname.includes('register'),
  });

  useFetchEntity<CustomFieldsType>({
    queryIdentifiers: ['/api/companies/custom_fields'],
    endpoint: '/api/companies/custom_fields',
    setEntity: setCustomFields,
    withoutQueryId: true,
    enableByPermission:
      hasPermission('admin') &&
      !location.pathname.includes('login') &&
      !location.pathname.includes('register'),
  });

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
    setPageLayoutAndActions(undefined);

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
