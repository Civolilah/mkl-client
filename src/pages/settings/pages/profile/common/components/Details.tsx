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

import { Box, Card, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProfileProps } from '../../Profile';
import useHandleChange from '../hooks/useHandleChange';

const Details = ({ profile, errors, setProfile, isLoading }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('details')} className="w-full" isLoading={isLoading}>
      <Box className="flex flex-col gap-y-4">
        <Box className="flex gap-x-4">
          <TextField
            label={t('first_name')}
            placeHolder={t('first_name_placeholder')}
            value={profile?.first_name || ''}
            onValueChange={(value) => handleChange('first_name', value)}
            errorMessage={errors?.first_name && t(errors.first_name)}
          />

          <TextField
            label={t('last_name')}
            placeHolder={t('last_name_placeholder')}
            value={profile?.last_name || ''}
            onValueChange={(value) => handleChange('last_name', value)}
            errorMessage={errors?.last_name && t(errors.last_name)}
          />
        </Box>

        <Box className="flex gap-x-4">
          <TextField
            required
            type="email"
            label={t('email')}
            placeHolder={t('email_placeholder')}
            value={profile?.email || ''}
            onValueChange={(value) => handleChange('email', value)}
            errorMessage={errors?.email && t(errors.email)}
          />

          <TextField
            type="tel"
            label={t('phone')}
            placeHolder={t('phone_placeholder')}
            value={profile?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            errorMessage={errors?.phone && t(errors.phone)}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
