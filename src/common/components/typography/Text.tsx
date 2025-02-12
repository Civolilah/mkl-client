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
  onClick?: () => void;
};

const Text = (props: Props) => {
  const { children, className, style, onClick } = props;

  return (
    <span className={className} style={style} onClick={onClick}>
      {children}
    </span>
  );
};

export default Text;
