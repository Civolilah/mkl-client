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
import bs from 'i18n-iso-countries/langs/bs.json';
import de from 'i18n-iso-countries/langs/de.json';
import en from 'i18n-iso-countries/langs/en.json';
import es from 'i18n-iso-countries/langs/es.json';
import fr from 'i18n-iso-countries/langs/fr.json';
import hi from 'i18n-iso-countries/langs/hi.json';
import hr from 'i18n-iso-countries/langs/hr.json';
import it from 'i18n-iso-countries/langs/it.json';
import pt from 'i18n-iso-countries/langs/pt.json';
import sr from 'i18n-iso-countries/langs/sr.json';
import tr from 'i18n-iso-countries/langs/tr.json';
import zh from 'i18n-iso-countries/langs/zh.json';
import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { SelectStaticField } from '@components/index';

countries.registerLocale(en);
countries.registerLocale(bs);
countries.registerLocale(de);
countries.registerLocale(fr);
countries.registerLocale(it);
countries.registerLocale(es);
countries.registerLocale(pt);
countries.registerLocale(tr);
countries.registerLocale(zh);
countries.registerLocale(hi);
countries.registerLocale(hr);
countries.registerLocale(sr);

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
        label: name,
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
