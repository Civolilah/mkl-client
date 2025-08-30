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
import { useAtomValue } from 'jotai';
import { useDebounce } from 'react-use';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

type Props = {
  min?: number;
  max?: number;
  size?: 'large' | 'middle' | 'small';
  type?: 'text' | 'password' | 'email' | 'textarea';
  label?: string;
  value: number;
  required?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  onValueChange?: (value: number) => void;
  errorMessage?: string;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement> | undefined) => void;
  debounce?: number;
  withoutOptionalText?: boolean;
  addonAfter?: ReactNode;
  addonBefore?: ReactNode;
  disablePlaceholderValue?: string;
  falsyValuePlaceholder?: string;
  readOnly?: boolean;
  afterLabel?: ReactNode;
};

const NumberField = ({
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
  falsyValuePlaceholder,
  readOnly = false,
  afterLabel,
}: Props) => {
  const userCompany = useAtomValue(userCompanyAtom);

  const [currentValue, setCurrentValue] = useState<number>(value);

  useDebounce(
    () => {
      onValueChange?.(currentValue);
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

          {afterLabel}
        </Box>
      )}

      <InputNumber<number>
        min={min}
        max={max}
        className="shadow-none number-field-input"
        rootClassName="shadow-none"
        value={currentValue}
        formatter={(value) => {
          if (disablePlaceholderValue && disabled) {
            return disablePlaceholderValue;
          }

          if (falsyValuePlaceholder && (!value || String(value) === '0')) {
            return '';
          }

          return String(value || '');
        }}
        placeholder={
          (!currentValue || String(currentValue) === '0') &&
          falsyValuePlaceholder
            ? falsyValuePlaceholder
            : placeHolder
        }
        size={size}
        onChange={(value) => setCurrentValue(value || 0)}
        disabled={disabled}
        addonAfter={addonAfter}
        style={{
          height: '2.5rem',
          fontSize: '0.875rem',
          boxShadow: 'none',
        }}
        readOnly={readOnly}
        precision={userCompany?.preference.number_precision || 2}
      />

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default NumberField;
