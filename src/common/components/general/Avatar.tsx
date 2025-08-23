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

import { Avatar as AntdAvatar } from 'antd';

import { useAccentColor } from '@hooks/index';

type Props = {
  className?: string;
  backgroundColor?: string;
  gap?: number;
  children: ReactNode;
  onClick?: () => void;
  size?: 'default' | 'large';
  fontSize?: string;
};

const Avatar = ({
  className,
  backgroundColor,
  gap = 0,
  children,
  onClick,
  size = 'default',
  fontSize = '1.1rem',
}: Props) => {
  const accentColor = useAccentColor();

  return (
    <AntdAvatar
      className={className}
      style={{
        backgroundColor: backgroundColor || accentColor,
        verticalAlign: 'middle',
        fontSize: fontSize,
      }}
      size={size}
      gap={gap}
      onClick={onClick}
    >
      {children}
    </AntdAvatar>
  );
};

export default Avatar;
