/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Icon, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

const NotFound = () => {
  const t = useTranslation();

  const navigate = useNavigate();

  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Box className="flex flex-col items-center justify-center min-h-screen min-w-full px-2">
      <Text className="text-6xl font-bold mb-4 text-center">404</Text>
      <Text className="text-xl text-gray-600 mb-8 text-center">
        {t('page_not_found')}
      </Text>
      <Text className="text-md text-gray-500 mb-8 text-center">
        {t('page_does_not_exist')}
      </Text>

      <Button onClick={() => navigate('/')}>
        <Box className="flex items-center space-x-1 md:space-x-2">
          <Box>
            <Icon name="home" size={isMiddleScreen ? 20 : 18} />
          </Box>

          <Text style={{ fontSize: isMiddleScreen ? '15px' : '13px' }}>
            {t('home')}
          </Text>
        </Box>
      </Button>
    </Box>
  );
};

export default NotFound;
