/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import {
  Box,
  Card,
  CountriesSelector,
  Icon,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { CustomerProps } from './CustomerForm';
import useHandleChange from '../hooks/useHandleChange';

const BillingAddress = ({
  customer,
  isLoading,
  errors,
  setCustomer,
}: CustomerProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setCustomer });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="locationDot" size="1.2rem" />
          </Box>

          <Text>{t('billing_address')}</Text>
        </Box>
      }
      className="w-full"
      childrenParentClassName="pb-8"
      isLoading={isLoading}
      heightAuto
    >
      <Box className="flex flex-col gap-4">
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('street')}
            placeHolder={t('street_placeholder')}
            value={customer?.billing_address || ''}
            onValueChange={(value) => handleChange('billing_address', value)}
            changeOnBlur
            errorMessage={errors?.billing_address && t(errors.billing_address)}
          />

          <TextField
            label={t('apt_suite')}
            placeHolder={t('apt_suite_placeholder')}
            value={customer?.billing_address2 || ''}
            onValueChange={(value) => handleChange('billing_address2', value)}
            changeOnBlur
            errorMessage={
              errors?.billing_address2 && t(errors.billing_address2)
            }
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('city')}
            placeHolder={t('city_placeholder')}
            value={customer?.billing_city || ''}
            onValueChange={(value) => handleChange('billing_city', value)}
            changeOnBlur
            errorMessage={errors?.billing_city && t(errors.billing_city)}
          />

          <TextField
            label={t('state')}
            placeHolder={t('state_placeholder')}
            value={customer?.billing_state || ''}
            onValueChange={(value) => handleChange('billing_state', value)}
            changeOnBlur
            errorMessage={errors?.billing_state && t(errors.billing_state)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('zip_code')}
            placeHolder={t('zip_code_placeholder')}
            value={customer?.billing_zip_code || ''}
            onValueChange={(value) => handleChange('billing_zip_code', value)}
            changeOnBlur
            errorMessage={
              errors?.billing_zip_code && t(errors.billing_zip_code)
            }
          />

          <CountriesSelector
            label={t('country')}
            placeHolder={t('select_country')}
            value={customer?.billing_country_id || ''}
            onValueChange={(value) => handleChange('billing_country_id', value)}
            onClear={() => handleChange('billing_country_id', '')}
            errorMessage={
              errors?.billing_country_id && t(errors.billing_country_id)
            }
          />
        </Box>
      </Box>
    </Card>
  );
};

export default BillingAddress;
