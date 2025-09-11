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
  required?: boolean;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  withoutOptionalText?: boolean;
  disabled?: boolean;
  onClear?: () => void;
  errorMessage?: string;
}

const CustomFieldTypesSelector = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  withoutOptionalText,
  disabled,
  onClear,
  errorMessage,
}: Props) => {
  const t = useTranslation();

  const customFieldTypes = useMemo(() => {
    return [
      { label: t('single_line_text'), value: 'text' },
      { label: t('multi_line_text'), value: 'textarea' },
      { label: t('date_field'), value: 'date' },
      { label: t('dropdown_select'), value: 'select' },
      { label: t('toggle_switch'), value: 'toggle' },
    ];
  }, []);

  return (
    <SelectStaticField
      mode="single"
      required={required}
      label={label}
      options={customFieldTypes}
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

export default CustomFieldTypesSelector;
