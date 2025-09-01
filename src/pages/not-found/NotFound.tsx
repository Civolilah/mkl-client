/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Suspense, useEffect } from 'react';

import { route } from '@helpers/index';
import { useSetAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Icon, Text, LoadingScreen } from '@components/index';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';
import { useTranslation } from '@hooks/index';

const NotFound = () => {
  const t = useTranslation();

  const navigate = useNavigate();

  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const setPageLayoutAndActions = useSetAtom(pageLayoutAndActionsAtom);

  useEffect(() => {
    setPageLayoutAndActions(undefined);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Box className="flex flex-col items-center justify-center min-h-screen min-w-full px-2">
        <Text className="text-6xl font-bold mb-4 text-center">404</Text>
        <Text className="text-xl text-gray-600 mb-8 text-center">
          {t('page_not_found')}
        </Text>
        <Text className="text-md text-gray-500 mb-8 text-center">
          {t('page_does_not_exist')}
        </Text>

        <Button
          icon={
            <Icon name="home" size={isMiddleScreen ? '1.25rem' : '1.125rem'} />
          }
          onClick={() => navigate(route('/'))}
        >
          {t('home')}
        </Button>
      </Box>
    </Suspense>
  );
};

export default NotFound;
