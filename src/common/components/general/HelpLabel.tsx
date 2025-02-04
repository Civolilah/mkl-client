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

import { useMediaQuery } from 'react-responsive';

import { Text } from '@components/index';

import { useColors } from '@hooks/index';

type Props = {
  text: string | ReactNode;
};

const HelpLabel = (props: Props) => {
  const { text } = props;

  const colors = useColors();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Text
      style={{
        color: colors.$16,
        fontSize: isSmallScreen ? '0.6rem' : '0.65rem',
      }}
    >
      {text}
    </Text>
  );
};

export default HelpLabel;
