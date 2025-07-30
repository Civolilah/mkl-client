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

import { useAccentColor, useColors } from '@hooks/index';

import Box from './Box';

const largeButtonStyle = {
  height: '2.5rem',
  padding: '0.5rem 0.6875rem',
};

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
  background-color: ${(props) => props.theme.backgroundColor} !important;

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
  const accentColor = useAccentColor();
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const getButtonStyle = () => {
    if (size === 'large') {
      return {
        ...largeButtonStyle,
        color: type === 'default' ? 'black' : 'white',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.8 : 1,
        transition: 'background-color 0.3s ease',
        borderColor: type === 'default' ? colors.$17 : '',
        ...style,
      };
    }

    return {
      color: type === 'default' ? 'black' : 'white',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.8 : 1,
      transition: 'background-color 0.3s ease',
      borderColor: type === 'default' ? colors.$17 : '',
      paddingTop: isMiddleScreen ? '0.5rem' : '0.5rem',
      paddingBottom: isMiddleScreen ? '0.5rem' : '0.5rem',
      paddingLeft: isMiddleScreen ? '1rem' : '0.75rem',
      paddingRight: isMiddleScreen ? '1rem' : '0.75rem',
      ...style,
    };
  };

  return (
    <StyledBaseButton
      className={classNames(
        'transition-none rounded-none shadow-sm',
        {
          'border-none': type !== 'default',
          'text-base': size === 'large',
          'text-sm': size === 'middle',
        },
        className
      )}
      type={type}
      icon={icon ? <Box>{icon}</Box> : null}
      disabled={disabled && !disabledWithLoadingIcon}
      loading={disabled && disabledWithLoadingIcon}
      onClick={onClick}
      style={getButtonStyle()}
      size={size}
      theme={{
        backgroundColor: type === 'default' && disabled ? 'transparent' : '',
        hoverBackgroundColor:
          type === 'default' && !disabled
            ? colors.$18
            : type === 'primary' && disabled
              ? accentColor
              : '',
      }}
    >
      {children}
    </StyledBaseButton>
  );
};

export default Button;
