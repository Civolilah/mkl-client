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

import { Box, Card, LanguagesSelector, NumberField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProfileProps } from '../../Profile';
import useHandleChange from '../hooks/useHandleChange';

const Preferences = ({ profile, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('preferences')} className="w-full">
      <Box className="flex gap-x-4">
        <LanguagesSelector
          required
          value={profile?.language || ''}
          onChange={(value) => handleChange('language', value)}
        />

        <NumberField
          required
          label={t('number_precision')}
          value={profile?.number_precision || 2}
          onValueChange={(value) => handleChange('number_precision', value)}
        />
      </Box>
    </Card>
  );
};

export default Preferences;
