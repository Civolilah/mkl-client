/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { Switch } from 'antd';
import classNames from 'classnames';

import { Box, Label } from '@components/index';

interface Props {
  label?: string;
  checked: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  afterLabel?: ReactNode;
}

const Toggle = ({
  label,
  checked,
  onChange,
  disabled,
  size = 'medium',
  afterLabel,
}: Props) => {
  const getMediumStyles = (): CSSProperties => ({
    width: '2.5rem',
    height: '1.215rem',
    minWidth: '2.5rem',
  });

  if (size === 'medium') {
    return (
      <Box
        className={classNames('flex items-center', {
          'gap-x-10': label,
        })}
      >
        {Boolean(label) && (
          <Box className="flex items-center">
            <Label>{label}</Label>

            {afterLabel}
          </Box>
        )}

        <Switch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={getMediumStyles()}
          className="custom-medium-switch"
        />
      </Box>
    );
  }

  return (
    <Box
      className={classNames('flex items-center', {
        'gap-x-10': label,
      })}
    >
      {Boolean(label) && (
        <Box className="flex items-center">
          <Label>{label}</Label>

          {afterLabel}
        </Box>
      )}

      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        size={size === 'large' ? 'default' : 'small'}
      />
    </Box>
  );
};

export default Toggle;
