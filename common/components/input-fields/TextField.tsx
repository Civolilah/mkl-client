/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Input } from 'antd';
import { ChangeEvent } from 'react';
import { IoInformationCircle } from 'react-icons/io5';

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
          type={type}
          value={value}
          onChange={(event) => {
            onEventChange?.(event);
            onValueChange?.(event.target.value);
          }}
          placeholder={placeHolder}
          size={size}
          style={{
            borderRadius: 0,
            boxShadow: 'none',
          }}
        />
      )}

      {type === 'password' && (
        <Input.Password
          type={type}
          value={value}
          placeholder={placeHolder}
          onChange={(event) => {
            onEventChange?.(event);
            onValueChange?.(event.target.value);
          }}
          size={size}
          style={{
            borderRadius: 0,
            boxShadow: 'none',
          }}
        />
      )}

      {errorMessage && (
        <div className="mt-1 text-sm text-red-600 flex items-center space-x-1">
          <div>
            <Icon element={IoInformationCircle} size={17} color="#dc2626" />
          </div>

          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default TextField;
