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

import { Box, Dropdown, Icon, Text } from '@components/index';

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
        <Box
          className="flex items-center space-x-4"
          onClick={() => switchLanguage('en')}
        >
          {icon.en}

          <Text>English</Text>
        </Box>
      ),
      key: 'en',
      disabled: i18n.language === 'en',
      style: { paddingLeft: 7 },
    },
    {
      label: (
        <Box
          className="flex items-center space-x-4"
          onClick={() => switchLanguage('tr')}
        >
          {icon.tr}

          <Text style={{ letterSpacing: 0.8 }}>Türkçe</Text>
        </Box>
      ),
      key: 'tr',
      disabled: i18n.language === 'tr',
      style: { paddingLeft: 7 },
    },
  ];

  return (
    <Dropdown menu={{ items: languages }}>
      <Box
        className="flex items-center justify-between space-x-3 border px-2 py-1 cursor-pointer whitespace-nowrap w-full"
        style={{ backgroundColor: colors.$2, borderColor: colors.$1 }}
      >
        <Box className="flex items-center space-x-3">
          {icon[i18n.language as Languages]}

          <Text className="text-sm font-medium">
            {LANGUAGE_ALIASES[i18n.language as Languages]}
          </Text>
        </Box>

        <Icon name="arrowDown" size={25} style={{ color: colors.$10 }} />
      </Box>
    </Dropdown>
  );
};

export default LanguageSwitcher;
