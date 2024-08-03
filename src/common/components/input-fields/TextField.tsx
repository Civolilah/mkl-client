/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { Input } from 'antd';
import { ChangeEvent } from 'react';

import Icon from '@components/general/Icon';

interface Props {
  size?: 'large' | 'small';
  type?: 'text' | 'password' | 'email';
  label?: string;
  value: string;
  placeHolder?: string;
  onEventChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
}

const TextField = (props?: Props) => {
  const {
    value,
    onValueChange,
    onEventChange,
    label,
    type = 'text',
    size = 'large',
    placeHolder,
    errorMessage,
  } = props || {};

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && <span>{label}</span>}

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
          style={{ boxShadow: 'none' }}
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
          style={{ boxShadow: 'none' }}
        />
      )}

      {errorMessage && (
        <div className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <div>
            <Icon name="information" size={17} style={{ color: '#dc2626' }} />
          </div>

          <span className="break-words">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
