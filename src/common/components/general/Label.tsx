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

import classNames from 'classnames';

import { Text } from '@components/index';

type Props = {
  children: ReactNode;
  className?: string;
};

const Label = (props: Props) => {
  const { children, className } = props;

  return <Text className={classNames('text-sm', className)}>{children}</Text>;
};

export default Label;
