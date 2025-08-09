/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState, useEffect } from 'react';

import cc from 'currency-codes';

import { SelectStaticField } from '@components/index';
import { Option } from '@components/input-fields/SelectDataField';

import { useTranslation } from '@hooks/index';

type Props = {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
};

const CurrenciesSelector = ({
  value,
  onChange,
  errorMessage,
  label,
  required,
  placeholder,
}: Props) => {
  const t = useTranslation();

  const [currencies, setCurrencies] = useState<Option[]>([]);

  useEffect(() => {
    const currencyOptions: Option[] = cc.data
      .map((currency) => ({
        label: `${currency.currency} (${currency.code})`,
        value: String(Number(currency.number)),
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    setCurrencies(currencyOptions);
  }, []);

  return (
    <SelectStaticField
      mode="single"
      required={required}
      label={label || t('currency')}
      options={currencies}
      value={value ? [value] : []}
      onChange={(value) => onChange(value as string)}
      errorMessage={errorMessage}
      placeholder={placeholder}
    />
  );
};

export default CurrenciesSelector;
