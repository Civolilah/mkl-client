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
import { TR, US } from 'country-flag-icons/react/3x2';

import { Languages } from 'src/config';
import { usePathname, useRouter } from 'src/navigation';

import { Dropdown, Icon } from '@components/index';

const LANGUAGE_ALIASES = {
  en: 'English (English)',
  tr: 'Türkçe (Turkish)',
};

const LanguageSwitcher = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const switchLanguage = (language: string) => {
    router.replace({ pathname }, { locale: language as Languages });

    router.refresh();
  };

  const languages: MenuProps['items'] = [
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => switchLanguage('en')}
        >
          <US title="United States" className="w-6 h-6" />

          <span>English (English)</span>
        </div>
      ),
      key: 'en',
      disabled: params.locale === 'en',
    },
    {
      label: (
        <div
          className="flex items-center space-x-2"
          onClick={() => switchLanguage('tr')}
        >
          <TR title="Turkey" className="w-6 h-6" />

          <span>Türkçe (Turkish)</span>
        </div>
      ),
      key: 'tr',
      disabled: params.locale === 'tr',
    },
  ];

  return (
    <Dropdown menu={{ items: languages }}>
      <div className="flex items-center space-x-1 bg-white border border-gray-300 rounded-md px-2 py-1 cursor-pointer hover:border-gray-400">
        <Icon name="world" size={20} className="text-gray-600" />

        <span className="text-sm font-medium text-gray-700">
          {LANGUAGE_ALIASES[params.locale as Languages]}
        </span>

        <Icon name="arrowDown" size={20} className="text-gray-600" />
      </div>
    </Dropdown>
  );
};

export default LanguageSwitcher;
