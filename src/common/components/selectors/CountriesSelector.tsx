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

import countries from 'i18n-iso-countries';
import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';
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
  const userCompany = useAtomValue(userCompanyAtom);

  const countryOptions = useMemo(() => {
    const countryNames = countries.getNames(
      userCompany?.preference.language || 'en',
      { select: 'official' }
    );

    return Object.entries(countryNames)
      .map(([code, name]) => ({
        value: code,
        label: `${name} (${countries.getAlpha3Code(name, userCompany?.preference.language || 'en')})`,
      }))
      .sort((a, b) =>
        a.label.localeCompare(b.label, userCompany?.preference.language || 'en')
      );
  }, [userCompany]);

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
