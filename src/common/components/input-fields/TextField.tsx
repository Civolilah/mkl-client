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
import { useMediaQuery } from 'react-responsive';
import { useDebounce } from 'react-use';

import { Icon, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

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
};

const TextField = (props: Props) => {
  const t = useTranslation();

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
  } = props;

  const [currentValue, setCurrentValue] = useState<string>(value);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

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
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <div className="flex items-center space-x-1">
          <Text
            style={{
              fontSize: isSmallScreen ? '14px' : '15px',
              fontWeight: 500,
            }}
          >
            {label}
          </Text>

          {required ? (
            <span className="self-start text-red-600">*</span>
          ) : (
            <>
              {Boolean(!withoutOptionalText) && (
                <span style={{ fontSize: isSmallScreen ? '11.5px' : '12.5px' }}>
                  ({t('optional')})
                </span>
              )}
            </>
          )}
        </div>
      )}

      {type !== 'password' && (
        <Input
          className="rounded-none"
          type={type}
          size={size}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
          maxLength={maxLength}
          placeholder={placeHolder}
          onPressEnter={onPressEnter}
          disabled={disabled}
          style={{ boxShadow: 'none' }}
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
          maxLength={maxLength}
          disabled={disabled}
          onPressEnter={onPressEnter}
          style={{ boxShadow: 'none' }}
        />
      )}

      {errorMessage && (
        <div className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <div className="mt-0.5">
            <Icon name="error" size={19} style={{ color: '#dc2626' }} />
          </div>

          <Text className="break-words">{errorMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default TextField;
