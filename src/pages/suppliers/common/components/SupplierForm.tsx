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

import { Card, RefreshDataElement, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  supplier: Supplier | undefined;
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
};

const SupplierForm = (props: Props) => {
  const t = useTranslation();

  const { supplier, setSupplier, errors, editPage, isLoading, onRefresh } =
    props;

  const handleChange = useHandleChange({ setSupplier });

  return (
    <Card
      title={editPage ? t('edit_supplier') : t('new_supplier')}
      className="w-full md:w-3/4 xl:w-1/2"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <TextField
        required
        label={t('name')}
        placeHolder={t('supplier_name_placeholder')}
        value={supplier?.name || ''}
        onValueChange={(value) => handleChange('name', value)}
        changeOnBlur
        errorMessage={errors?.name && t(errors.name)}
      />
    </Card>
  );
};

export default SupplierForm;
