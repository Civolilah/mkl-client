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
  Card,
  DateFormatsSelector,
  LabelElement,
  LanguagesSelector,
  NumberField,
  Toggle,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProfileProps } from '../../Profile';
import useHandleChange from '../hooks/useHandleChange';

const Preferences = ({ profile, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('preferences')} className="w-full">
      <Box className="flex flex-col gap-y-4">
        <Box className="flex gap-x-4">
          <LanguagesSelector
            value={profile?.language || ''}
            onChange={(value) => handleChange('language', value)}
            errorMessage={errors.language && t(errors.language)}
          />

          <DateFormatsSelector
            label={t('date_format')}
            value={profile?.date_format || ''}
            onValueChange={(value) => handleChange('date_format', value)}
            errorMessage={errors.date_format && t(errors.date_format)}
          />
        </Box>

        <Box className="flex gap-x-4">
          <NumberField
            label={t('number_precision')}
            value={profile?.number_precision || 2}
            onValueChange={(value) => handleChange('number_precision', value)}
            errorMessage={errors.number_precision && t(errors.number_precision)}
          />
        </Box>

        <LabelElement
          label={t('military_time')}
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
          <Toggle
            checked={profile?.enable_security_password || false}
            onChange={(value) =>
              handleChange('enable_security_password', value)
            }
          />
        </LabelElement>
      </Box>
    </Card>
  );
};

export default Preferences;
