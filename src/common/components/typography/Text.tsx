/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { CSSProperties, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
};

const Text = (props: Props) => {
  const { children, className, style } = props;

  return (
    <span className={className} style={style}>
      {children}
    </span>
  );
};

export default Text;
