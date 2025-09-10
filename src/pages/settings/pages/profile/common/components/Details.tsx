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

import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { Box, Card, Icon, Text, TextField, Tooltip } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProfileProps } from '../../Profile';
import useHandleChange from '../hooks/useHandleChange';

const Details = ({
  profile,
  errors,
  setProfile,
  isLoading,
  isFormBusy,
}: ProfileProps) => {
  const t = useTranslation();

  const userCompany = useAtomValue(userCompanyAtom);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="person" size="1.4rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('first_name')}
            placeHolder={t('first_name_placeholder')}
            value={profile?.first_name || ''}
            onValueChange={(value) => handleChange('first_name', value)}
            errorMessage={errors?.first_name && t(errors.first_name)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('last_name')}
            placeHolder={t('last_name_placeholder')}
            value={profile?.last_name || ''}
            onValueChange={(value) => handleChange('last_name', value)}
            errorMessage={errors?.last_name && t(errors.last_name)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <Tooltip
            text={
              userCompany?.login_type !== 'credentials'
                ? t('profile_email_change')
                : undefined
            }
            overlayInnerStyle={{
              width: isSmallScreen ? undefined : '21rem',
              textAlign: 'center',
            }}
          >
            <div className="w-full">
              <TextField
                required
                type="email"
                label={t('email')}
                placeHolder={t('email_placeholder')}
                value={profile?.email || ''}
                onValueChange={(value) => handleChange('email', value)}
                errorMessage={errors?.email && t(errors.email)}
                readOnly={
                  userCompany?.login_type !== 'credentials' || isFormBusy
                }
              />
            </div>
          </Tooltip>

          <TextField
            type="tel"
            label={t('phone')}
            placeHolder={t('phone_placeholder')}
            value={profile?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            errorMessage={errors?.phone && t(errors.phone)}
            readOnly={isFormBusy}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
