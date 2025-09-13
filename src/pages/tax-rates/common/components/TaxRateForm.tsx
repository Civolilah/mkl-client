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

import { TaxRate, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  NumberField,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

interface Props {
  taxRate: TaxRate | undefined;
  setTaxRate: Dispatch<SetStateAction<TaxRate | undefined>>;
  errors: ValidationErrors;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
  onMainFieldsEnterPress?: () => void;
}

const TaxRateForm = ({
  taxRate,
  setTaxRate,
  errors,
  isLoading,
  onlyFields,
  onMainFieldsEnterPress,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setTaxRate });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('tax_rate_name_placeholder')}
          value={taxRate?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          onPressEnter={onMainFieldsEnterPress}
          errorMessage={errors?.name && t(errors.name)}
        />

        <NumberField
          required
          label={t('rate')}
          placeHolder={t('tax_rate_rate_placeholder')}
          value={taxRate?.rate || 0}
          onValueChange={(value) => handleChange('rate', Number(value))}
          errorMessage={errors?.rate && t(errors.rate)}
        />
      </>
    );
  }

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="percentage" size="1.2rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      className="w-full md:w-3/4 xl:w-1/2"
      isLoading={isLoading}
    >
      <Box className="flex flex-col space-y-4 pb-2">
        <TextField
          required
          label={t('name')}
          placeHolder={t('tax_rate_name_placeholder')}
          value={taxRate?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          errorMessage={errors?.name && t(errors.name)}
        />

        <NumberField
          required
          label={t('rate')}
          placeHolder={t('tax_rate_rate_placeholder')}
          value={taxRate?.rate || 0}
          onValueChange={(value) => handleChange('rate', Number(value))}
          errorMessage={errors?.rate && t(errors.rate)}
        />
      </Box>
    </Card>
  );
};

export default TaxRateForm;
