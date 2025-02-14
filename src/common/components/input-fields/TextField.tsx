/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { KeyboardEvent, useEffect, useState } from 'react';

import { COMPONENTS_FONT_SIZE } from '@constants/index';
import { Input } from 'antd';
import { useDebounce } from 'react-use';

import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

const semiLargeInputStyle = {
  padding: '0.5rem 0.6875rem',
  fontSize: COMPONENTS_FONT_SIZE,
  lineHeight: '1.6',
  height: '2.25rem',
};

type Props = {
  maxLength?: number;
  size?: 'large' | 'middle' | 'small' | 'semi-large';
  type?: 'text' | 'password' | 'email';
  label?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement> | undefined) => void;
  debounce?: number;
  withoutOptionalText?: boolean;
  autoComplete?: 'email';
  changeOnBlur?: boolean;
};

const TextField = (props: Props) => {
  const {
    value,
    onValueChange,
    label,
    type = 'text',
    placeHolder,
    errorMessage,
    onPressEnter,
    required = false,
    disabled = false,
    maxLength,
    size = 'semi-large',
    debounce,
    withoutOptionalText,
    autoComplete,
    changeOnBlur = false,
  } = props;

  const [currentValue, setCurrentValue] = useState<string>(value);

  useDebounce(
    () => {
      if (!changeOnBlur) {
        onValueChange?.(currentValue);
      }
    },
    debounce ?? 300,
    [currentValue]
  );

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const getInputStyle = () => {
    if (size === 'semi-large') {
      return { ...semiLargeInputStyle, boxShadow: 'none' };
    }
    return { boxShadow: 'none' };
  };

  return (
    <Box className="flex flex-col space-y-1 w-full">
      {label && (
        <Box className="flex items-center space-x-1">
          <Label>{label}</Label>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      {type !== 'password' && (
        <Input
          className="rounded-none"
          type={type}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={(event) =>
            changeOnBlur && onValueChange?.(event.target.value)
          }
          maxLength={maxLength}
          placeholder={placeHolder}
          onKeyDown={(event) => {
            event.stopPropagation();

            if (event.key === 'Enter') {
              onPressEnter?.(event);
            }
          }}
          disabled={disabled}
          size={size === 'semi-large' ? 'middle' : size}
          style={getInputStyle()}
          autoComplete={autoComplete}
        />
      )}

      {type === 'password' && (
        <Input.Password
          className="rounded-none"
          type={type}
          value={currentValue}
          placeholder={placeHolder}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={(event) =>
            changeOnBlur && onValueChange?.(event.target.value)
          }
          maxLength={maxLength}
          disabled={disabled}
          size={size === 'semi-large' ? 'middle' : size}
          onKeyDown={(event) => {
            event.stopPropagation();

            if (event.key === 'Enter') {
              onPressEnter?.(event);
            }
          }}
          style={getInputStyle()}
        />
      )}

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default TextField;
