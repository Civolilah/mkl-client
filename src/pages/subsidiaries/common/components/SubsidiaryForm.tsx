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
  isLoading?: boolean;
  onlyFields?: boolean;
  onMainFieldsEnterPress?: () => void;
  nameFieldDebounce?: number;
}

const SubsidiaryForm = ({
  subsidiary,
  setSubsidiary,
  errors,
  isLoading,
  onlyFields,
  onMainFieldsEnterPress,
  nameFieldDebounce,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setSubsidiary });

  if (onlyFields) {
    return (
      <>
        <TextField
          className="subsidiary-modal-name-field"
          required
          label={t('name')}
          placeHolder={t('subsidiary_name_placeholder')}
          value={subsidiary?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          onPressEnter={onMainFieldsEnterPress}
          errorMessage={errors?.name && t(errors.name)}
          debounce={nameFieldDebounce}
        />
      </>
    );
  }

  return (
    <Card
      title={t('details')}
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
          label={t('street')}
          placeHolder={t('street_placeholder')}
          value={subsidiary?.address || ''}
          onValueChange={(value) => handleChange('address', value)}
          changeOnBlur
          errorMessage={errors?.address && t(errors.address)}
        />

        <TextField
          label={t('apt_suite')}
          placeHolder={t('apt_suite_placeholder')}
          value={subsidiary?.address2 || ''}
          onValueChange={(value) => handleChange('address2', value)}
          changeOnBlur
          errorMessage={errors?.address2 && t(errors.address2)}
        />

        <TextField
          label={t('city')}
          placeHolder={t('city_placeholder')}
          value={subsidiary?.city || ''}
          onValueChange={(value) => handleChange('city', value)}
          changeOnBlur
          errorMessage={errors?.city && t(errors.city)}
        />

        <TextField
          label={t('state')}
          placeHolder={t('state_placeholder')}
          value={subsidiary?.state || ''}
          onValueChange={(value) => handleChange('state', value)}
          changeOnBlur
          errorMessage={errors?.state && t(errors.state)}
        />

        <TextField
          label={t('zip_code')}
          placeHolder={t('zip_code_placeholder')}
          value={subsidiary?.zip_code || ''}
          onValueChange={(value) => handleChange('zip_code', value)}
          changeOnBlur
          errorMessage={errors?.zip_code && t(errors.zip_code)}
        />

        <CountriesSelector
          label={t('country')}
          placeHolder={t('select_country')}
          value={subsidiary?.country_id || ''}
          onValueChange={(value) => handleChange('country_id', value)}
          onClear={() => handleChange('country_id', '')}
          errorMessage={errors?.country_id && t(errors.country_id)}
        />
      </Box>
    </Card>
  );
};

export default SubsidiaryForm;
