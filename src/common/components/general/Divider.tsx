/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties } from 'react';

import { Divider as AntDivider } from 'antd';

import { useColors } from '@hooks/index';

type Props = {
  type?: 'horizontal' | 'vertical';
  orientation?: 'left' | 'right' | 'center';
  className?: string;
  style?: CSSProperties;
  nonDashed?: boolean;
  dividerSize?: string;
};

const Divider = ({
  type = 'horizontal',
  orientation = 'center',
  className,
  style,
  nonDashed,
  dividerSize = '1px',
}: Props) => {
  const colors = useColors();

  return (
    <AntDivider
      type={type}
      orientation={orientation}
      className={className}
      style={{
        margin: 0,
        border: `${dividerSize} ${nonDashed ? 'solid' : 'dashed'} ${colors.$35}`,
        ...style,
      }}
    />
  );
};

export default Divider;
