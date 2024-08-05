/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { Button as BaseButton } from 'antd';
import { CSSProperties, ReactNode } from 'react';

type Props = {
  htmlType?: 'submit' | 'button' | 'reset';
  type?: 'primary' | 'default' | 'link' | 'text' | 'dashed';
  className?: string;
  disabled?: boolean;
  disabledWithLoadingIcon?: boolean;
  onClick?: () => void;
  children: ReactNode;
  size?: 'large' | 'middle' | 'small';
  style?: CSSProperties;
};

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

  return (
    <BaseButton
      className="w-full transition-none shadow-none border-0 rounded-none"
      type={type}
      disabled={disabled && !disabledWithLoadingIcon}
      loading={disabled && disabledWithLoadingIcon}
      onClick={onClick}
      style={{
        color: 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.8 : 1,
        transition: 'background-color 0.3s ease',
        ...style,
      }}
      size={size}
    >
      {children}
    </BaseButton>
  );
};

export default Button;
