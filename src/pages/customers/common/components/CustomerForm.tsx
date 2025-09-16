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

import { Customer, ValidationErrors } from '@interfaces/index';

import { Box, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import BillingAddress from './BillingAddress';
import Contacts from './Contacts';
import Details from './Details';
import ShippingAddress from './ShippingAddress';
import useHandleChange from '../hooks/useHandleChange';

export interface CustomerProps {
  customer: Customer | undefined;
  setCustomer: Dispatch<SetStateAction<Customer | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
}

const CustomerForm = ({
  customer,
  setCustomer,
  errors,
  isLoading,
  onlyFields,
}: CustomerProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setCustomer });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('customer_name_placeholder')}
          value={customer?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Box className="flex self-start w-full pb-20">
      <Box className="flex flex-col lg:flex-row w-full gap-y-4 lg:gap-x-4 lg:gap-y-0">
        <Box className="flex flex-col w-full gap-y-4">
          <Details
            customer={customer}
            isLoading={isLoading}
            errors={errors}
            setCustomer={setCustomer}
          />

          <Contacts
            customer={customer}
            isLoading={isLoading}
            errors={errors}
            setCustomer={setCustomer}
          />
        </Box>

        <Box className="flex flex-col w-full gap-y-4">
          <BillingAddress
            customer={customer}
            isLoading={isLoading}
            errors={errors}
            setCustomer={setCustomer}
          />

          <ShippingAddress
            customer={customer}
            isLoading={isLoading}
            errors={errors}
            setCustomer={setCustomer}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerForm;
