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
  background-color: ${({ theme }) => theme.backgroundColor};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

export const LANGUAGE_BY_TIMEZONE = {
  'Europe/Sarajevo': 'bs',
  'Europe/Belgrade': 'sr',
  'Europe/Zagreb': 'hr',
  'Europe/Ljubljana': 'sl',
  'Europe/Skopje': 'mk',
  'Europe/Paris': 'fr',
  'Europe/London': 'en',
  'Europe/Dublin': 'ga',
  'Europe/Berlin': 'de',
  'Europe/Rome': 'it',
  'Europe/Madrid': 'es',
  'Europe/Lisbon': 'pt',
  'Europe/Amsterdam': 'nl',
  'Europe/Brussels': 'nl',
  'Europe/Copenhagen': 'da',
  'Europe/Oslo': 'no',
  'Europe/Stockholm': 'sv',
  'Europe/Helsinki': 'fi',
  'Europe/Tallinn': 'et',
  'Europe/Riga': 'lv',
  'Europe/Vilnius': 'lt',
  'Europe/Warsaw': 'pl',
  'Europe/Prague': 'cs',
  'Europe/Bratislava': 'sk',
  'Europe/Budapest': 'hu',
  'Europe/Bucharest': 'ro',
  'Europe/Sofia': 'bg',
  'Europe/Athens': 'el',
  'Europe/Istanbul': 'tr',
  'Europe/Moscow': 'ru',
  'Europe/Kiev': 'uk',
  'Europe/Minsk': 'be',
  'Europe/Chisinau': 'ro',
  'Europe/Andorra': 'ca',
  'Europe/Monaco': 'fr',
  'Europe/Luxembourg': 'lb',
  'Europe/Malta': 'mt',
  'Europe/Reykjavik': 'is',
  'Europe/Vatican': 'it',
  'America/New_York': 'en',
  'America/Detroit': 'en',
  'America/Kentucky/Louisville': 'en',
  'America/Indiana/Indianapolis': 'en',
  'America/Indianapolis': 'en',
  'America/Chicago': 'en',
  'America/Denver': 'en',
  'America/Phoenix': 'en',
  'America/Los_Angeles': 'en',
  'America/Anchorage': 'en',
  'America/Juneau': 'en',
  'America/Sitka': 'en',
  'America/Metlakatla': 'en',
  'America/Nome': 'en',
  'America/Adak': 'en',
  'America/St_Johns': 'en',
  'America/Halifax': 'en',
  'America/Glace_Bay': 'en',
  'America/Moncton': 'en',
  'America/Goose_Bay': 'en',
  'America/Toronto': 'en',
  'America/Iqaluit': 'en',
  'America/Montreal': 'en',
  'America/Nipigon': 'en',
  'America/Thunder_Bay': 'en',
  'America/Winnipeg': 'en',
  'America/Rainy_River': 'en',
  'America/Resolute': 'en',
  'America/Rankin_Inlet': 'en',
  'America/Regina': 'en',
  'America/Swift_Current': 'en',
  'America/Edmonton': 'en',
  'America/Cambridge_Bay': 'en',
  'America/Yellowknife': 'en',
  'America/Inuvik': 'en',
  'America/Dawson_Creek': 'en',
  'America/Fort_Nelson': 'en',
  'America/Whitehorse': 'en',
  'America/Dawson': 'en',
  'America/Vancouver': 'en',
  'Asia/Shanghai': 'zh',
  'Asia/Kolkata': 'hi',
};

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
                'flex items-center justify-center py-2 px-4 cursor-pointer',
                {
                  'cursor-not-allowed': i18n.language === lang,
                }
              )}
              onClick={() =>
                i18n.language !== lang && handleLanguageChange(lang)
              }
              theme={{
                backgroundColor:
                  i18n.language === lang ? colors.$1 : 'transparent',
                hoverBackgroundColor:
                  i18n.language === lang ? colors.$5 : colors.$1,
              }}
            >
              <Text
                className="text-sm font-medium"
                style={{
                  color: i18n.language === lang ? colors.$2 : colors.$12,
                }}
              >
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
