/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Box, Icon, Popover, Text } from '@components/index';

import { useColors, useSwitchLanguage } from '@hooks/index';

const Div = styled.div`
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};

  &:hover {
    color: ${({ theme }) => theme.hoverColor};
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

export const AVAILABLE_LANGUAGES = [
  'en',
  'de',
  'fr',
  'it',
  'es',
  'pt',
  'tr',
  'zh',
  'hi',
  'bs',
  'hr',
  'sr',
] as const;

export type Languages = (typeof AVAILABLE_LANGUAGES)[number];

const LANGUAGE_CODES = {
  en: 'EN',
  bs: 'BS',
  hr: 'HR',
  sr: 'SR',
  fr: 'FR',
  de: 'DE',
  it: 'IT',
  es: 'ES',
  pt: 'PT',
  zh: '中文',
  hi: 'हि',
  tr: 'TR',
} as const;

const LanguageSwitcher = () => {
  const colors = useColors();
  const { i18n } = useTranslation();

  const switchLanguage = useSwitchLanguage();

  const handleLanguageChange = (language: Languages) => {
    switchLanguage(language);
  };

  return (
    <Popover
      content={
        <Box className="p-1">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <Div
              key={lang}
              className={classNames(
                'flex items-center justify-center py-2 px-4',
                {
                  'cursor-pointer': i18n.language !== lang,
                }
              )}
              onClick={() =>
                i18n.language !== lang && handleLanguageChange(lang)
              }
              theme={{
                color: i18n.language === lang ? colors.$2 : colors.$12,
                hoverColor: colors.$2,
                backgroundColor:
                  i18n.language === lang ? colors.$1 : 'transparent',
                hoverBackgroundColor:
                  i18n.language === lang ? colors.$1 : colors.$17,
              }}
            >
              <Text className="text-sm font-medium">
                {LANGUAGE_CODES[lang]}
              </Text>
            </Div>
          ))}
        </Box>
      }
    >
      <Box className="flex items-center cursor-pointer">
        <Text className="text-sm font-normal" style={{ color: colors.$12 }}>
          {LANGUAGE_CODES[i18n.language as Languages]}
        </Text>

        <Box>
          <Icon name="arrowDown" size="1.25rem" style={{ color: colors.$12 }} />
        </Box>
      </Box>
    </Popover>
  );
};

export default LanguageSwitcher;
