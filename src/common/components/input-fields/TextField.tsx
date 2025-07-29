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

import { Input } from 'antd';
import { useDebounce } from 'react-use';

import {
  Box,
  ErrorMessageElement,
  Label,
  RequiredOptionalLabel,
} from '@components/index';

const { TextArea } = Input;

type Props = {
  maxLength?: number;
  size?: 'large' | 'middle' | 'small' | 'semi-large';
  type?: 'text' | 'password' | 'email' | 'textarea';
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
  readOnly?: boolean;
  onClick?: () => void;
  addonAfter?: ReactNode;
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
    size = 'large',
    debounce,
    withoutOptionalText,
    autoComplete,
    changeOnBlur = false,
    readOnly = false,
    onClick,
    addonAfter,
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

  const getInputStyle = (fieldType?: 'textarea') => {
    if (fieldType === 'textarea') {
      return { boxShadow: 'none' };
    }

    if (size === 'large') {
      return { boxShadow: 'none' };
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

      {type !== 'password' && type !== 'textarea' && (
        <Input
          className="rounded-none text-base"
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
          readOnly={readOnly}
          onClick={onClick}
          addonAfter={addonAfter}
        />
      )}

      {type === 'password' && (
        <Input.Password
          className="rounded-none text-sm"
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
          readOnly={readOnly}
          onClick={onClick}
          addonAfter={addonAfter}
        />
      )}

      {type === 'textarea' && (
        <TextArea
          rows={4}
          className="rounded-none"
          value={currentValue}
          placeholder={placeHolder}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={(event) =>
            changeOnBlur && onValueChange?.(event.target.value)
          }
          maxLength={maxLength}
          disabled={disabled}
          size={size === 'semi-large' ? 'middle' : size}
          style={getInputStyle('textarea')}
          readOnly={readOnly}
          onClick={onClick}
        />
      )}

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default TextField;
