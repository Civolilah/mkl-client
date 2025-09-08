/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMemo } from 'react';

import moment from 'moment-timezone';

import { SelectStaticField } from '@components/index';

interface Props {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onClear?: () => void;
  withoutOptionalText?: boolean;
  disabled?: boolean;
}

const TimezonesSelector = ({
  value,
  onChange,
  errorMessage,
  label,
  required,
  placeholder,
  onClear,
  withoutOptionalText,
  disabled,
}: Props) => {
  const timezones = useMemo(() => {
    const timezoneNames = moment.tz.names();

    return timezoneNames
      .map((timezone) => ({
        label: timezone,
        value: timezone,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <SelectStaticField
      mode="single"
      required={required}
      label={label}
      options={timezones}
      value={value ? [value] : []}
      onChange={(value) => onChange(value as string)}
      errorMessage={errorMessage}
      placeholder={placeholder}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
      disabled={disabled}
    />
  );
};

export default TimezonesSelector;
