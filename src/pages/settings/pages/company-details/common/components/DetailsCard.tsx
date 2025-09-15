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
  CompanyClassificationsSelector,
  CompanyIndustrySelector,
  CompanySizesSelector,
  Icon,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { CompanyDetailsProps } from '../../CompanyDetails';
import useHandleChange from '../hooks/useHandleChange';

const DetailsCard = ({
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
            <Icon name="company" size="1.3rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('name')}
            placeHolder={t('company_name_placeholder')}
            value={companyDetails?.name || ''}
            onValueChange={(value) => handleChange('name', value)}
            errorMessage={errors?.name && t(errors.name)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('id_number')}
            placeHolder={t('id_number_placeholder')}
            value={companyDetails?.id_number || ''}
            onValueChange={(value) => handleChange('id_number', value)}
            errorMessage={errors?.id_number && t(errors.id_number)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('vat_number')}
            placeHolder={t('vat_number_placeholder')}
            value={companyDetails?.vat_number || ''}
            onValueChange={(value) => handleChange('vat_number', value)}
            errorMessage={errors?.vat_number && t(errors.vat_number)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('website')}
            placeHolder={t('website_placeholder')}
            value={companyDetails?.website || ''}
            onValueChange={(value) => handleChange('website', value)}
            errorMessage={errors?.website && t(errors.website)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('email')}
            placeHolder={t('email_placeholder')}
            value={companyDetails?.email || ''}
            onValueChange={(value) => handleChange('email', value)}
            errorMessage={errors?.email && t(errors.email)}
            readOnly={isFormBusy}
          />

          <TextField
            label={t('phone')}
            placeHolder={t('phone_placeholder')}
            value={companyDetails?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            errorMessage={errors?.phone && t(errors.phone)}
            readOnly={isFormBusy}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <CompanySizesSelector
            label={t('size')}
            placeHolder={t('select_size')}
            value={companyDetails?.size || ''}
            onValueChange={(value) => handleChange('size', value)}
            errorMessage={errors?.size && t(errors.size)}
            disabled={isFormBusy}
          />

          <CompanyIndustrySelector
            label={t('industry')}
            placeHolder={t('select_industry')}
            value={companyDetails?.industry || ''}
            onValueChange={(value) => handleChange('industry', value)}
            errorMessage={errors?.industry && t(errors.industry)}
            disabled={isFormBusy}
          />
        </Box>

        <CompanyClassificationsSelector
          label={t('classification')}
          placeHolder={t('select_classification')}
          value={companyDetails?.classification || ''}
          onValueChange={(value) => handleChange('classification', value)}
          errorMessage={errors?.classification && t(errors.classification)}
          disabled={isFormBusy}
        />
      </Box>
    </Card>
  );
};

export default DetailsCard;
