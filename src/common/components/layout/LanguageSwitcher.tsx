/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { useParams } from 'next/navigation';

import { MenuProps } from 'antd';
import { TR, GB } from 'country-flag-icons/react/3x2';

import { Languages } from 'src/config';

import { Dropdown, Icon } from '@components/index';

import { useColors, useSwitchLanguage } from '@hooks/index';

const LANGUAGE_ALIASES = {
  en: 'English',
  tr: 'Türkçe',
};

const LanguageSwitcher = () => {
  const colors = useColors();
  const params = useParams();

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
      disabled: params.locale === 'en',
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
      disabled: params.locale === 'tr',
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
          {icon[params.locale as Languages]}

          <span className="text-sm font-medium text-gray-700">
            {LANGUAGE_ALIASES[params.locale as Languages]}
          </span>
        </div>

        <Icon name="arrowDown" size={25} className="text-gray-600" />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
