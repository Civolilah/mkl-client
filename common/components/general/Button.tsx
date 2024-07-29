/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Button as BaseButton } from 'antd';
import { CSSProperties, ReactNode } from 'react';

import { useAccentColor } from '@hooks/index';

interface Props {
  type?: 'primary' | 'default' | 'link' | 'text' | 'dashed';
  className?: string;
  disabled?: boolean;
  disabledWithLoadingIcon?: boolean;
  onClick?: () => void;
  children: ReactNode;
  size?: 'large' | 'middle' | 'small';
  style?: CSSProperties;
}

const Button = (props: Props) => {
  const {
    disabled,
    onClick,
    children,
    size = 'large',
    type = 'primary',
    style,
    disabledWithLoadingIcon,
  } = props;

  const accentColor = useAccentColor();

  return (
    <BaseButton
      className="w-full transition-none shadow-none border-0 rounded-none"
      type={type}
      disabled={disabled && !disabledWithLoadingIcon}
      loading={disabled && disabledWithLoadingIcon}
      onClick={onClick}
      style={{
        backgroundColor: accentColor,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      size={size}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
