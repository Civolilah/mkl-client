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

import { useToast } from '@helpers/index';
import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAtomValue } from 'jotai';
import { publicIp } from 'public-ip';
import { Toaster } from 'react-hot-toast';
import { useTranslation as useTranslationBase } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { Box, Button, Modal, Text } from '@components/index';
import {
  AVAILABLE_LANGUAGES,
  Languages,
} from '@components/layout/LanguageSwitcher';

import { useSwitchLanguage, useTheme, useTranslation } from '@hooks/index';

import { routes } from './routes';

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
      const currentUnixUTC = dayjs().unix();
      const timeDifferenceInSeconds =
        (currentUnixUTC - currentUserCompanyDetails?.created_at) / 60;

      if (timeDifferenceInSeconds <= 60) {
        setIsWelcomeModalOpen(true);
      }
    }
  };

  const handleNavigateNotFoundPage = () => {
    navigate('/not_found');
  };

  const handleNavigateUnauthorizedPage = () => {
    navigate('/unauthorized');
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
      'navigate_unauthorized_page',
      handleNavigateUnauthorizedPage
    );

    window.addEventListener('display_welcome_modal', handleDisplayWelcomeModal);

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

      window.removeEventListener(
        'display_welcome_modal',
        handleDisplayWelcomeModal
      );
    };
  }, []);

  useEffect(() => {
    (async () => {
      const currentUserIdentifier = localStorage.getItem('MKL-IDENTIFIER');

      if (!currentUserIdentifier) {
        const userIdentifier = await publicIp();

        if (userIdentifier) {
          localStorage.setItem('MKL-IDENTIFIER', userIdentifier);
        } else {
          localStorage.setItem('MKL-IDENTIFIER', uuidv4());
        }
      }
    })();
  }, []);

  return (
    <Box className="w-screen h-screen">
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
            className="w-full"
            type="primary"
            onClick={() => navigate('/products/new')}
          >
            {t('add_product')}
          </Button>
        </Box>
      </Modal>

      <ConfigProvider wave={{ disabled: true }} theme={theme}>
        <Toaster position="top-center" />

        {routes}
      </ConfigProvider>
    </Box>
  );
};

export default App;
