/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { MenuProps } from 'antd';
import { TR, GB } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon } from '@components/index';

import { useColors, useSwitchLanguage } from '@hooks/index';

const LANGUAGE_ALIASES = {
  en: 'English',
  tr: 'Türkçe',
};

export const AVAILABLE_LANGUAGES = ['en', 'tr'] as const;
export type Languages = (typeof AVAILABLE_LANGUAGES)[number];

const LanguageSwitcher = () => {
  const colors = useColors();
  const { i18n } = useTranslation();

  const switchLanguage = useSwitchLanguage();

  const icon = {
    en: <GB title="Great Britain" className="w-6 h-6" />,
    tr: <TR title="Turkey" className="w-6 h-6" />,
  };

  const languages: MenuProps['items'] = [
    {
      label: (
        <div
          className="flex items-center space-x-4"
          onClick={() => switchLanguage('en')}
        >
          {icon.en}

          <span>English</span>
        </div>
      ),
      key: 'en',
      disabled: i18n.language === 'en',
      style: { paddingLeft: 7 },
    },
    {
      label: (
        <div
          className="flex items-center space-x-4"
          onClick={() => switchLanguage('tr')}
        >
          {icon.tr}

          <span>Türkçe</span>
        </div>
      ),
      key: 'tr',
      disabled: i18n.language === 'tr',
      style: { paddingLeft: 7 },
    },
  ];

  return (
    <Dropdown menu={{ items: languages }}>
      <div
        className="flex items-center justify-between space-x-3 border px-2 py-1 cursor-pointer whitespace-nowrap rounded select-none"
        style={{ borderColor: colors.$1 }}
      >
        <div className="flex items-center space-x-3">
          {icon[i18n.language as Languages]}

          <span className="text-sm font-medium text-gray-700">
            {LANGUAGE_ALIASES[i18n.language as Languages]}
          </span>
        </div>

        <Icon name="arrowDown" size={25} className="text-gray-600" />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
