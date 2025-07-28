/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { KeyboardEvent, ReactNode, useEffect, useState } from 'react';

import { InputNumber } from 'antd';
import { useDebounce } from 'react-use';

import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

type Props = {
  min?: number;
  max?: number;
  size?: 'large' | 'middle' | 'small' | 'semi-large';
  type?: 'text' | 'password' | 'email' | 'textarea';
  label?: string;
  value: number;
  required?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  onValueChange: (value: number) => void;
  errorMessage?: string;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement> | undefined) => void;
  debounce?: number;
  withoutOptionalText?: boolean;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  disablePlaceholderValue?: string;
};

const NumberField = (props: Props) => {
  const {
    value,
    onValueChange,
    label,
    placeHolder,
    errorMessage,
    required = false,
    disabled = false,
    min,
    max,
    size = 'large',
    debounce,
    withoutOptionalText,
    addonAfter,
    disablePlaceholderValue,
  } = props;

  const [currentValue, setCurrentValue] = useState<number>(value);

  useDebounce(
    () => {
      onValueChange(currentValue);
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

      <InputNumber<number>
        min={min}
        max={max}
        className="shadow-none"
        rootClassName="shadow-none"
        value={currentValue}
        formatter={(value) => {
          if (disablePlaceholderValue && disabled) {
            return disablePlaceholderValue;
          }

          return String(value || '');
        }}
        placeholder={placeHolder}
        size={size === 'semi-large' ? 'middle' : size}
        onChange={(value) => setCurrentValue(value || 0)}
        disabled={disabled}
        addonAfter={addonAfter}
      />

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default NumberField;
