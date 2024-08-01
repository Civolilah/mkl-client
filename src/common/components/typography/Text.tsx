/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
}

const Text = (props: Props) => {
  const { children, className } = props;

  return <span className={className}>{children}</span>;
};

export default Text;
