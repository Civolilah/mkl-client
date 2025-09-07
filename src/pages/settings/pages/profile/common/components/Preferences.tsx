/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import {
  Box,
  Button,
  Card,
  DateFormatsSelector,
  LabelElement,
  LanguagesSelector,
  NumberField,
  TimezonesSelector,
  Toggle,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProfileProps } from '../../Profile';
import useHandleChange from '../hooks/useHandleChange';

const Preferences = ({
  profile,
  errors,
  setProfile,
  isLoading,
}: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('preferences')} className="w-full" isLoading={isLoading}>
      <Box className="flex flex-col gap-y-4">
        <Box className="flex gap-x-4">
          <LanguagesSelector
            value={profile?.language || ''}
            onChange={(value) => handleChange('language', value)}
            errorMessage={errors.language && t(errors.language)}
            withoutOptionalText
          />

          <DateFormatsSelector
            label={t('date_format')}
            value={profile?.date_format || ''}
            onValueChange={(value) => handleChange('date_format', value)}
            errorMessage={errors.date_format && t(errors.date_format)}
            withoutOptionalText
          />
        </Box>

        <Box className="flex gap-x-4">
          <TimezonesSelector
            label={t('timezone')}
            placeholder={t('select_timezone')}
            value={profile?.time_zone || ''}
            onChange={(value) => handleChange('time_zone', value)}
            errorMessage={errors.time_zone && t(errors.time_zone)}
            withoutOptionalText
          />

          <NumberField
            label={t('number_precision')}
            value={profile?.number_precision || 2}
            onValueChange={(value) =>
              handleChange('number_precision', value || 2)
            }
            errorMessage={errors.number_precision && t(errors.number_precision)}
            withoutOptionalText
            precision={0}
          />
        </Box>

        <LabelElement
          label={t('military_time')}
          helpLabel={t('military_time_help')}
          withoutOptionalText
          twoGridColumns
        >
          <Toggle
            checked={profile?.is_military_time || false}
            onChange={(value) => handleChange('is_military_time', value)}
          />
        </LabelElement>

        <LabelElement
          label={t('comma_decimal')}
          helpLabel={t('comma_decimal_help')}
          withoutOptionalText
          twoGridColumns
        >
          <Toggle
            checked={profile?.comma_as_decimal_separator || false}
            onChange={(value) =>
              handleChange('comma_as_decimal_separator', value)
            }
          />
        </LabelElement>

        <LabelElement
          label={t('enable_security_password')}
          helpLabel={t('enable_security_password_help')}
          withoutOptionalText
          twoGridColumns
        >
          {profile?.has_security_password ? (
            <Toggle
              checked={profile?.enabled_security_password || false}
              onChange={(value) =>
                handleChange('enabled_security_password', value)
              }
            />
          ) : (
            <Button
              onClick={() => {
                const setSecurityPasswordButton = document.getElementById(
                  'set-security-password-button'
                );

                if (setSecurityPasswordButton) {
                  setSecurityPasswordButton.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }
              }}
            >
              {t('set_security_password')}
            </Button>
          )}
        </LabelElement>
      </Box>
    </Card>
  );
};

export default Preferences;
