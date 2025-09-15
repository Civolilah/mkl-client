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

import { ValidationErrors, Warehouse } from '@interfaces/index';

import {
  Box,
  Card,
  CountriesSelector,
  Icon,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

interface Props {
  warehouse: Warehouse | undefined;
  setWarehouse: Dispatch<SetStateAction<Warehouse | undefined>>;
  errors: ValidationErrors;
  isLoading?: boolean;
  onlyFields?: boolean;
  onMainFieldsEnterPress?: () => void;
  nameFieldDebounce?: number;
}

const WarehouseForm = ({
  warehouse,
  setWarehouse,
  errors,
  isLoading,
  onlyFields,
  onMainFieldsEnterPress,
  nameFieldDebounce,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setWarehouse });

  if (onlyFields) {
    return (
      <>
        <TextField
          className="warehouse-modal-name-field"
          required
          label={t('name')}
          placeHolder={t('warehouse_name_placeholder')}
          value={warehouse?.name || ''}
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
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="warehouse" size="1.15rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      className="w-full md:w-3/4"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        <TextField
          required
          label={t('name')}
          placeHolder={t('warehouse_name_placeholder')}
          value={warehouse?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          errorMessage={errors?.name && t(errors.name)}
        />

        <Box className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
          <TextField
            label={t('street')}
            placeHolder={t('street_placeholder')}
            value={warehouse?.address || ''}
            onValueChange={(value) => handleChange('address', value)}
            errorMessage={errors?.address && t(errors.address)}
          />

          <TextField
            label={t('apt_suite')}
            placeHolder={t('apt_suite_placeholder')}
            value={warehouse?.address2 || ''}
            onValueChange={(value) => handleChange('address2', value)}
            errorMessage={errors?.address2 && t(errors.address2)}
          />
        </Box>

        <Box className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
          <TextField
            label={t('city')}
            placeHolder={t('city_placeholder')}
            value={warehouse?.city || ''}
            onValueChange={(value) => handleChange('city', value)}
            errorMessage={errors?.city && t(errors.city)}
          />

          <TextField
            label={t('state')}
            placeHolder={t('state_placeholder')}
            value={warehouse?.state || ''}
            onValueChange={(value) => handleChange('state', value)}
            errorMessage={errors?.state && t(errors.state)}
          />
        </Box>

        <Box className="flex flex-col gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
          <TextField
            label={t('zip_code')}
            placeHolder={t('zip_code_placeholder')}
            value={warehouse?.zip_code || ''}
            onValueChange={(value) => handleChange('zip_code', value)}
            errorMessage={errors?.zip_code && t(errors.zip_code)}
          />

          <CountriesSelector
            label={t('country')}
            placeHolder={t('select_country')}
            value={warehouse?.country_id || ''}
            onValueChange={(value) => handleChange('country_id', value)}
            onClear={() => handleChange('country_id', '')}
            errorMessage={errors?.country_id && t(errors.country_id)}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default WarehouseForm;
