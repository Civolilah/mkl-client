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
  id?: string;
  maxLength?: number;
  size?: 'large' | 'middle' | 'small';
  type?: 'text' | 'password' | 'email' | 'textarea' | 'tel';
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

const TextField = ({
  id,
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
}: Props) => {
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
          <Box className="flex items-center">
            <Label className="relative">
              {label}

              {required && (
                <span className="text-red-500 absolute -top-0.5 -right-[0.45rem]">
                  *
                </span>
              )}
            </Label>
          </Box>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      {type !== 'password' && type !== 'textarea' && (
        <Input
          className="rounded-lg text-sm-plus text-field-input"
          id={id}
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
          size={size}
          style={{
            height: '2.5rem',
            boxShadow: 'none',
          }}
          autoComplete={autoComplete}
          readOnly={readOnly}
          onClick={onClick}
          addonAfter={addonAfter}
        />
      )}

      {type === 'password' && (
        <Input.Password
          className="rounded-lg text-sm-plus text-field-input"
          id={id}
          type={type}
          value={currentValue}
          placeholder={placeHolder}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={(event) =>
            changeOnBlur && onValueChange?.(event.target.value)
          }
          maxLength={maxLength}
          disabled={disabled}
          size={size}
          onKeyDown={(event) => {
            event.stopPropagation();

            if (event.key === 'Enter') {
              onPressEnter?.(event);
            }
          }}
          style={{
            height: '2.5rem',
            boxShadow: 'none',
          }}
          readOnly={readOnly}
          onClick={onClick}
          addonAfter={addonAfter}
        />
      )}

      {type === 'textarea' && (
        <TextArea
          id={id}
          rows={4}
          className="rounded-lg text-sm-plus text-field-input"
          value={currentValue}
          placeholder={placeHolder}
          onChange={(event) => setCurrentValue(event.target.value)}
          onBlur={(event) =>
            changeOnBlur && onValueChange?.(event.target.value)
          }
          maxLength={maxLength}
          disabled={disabled}
          size={size}
          style={{
            fontSize: '0.875rem',
            boxShadow: 'none',
          }}
          readOnly={readOnly}
          onClick={onClick}
        />
      )}

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default TextField;
