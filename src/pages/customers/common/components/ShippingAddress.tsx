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

const ShippingAddress = ({
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

          <Text>{t('shipping_address')}</Text>
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
            value={customer?.shipping_address || ''}
            onValueChange={(value) => handleChange('shipping_address', value)}
            changeOnBlur
            errorMessage={
              errors?.shipping_address && t(errors.shipping_address)
            }
          />

          <TextField
            label={t('apt_suite')}
            placeHolder={t('apt_suite_placeholder')}
            value={customer?.shipping_address2 || ''}
            onValueChange={(value) => handleChange('shipping_address2', value)}
            changeOnBlur
            errorMessage={
              errors?.shipping_address2 && t(errors.shipping_address2)
            }
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('city')}
            placeHolder={t('city_placeholder')}
            value={customer?.shipping_city || ''}
            onValueChange={(value) => handleChange('shipping_city', value)}
            changeOnBlur
            errorMessage={errors?.shipping_city && t(errors.shipping_city)}
          />

          <TextField
            label={t('state')}
            placeHolder={t('state_placeholder')}
            value={customer?.shipping_state || ''}
            onValueChange={(value) => handleChange('shipping_state', value)}
            changeOnBlur
            errorMessage={errors?.shipping_state && t(errors.shipping_state)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('zip_code')}
            placeHolder={t('zip_code_placeholder')}
            value={customer?.shipping_zip_code || ''}
            onValueChange={(value) => handleChange('shipping_zip_code', value)}
            changeOnBlur
            errorMessage={
              errors?.shipping_zip_code && t(errors.shipping_zip_code)
            }
          />

          <CountriesSelector
            label={t('country')}
            placeHolder={t('select_country')}
            value={customer?.shipping_country_id || ''}
            onValueChange={(value) =>
              handleChange('shipping_country_id', value)
            }
            onClear={() => handleChange('shipping_country_id', '')}
            errorMessage={
              errors?.shipping_country_id && t(errors.shipping_country_id)
            }
          />
        </Box>
      </Box>
    </Card>
  );
};

export default ShippingAddress;
