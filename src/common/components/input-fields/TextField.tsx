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

import Icon from '@components/general/Icon';

type Props = {
  size?: 'large' | 'small';
  type?: 'text' | 'password' | 'email';
  label?: string;
  value: string;
  required?: boolean;
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
  } = props;

  return (
    <div className="flex flex-col space-y-2 w-full">
      {label && (
        <span style={{ fontSize: '15px' }}>
          {label} {required && <span className="text-red-600">*</span>}
        </span>
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
          onPressEnter={onPressEnter}
          style={{ boxShadow: 'none', borderRadius: '4px' }}
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
