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

import { Supplier, ValidationErrors } from '@interfaces/index';

import { Icon, Text } from '@components/index';
import { Box } from '@components/index';

import { useTranslation } from '@hooks/index';

import Address from '../components/Address';
import Contacts from '../components/Contacts';
import CustomFields from '../components/CustomFields';
import Details from '../components/Details';

export interface SupplierProps {
  supplier: Supplier | undefined;
  isLoading: boolean | undefined;
  errors: ValidationErrors;
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
}

const useTabs = ({
  supplier,
  isLoading,
  errors,
  setSupplier,
}: SupplierProps) => {
  const t = useTranslation();

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="person" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('details')}</Text>
        </Box>
      ),
      children: (
        <Details
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />
      ),
    },
    {
      key: 'address',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="locationDot" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('address')}</Text>
        </Box>
      ),
      children: (
        <Address
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />
      ),
    },
    {
      key: 'contacts',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="phone" size="1.05rem" />
          </Box>

          <Text className="text-sm">{t('contacts')}</Text>
        </Box>
      ),
      children: (
        <Contacts
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />
      ),
    },
    {
      key: 'custom_fields',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="outlineViewColumn" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('custom_fields')}</Text>
        </Box>
      ),
      children: (
        <CustomFields
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />
      ),
    },
  ];

  return tabs;
};

export default useTabs;
