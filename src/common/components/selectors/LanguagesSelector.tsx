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

import { SelectStaticField } from '@components/index';
import { Option } from '@components/input-fields/SelectDataField';
import { AVAILABLE_LANGUAGES } from '@components/layout/LanguageSwitcher';

import { useTranslation } from '@hooks/index';

interface Props {
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  onClear?: () => void;
  withoutOptionalText?: boolean;
}

const LanguagesSelector = ({
  value,
  onChange,
  errorMessage,
  label,
  required,
  placeholder,
  onClear,
  withoutOptionalText,
}: Props) => {
  const t = useTranslation();

  const [languages, setLanguages] = useState<Option[]>([]);

  const getLanguageName = (languageCode: string) => {
    const currentLocale = localStorage.getItem('MKL-LOCALE') || 'en';

    const displayNames = new Intl.DisplayNames([currentLocale], {
      type: 'language',
    });

    return displayNames.of(languageCode);
  };

  useEffect(() => {
    const languageOptions: Option[] = AVAILABLE_LANGUAGES.map((language) => ({
      label: getLanguageName(language) || '',
      value: language,
    }));

    setLanguages(languageOptions);
  }, []);

  return (
    <SelectStaticField
      mode="single"
      required={required}
      label={label || t('language')}
      options={languages}
      value={value ? [value] : []}
      onChange={(value) => onChange(value as string)}
      errorMessage={errorMessage}
      placeholder={placeholder}
      onClear={onClear}
      withoutOptionalText={withoutOptionalText}
    />
  );
};

export default LanguagesSelector;
