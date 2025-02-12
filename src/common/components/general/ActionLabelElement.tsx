/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Text, Box, Icon } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

const ActionLabelElement = () => {
  const t = useTranslation();

  const colors = useColors();

  return (
    <Box
      className="flex items-center space-x-1 cursor-pointer"
      style={{ color: colors.$20 }}
    >
      <Text className="text-sm">{t('actions')}</Text>

      <Icon name="arrowDown" size="1.2rem" style={{ color: colors.$20 }} />
    </Box>
  );
};

export default ActionLabelElement;
