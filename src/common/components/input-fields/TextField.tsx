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

import { Input } from 'antd';
import { useDebounce } from 'react-use';

import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

type Props = {
  maxLength?: number;
  size?: 'large' | 'small';
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
    size = 'large',
    placeHolder,
    errorMessage,
    onPressEnter,
    required = false,
    disabled = false,
    maxLength,
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
          size={size}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={() => changeOnBlur && onValueChange?.(currentValue)}
          maxLength={maxLength}
          placeholder={placeHolder}
          onPressEnter={onPressEnter}
          disabled={disabled}
          style={{ boxShadow: 'none' }}
          autoComplete={autoComplete}
        />
      )}

      {type === 'password' && (
        <Input.Password
          className="rounded-none"
          type={type}
          size={size}
          value={currentValue}
          placeholder={placeHolder}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={() => changeOnBlur && onValueChange?.(currentValue)}
          maxLength={maxLength}
          disabled={disabled}
          onPressEnter={onPressEnter}
          style={{ boxShadow: 'none' }}
        />
      )}

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default TextField;
