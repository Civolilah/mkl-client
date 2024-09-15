/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ChangeEvent, KeyboardEvent } from 'react';

import { Input } from 'antd';

import { Icon, Text } from '@components/index';

type Props = {
  size?: 'large' | 'small';
  type?: 'text' | 'password' | 'email';
  label?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  onEventChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
  onPressEnter?: (event: KeyboardEvent<HTMLInputElement> | undefined) => void;
};

const TextField = (props: Props) => {
  const {
    value,
    onValueChange,
    onEventChange,
    label,
    type = 'text',
    size = 'large',
    placeHolder,
    errorMessage,
    onPressEnter,
    required = false,
    disabled = false,
  } = props;

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <Text style={{ fontSize: '15px' }}>
          {label} {required && <span className="text-red-600">*</span>}
        </Text>
      )}

      {type !== 'password' && (
        <Input
          className="rounded-none"
          type={type}
          size={size}
          value={value}
          onChange={(event) => {
            onEventChange?.(event);
            onValueChange?.(event.target.value);
          }}
          placeholder={placeHolder}
          onPressEnter={onPressEnter}
          disabled={disabled}
          style={{ boxShadow: 'none', borderRadius: '4px' }}
        />
      )}

      {type === 'password' && (
        <Input.Password
          className="rounded-none"
          type={type}
          size={size}
          value={value}
          placeholder={placeHolder}
          onChange={(event) => {
            onEventChange?.(event);
            onValueChange?.(event.target.value);
          }}
          disabled={disabled}
          onPressEnter={onPressEnter}
          style={{ boxShadow: 'none', borderRadius: '4px' }}
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
