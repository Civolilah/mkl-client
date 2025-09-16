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

import { ConfigProvider, DatePicker } from 'antd';
import deDE from 'antd/locale/de_DE';
import enUS from 'antd/locale/en_US';
import esES from 'antd/locale/es_ES';
import frFR from 'antd/locale/fr_FR';
import hiIN from 'antd/locale/hi_IN';
import hrHR from 'antd/locale/hr_HR';
import itIT from 'antd/locale/it_IT';
import ptBR from 'antd/locale/pt_BR';
import srRS from 'antd/locale/sr_RS';
import trTR from 'antd/locale/tr_TR';
import zhCN from 'antd/locale/zh_CN';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { profileSettingsAtom } from 'src/App';

import {
  Box,
  Label,
  RequiredOptionalLabel,
  ErrorMessageElement,
} from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  id?: string;
  className?: string;
  maxLength?: number;
  size?: 'large' | 'middle' | 'small';
  label?: string;
  value: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  errorMessage?: string;
  autoComplete?: 'email';
  readOnly?: boolean;
  onClick?: () => void;
  withoutOptionalText?: boolean;
}

const DateField = ({
  className,
  id,
  label,
  value,
  onValueChange,
  errorMessage,
  required,
  withoutOptionalText,
  disabled,
  size = 'large',
  onClick,
  placeholder,
}: Props) => {
  const t = useTranslation();

  const profile = useAtomValue(profileSettingsAtom);

  const currentFormat = useMemo(() => {
    return profile?.date_format || 'DD/MM/YYYY';
  }, [profile]);

  const locale = useMemo(() => {
    const userLanguage = profile?.language || 'en';

    switch (userLanguage) {
      case 'en':
        return enUS;
      case 'de':
        return deDE;
      case 'fr':
        return frFR;
      case 'it':
        return itIT;
      case 'es':
        return esES;
      case 'pt':
        return ptBR;
      case 'tr':
        return trTR;
      case 'zh':
        return zhCN;
      case 'hi':
        return hiIN;
      case 'bs':
      case 'hr':
        return hrHR;
      case 'sr':
        return srRS;
      default:
        return enUS;
    }
  }, [profile?.language]);

  return (
    <Box className="flex flex-col space-y-1 w-full">
      {label && (
        <Box className="flex items-center space-x-1">
          <Box className="flex items-center">
            <Label className="relative">
              {label}

              {required && (
                <span className="text-red-500 absolute -top-0.5 -right-[0.45rem]">
                  *
                </span>
              )}
            </Label>
          </Box>

          <RequiredOptionalLabel
            required={Boolean(required)}
            withoutOptionalText={withoutOptionalText}
          />
        </Box>
      )}

      <ConfigProvider locale={locale}>
        <DatePicker
          className={classNames(
            'rounded text-sm-plus text-field-input',
            className
          )}
          id={id}
          value={value ? dayjs(value, 'DD/MM/YYYY') : undefined}
          onChange={(date) => {
            if (date) {
              onValueChange?.(date.format('DD/MM/YYYY'));
            } else {
              onValueChange?.('');
            }
          }}
          placeholder={placeholder || t('select_date')}
          disabled={disabled}
          size={size}
          style={{
            height: '2.5rem',
            boxShadow: 'none',
            fontSize: '0.875rem',
          }}
          onClick={onClick}
          format={currentFormat}
        />
      </ConfigProvider>

      <ErrorMessageElement errorMessage={errorMessage} />
    </Box>
  );
};

export default DateField;
