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

import { Box, Card, Icon, Text, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { CompanyDetailsProps } from '../../CompanyDetails';
import useHandleChange from '../hooks/useHandleChange';

const LogoCard = ({
  companyDetails,
  errors,
  setCompanyDetails,
  isLoading,
  isFormBusy,
}: CompanyDetailsProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setCompanyDetails });

  return (
    <Card
      className="w-full"
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="image" size="1.1rem" />
          </Box>

          <Text>{t('logo')}</Text>
        </Box>
      }
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('address')}
            placeHolder={t('address_placeholder')}
            value={companyDetails?.address || ''}
            onValueChange={(value) => handleChange('address', value)}
            errorMessage={errors?.address && t(errors.address)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('apt_suite')}
            placeHolder={t('apt_suite_placeholder')}
            value={companyDetails?.address2 || ''}
            onValueChange={(value) => handleChange('address2', value)}
            errorMessage={errors?.address2 && t(errors.address2)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('city')}
            placeHolder={t('city_placeholder')}
            value={companyDetails?.city || ''}
            onValueChange={(value) => handleChange('city', value)}
            errorMessage={errors?.city && t(errors.city)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('state')}
            placeHolder={t('state_placeholder')}
            value={companyDetails?.state || ''}
            onValueChange={(value) => handleChange('state', value)}
            errorMessage={errors?.state && t(errors.state)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('zip_code')}
            placeHolder={t('zip_code_placeholder')}
            value={companyDetails?.zip_code || ''}
            onValueChange={(value) => handleChange('zip_code', value)}
            errorMessage={errors?.zip_code && t(errors.zip_code)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('country')}
            placeHolder={t('select_country')}
            value={companyDetails?.country_id || ''}
            onValueChange={(value) => handleChange('country_id', value)}
            errorMessage={errors?.country_id && t(errors.country_id)}
            readOnly={isFormBusy}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default LogoCard;
