/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { Button as BaseButton } from 'antd';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { useColors } from '@hooks/index';

import Box from './Box';

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
  icon?: ReactNode;
};

const StyledBaseButton = styled(BaseButton)`
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor} !important;
  }
`;

const Button = (props: Props) => {
  const {
    disabled,
    onClick,
    children,
    size = 'large',
    type = 'primary',
    style,
    disabledWithLoadingIcon,
    className,
    icon,
  } = props;

  const colors = useColors();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <StyledBaseButton
      className={classNames(
        'transition-none rounded-none shadow-sm',
        {
          'border-none': type !== 'default',
        },
        className
      )}
      type={type}
      icon={icon ? <Box>{icon}</Box> : null}
      disabled={disabled && !disabledWithLoadingIcon}
      loading={disabled && disabledWithLoadingIcon}
      onClick={onClick}
      style={{
        fontSize: isSmallScreen ? '0.9rem' : '0.975rem',
        letterSpacing: 0.8,
        color: type === 'default' ? 'black' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.8 : 1,
        transition: 'background-color 0.3s ease',
        borderColor: type === 'default' ? colors.$17 : '',
        padding: isMiddleScreen ? '0.75rem' : '0.5rem',
        ...style,
      }}
      size={size}
      theme={{
        hoverBackgroundColor: type === 'default' ? colors.$18 : '',
      }}
    >
      {children}
    </StyledBaseButton>
  );
};

export default Button;
