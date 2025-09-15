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

const CompanyClassificationsSelector = ({
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

  const classificationOptions = useMemo(() => {
    return [
      { value: 'individual', label: t('individual') },
      { value: 'business', label: t('business') },
      { value: 'company', label: t('company') },
      { value: 'partnership', label: t('partnership') },
      { value: 'trust', label: t('trust') },
      { value: 'charity', label: t('charity') },
      { value: 'government', label: t('government') },
      { value: 'other', label: t('other') },
    ];
  }, []);

  return (
    <SelectStaticField
      label={label}
      placeholder={placeHolder}
      required={required}
      mode="single"
      options={classificationOptions}
      value={value ? [value] : []}
      onChange={(value) => onValueChange(value as string)}
      errorMessage={errorMessage}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
      disabled={disabled}
    />
  );
};

export default CompanyClassificationsSelector;
