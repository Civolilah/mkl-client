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
}

const LANGUAGES_NAMES = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  es: 'Español',
  pt: 'Português',
  tr: 'Türkçe',
  zh: '中文',
  hi: 'हिन्दी',
  bs: 'Bosanski',
  hr: 'Hrvatski',
  sr: 'Srpski',
};

const LanguagesSelector = ({
  value,
  onChange,
  errorMessage,
  label,
  required,
  placeholder,
  onClear,
}: Props) => {
  const t = useTranslation();

  const [languages, setLanguages] = useState<Option[]>([]);

  useEffect(() => {
    const languageOptions: Option[] = AVAILABLE_LANGUAGES.map((language) => ({
      label: LANGUAGES_NAMES[language],
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
    />
  );
};

export default LanguagesSelector;
