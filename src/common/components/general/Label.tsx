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

type Props = {
  children: ReactNode;
  className?: string;
};

const Label = (props: Props) => {
  const { children, className } = props;

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Text
      className={className}
      style={{
        fontSize: isSmallScreen ? '0.76rem' : '0.875rem',
        fontWeight: 500,
      }}
    >
      {children}
    </Text>
  );
};

export default Label;
