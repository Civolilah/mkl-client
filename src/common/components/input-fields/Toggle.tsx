/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties } from 'react';

import { Switch } from 'antd';

type Props = {
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
};

const Toggle = ({ checked, onChange, disabled, size = 'medium' }: Props) => {
  const getMediumStyles = (): CSSProperties => ({
    width: '2.5rem',
    height: '1.215rem',
    minWidth: '2.5rem',
  });

  if (size === 'medium') {
    return (
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        style={getMediumStyles()}
        className="custom-medium-switch"
      />
    );
  }

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      size={size === 'large' ? 'default' : 'small'}
    />
  );
};

export default Toggle;
