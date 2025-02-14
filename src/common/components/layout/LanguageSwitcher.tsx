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
import { TR, GB, BA } from 'country-flag-icons/react/3x2';
import { useTranslation } from 'react-i18next';

import { Box, Dropdown, Icon, Text } from '@components/index';

import { useColors, useSwitchLanguage } from '@hooks/index';

export const LANGUAGE_ALIASES = {
  en: 'English',
  tr: 'Türkçe',
  bs: 'Bosanski',
};

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
};

export const AVAILABLE_LANGUAGES = ['en', 'tr', 'bs'] as const;
export type Languages = (typeof AVAILABLE_LANGUAGES)[number];

const LanguageSwitcher = () => {
  const colors = useColors();
  const { i18n } = useTranslation();

  const switchLanguage = useSwitchLanguage();

  const icon = {
    en: <GB title="Great Britain" className="w-5 h-5" />,
    tr: <TR title="Turkey" className="w-5 h-5" />,
    bs: <BA title="Bosnia and Herzegovina" className="w-5 h-5" />,
  };

  const languages: MenuProps['items'] = [
    {
      label: (
        <Box
          className="flex items-center space-x-4 py-1 px-2"
          onClick={() => switchLanguage('en')}
        >
          {icon.en}

          <Text className="text-xs-plus">English</Text>
        </Box>
      ),
      key: 'en',
      disabled: i18n.language === 'en',
      style: { paddingLeft: 7 },
    },
    {
      label: (
        <Box
          className="flex items-center space-x-4 py-1 px-2"
          onClick={() => switchLanguage('tr')}
        >
          {icon.tr}

          <Text className="text-xs-plus">Türkçe</Text>
        </Box>
      ),
      key: 'tr',
      disabled: i18n.language === 'tr',
      style: { paddingLeft: 7 },
    },
    {
      label: (
        <Box
          className="flex items-center space-x-4 py-1 px-2"
          onClick={() => switchLanguage('bs')}
        >
          {icon.bs}

          <Text className="text-xs-plus">Bosanski</Text>
        </Box>
      ),
      key: 'bs',
      disabled: i18n.language === 'bs',
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

          <Text className="text-xs-plus font-medium">
            {LANGUAGE_ALIASES[i18n.language as Languages]}
          </Text>
        </Box>

        <Icon name="arrowDown" size="1.25rem" style={{ color: colors.$10 }} />
      </Box>
    </Dropdown>
  );
};

export default LanguageSwitcher;
