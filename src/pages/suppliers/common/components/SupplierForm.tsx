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

import { Box, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import Address from './Address';
import Contacts from './Contacts';
import Details from './Details';
import useHandleChange from '../hooks/useHandleChange';

interface Props {
  supplier: Supplier | undefined;
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
}

const SupplierForm = ({
  supplier,
  setSupplier,
  errors,
  isLoading,
  onlyFields,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setSupplier });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('supplier_name_placeholder')}
          value={supplier?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Box className="flex self-start w-full lg:w-3/4 pb-20">
      <Box className="flex flex-col w-full gap-y-4">
        <Details
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />

        <Address
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />

        <Contacts
          supplier={supplier}
          isLoading={isLoading}
          errors={errors}
          setSupplier={setSupplier}
        />
      </Box>
    </Box>
  );
};

export default SupplierForm;
