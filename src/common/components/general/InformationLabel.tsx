/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import { Text, Box, Icon } from '@components/index';

import { useColors } from '@hooks/index';

type Props = {
  text: string | ReactNode;
};

const InformationLabel = (props: Props) => {
  const { text } = props;

  const colors = useColors();

  return (
    <Box className="flex items-center space-x-2">
      <Box className="mt-0.5">
        <Icon name="information" size="1.35rem" />
      </Box>

      <Text className="text-xs" style={{ color: colors.$16 }}>
        {text}
      </Text>
    </Box>
  );
};

export default InformationLabel;
