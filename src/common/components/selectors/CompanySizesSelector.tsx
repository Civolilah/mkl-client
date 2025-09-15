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

const CompanySizesSelector = ({
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

  const companySizeOptions = useMemo(() => {
    return [
      { value: '1', label: t('1') },
      { value: '2-5', label: t('2_5') },
      { value: '6-25', label: t('6_25') },
      { value: '26-100', label: t('26_100') },
      { value: '101-300', label: t('101_300') },
      { value: '301+', label: t('301+') },
    ];
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      required={required}
      mode="single"
      options={companySizeOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
      disabled={disabled}
    />
  );
};

export default CompanySizesSelector;
