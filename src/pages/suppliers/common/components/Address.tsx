/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Card, CountriesSelector, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { SupplierProps } from '../hooks/useTabs';

const Address = ({
  supplier,
  isLoading,
  errors,
  setSupplier,
}: SupplierProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setSupplier });

  return (
    <Card
      title={t('address')}
      className="w-full"
      childrenParentClassName="pb-8"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-4">
        <TextField
          label={t('street')}
          placeHolder={t('street_placeholder')}
          value={supplier?.address || ''}
          onValueChange={(value) => handleChange('address', value)}
          changeOnBlur
          errorMessage={errors?.address && t(errors.address)}
        />

        <TextField
          label={t('apt_suite')}
          placeHolder={t('apt_suite_placeholder')}
          value={supplier?.address2 || ''}
          onValueChange={(value) => handleChange('address2', value)}
          changeOnBlur
          errorMessage={errors?.address2 && t(errors.address2)}
        />

        <TextField
          label={t('city')}
          placeHolder={t('city_placeholder')}
          value={supplier?.city || ''}
          onValueChange={(value) => handleChange('city', value)}
          changeOnBlur
          errorMessage={errors?.city && t(errors.city)}
        />

        <TextField
          label={t('state')}
          placeHolder={t('state_placeholder')}
          value={supplier?.state || ''}
          onValueChange={(value) => handleChange('state', value)}
          changeOnBlur
          errorMessage={errors?.state && t(errors.state)}
        />

        <TextField
          label={t('zip_code')}
          placeHolder={t('zip_code_placeholder')}
          value={supplier?.zip_code || ''}
          onValueChange={(value) => handleChange('zip_code', value)}
          changeOnBlur
          errorMessage={errors?.zip_code && t(errors.zip_code)}
        />

        <CountriesSelector
          label={t('country')}
          placeHolder={t('select_country')}
          value={supplier?.country_id || ''}
          onValueChange={(value) => handleChange('country_id', value)}
          onClear={() => handleChange('country_id', '')}
          errorMessage={errors?.country_id && t(errors.country_id)}
        />
      </Box>
    </Card>
  );
};

export default Address;
