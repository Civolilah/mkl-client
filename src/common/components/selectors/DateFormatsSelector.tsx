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

import dayjs from 'dayjs';

import { SelectStaticField } from '@components/index';

interface Props {
  label?: string;
  placeHolder?: string;
  value: string | undefined;
  onClear?: () => void;
  onValueChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
}

const DateFormatsSelector = ({
  label,
  placeHolder,
  value,
  onClear,
  onValueChange,
  errorMessage,
  required,
}: Props) => {
  const dateFormatOptions = useMemo(() => {
    const today = dayjs();

    return [
      { value: 'DD/MMM/YYYY', label: today.format('DD/MMM/YYYY') },
      { value: 'DD-MMM-YYYY', label: today.format('DD-MMM-YYYY') },
      { value: 'DD/MMMM/YYYY', label: today.format('DD/MMMM/YYYY') },
      { value: 'DD-MMMM-YYYY', label: today.format('DD-MMMM-YYYY') },
      { value: 'MMM D, YYYY', label: today.format('MMM D, YYYY') },
      { value: 'MMMM D, YYYY', label: today.format('MMMM D, YYYY') },
      { value: 'ddd MMM D, YYYY', label: today.format('ddd MMM D, YYYY') },
      { value: 'YYYY-MM-DD', label: today.format('YYYY-MM-DD') },
      { value: 'DD-MM-YYYY', label: today.format('DD-MM-YYYY') },
      { value: 'MM/DD/YYYY', label: today.format('MM/DD/YYYY') },
      { value: 'DD.MM.YYYY', label: today.format('DD.MM.YYYY') },
      { value: 'DD. MMM. YYYY', label: today.format('DD. MMM. YYYY') },
      { value: 'DD. MMMM YYYY', label: today.format('DD. MMMM YYYY') },
      { value: 'DD/MM/YYYY', label: today.format('DD/MM/YYYY') },
    ];
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      required={required}
      mode="single"
      options={dateFormatOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
    />
  );
};

export default DateFormatsSelector;
