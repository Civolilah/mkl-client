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

import { SelectStaticField } from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  label?: string;
  placeHolder?: string;
  value: string | undefined;
  onClear?: () => void;
  onValueChange: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  withoutOptionalText?: boolean;
  disabled?: boolean;
}

const NumberTaxRatesSelector = ({
  label,
  placeHolder,
  value,
  onClear,
  onValueChange,
  errorMessage,
  required,
  withoutOptionalText,
  disabled,
}: Props) => {
  const t = useTranslation();

  const numberTaxRatesOptions = useMemo(() => {
    return [
      { value: '0', label: t('no_tax') },
      { value: '1', label: t('one_tax_rate') },
      { value: '2', label: t('two_tax_rates') },
      { value: '3', label: t('three_tax_rates') },
    ];
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      required={required}
      mode="single"
      options={numberTaxRatesOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
      disabled={disabled}
    />
  );
};

export default NumberTaxRatesSelector;
