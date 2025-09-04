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

import { Box, Card, LabelElement, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { ProfileProps } from '../hooks/useTabs';

const Details = ({ profile, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('details')} className="w-full">
      <Box className="flex flex-col">
        <LabelElement label={t('first_name')} required>
          <TextField
            placeHolder={t('first_name_placeholder')}
            value={profile?.first_name || ''}
            onValueChange={(value) => handleChange('first_name', value)}
            errorMessage={errors?.first_name && t(errors.first_name)}
          />
        </LabelElement>

        <LabelElement label={t('last_name')}>
          <TextField
            placeHolder={t('last_name_placeholder')}
            value={profile?.last_name || ''}
            onValueChange={(value) => handleChange('last_name', value)}
            errorMessage={errors?.last_name && t(errors.last_name)}
          />
        </LabelElement>

        <LabelElement label={t('email')} required>
          <TextField
            placeHolder={t('email_placeholder')}
            value={profile?.email || ''}
            onValueChange={(value) => handleChange('email', value)}
            errorMessage={errors?.email && t(errors.email)}
          />
        </LabelElement>

        <LabelElement label={t('phone')}>
          <TextField
            placeHolder={t('phone_placeholder')}
            value={profile?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            errorMessage={errors?.phone && t(errors.phone)}
          />
        </LabelElement>
      </Box>
    </Card>
  );
};

export default Details;
