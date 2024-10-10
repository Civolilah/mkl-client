/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import Box from '@components/general/Box';
import Icon from '@components/general/Icon';
import Text from '@components/typography/Text';

import { useTranslation } from '@hooks/index';

type Props = {
  unauthorizedAction?: boolean;
};

const PermissionScreen = (props: Props) => {
  const t = useTranslation();

  const { unauthorizedAction = false } = props || {};

  return (
    <Box className="flex flex-col items-center justify-center text-center space-y-2">
      <Box>
        <Icon name="closeRounded" style={{ color: 'red' }} size="4rem" />
      </Box>

      <Text className="text-2xl font-bold">{t('access_denied')}</Text>
      <Text className="text-gray-600">
        {unauthorizedAction
          ? t('do_not_have_action_permission')
          : t('do_not_have_page_permission')}
      </Text>
    </Box>
  );
};

export default PermissionScreen;
