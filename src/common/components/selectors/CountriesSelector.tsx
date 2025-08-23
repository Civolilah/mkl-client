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

import { countries } from 'countries-list';

import { SelectStaticField } from '@components/index';

interface Props {
  label?: string;
  placeHolder?: string;
  value: string | undefined;
  onClear: () => void;
  onValueChange: (value: string) => void;
  errorMessage?: string;
}

const CountriesSelector = ({
  label,
  placeHolder,
  value,
  onClear,
  onValueChange,
  errorMessage,
}: Props) => {
  const countryOptions = useMemo(() => {
    return Object.entries(countries)
      .map(([code, country]) => ({
        value: code,
        label: country.native,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      mode="single"
      options={countryOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
    />
  );
};

export default CountriesSelector;
