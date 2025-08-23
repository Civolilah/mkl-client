/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Box, Card, CountriesSelector, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

interface Props {
  subsidiary: Subsidiary | undefined;
  setSubsidiary: Dispatch<SetStateAction<Subsidiary | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
}

const SubsidiaryForm = ({
  subsidiary,
  setSubsidiary,
  errors,
  editPage,
  isLoading,
  onlyFields,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setSubsidiary });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('subsidiary_name_placeholder')}
          value={subsidiary?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Card
      title={editPage ? t('edit_subsidiary') : t('new_subsidiary')}
      className="w-full md:w-full xl:w-3/4"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4 pb-2">
        <TextField
          required
          label={t('name')}
          placeHolder={t('subsidiary_name_placeholder')}
          value={subsidiary?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        <TextField
          label={t('address')}
          placeHolder={t('subsidiary_address_placeholder')}
          value={subsidiary?.address || ''}
          onValueChange={(value) => handleChange('address', value)}
          changeOnBlur
          errorMessage={errors?.address && t(errors.address)}
        />

        <CountriesSelector
          label={t('country')}
          placeHolder={t('select_country')}
          value={subsidiary?.country_code || ''}
          onValueChange={(value) => handleChange('country_code', value)}
          onClear={() => handleChange('country_code', '')}
          errorMessage={errors?.country_code && t(errors.country_code)}
        />

        <TextField
          label={t('city')}
          placeHolder={t('subsidiary_city_placeholder')}
          value={subsidiary?.city || ''}
          onValueChange={(value) => handleChange('city', value)}
          changeOnBlur
          errorMessage={errors?.city && t(errors.city)}
        />

        <TextField
          label={t('zip_code')}
          placeHolder={t('subsidiary_zip_code_placeholder')}
          value={subsidiary?.zip_code || ''}
          onValueChange={(value) => handleChange('zip_code', value)}
          changeOnBlur
          errorMessage={errors?.zip_code && t(errors.zip_code)}
        />
      </Box>
    </Card>
  );
};

export default SubsidiaryForm;
