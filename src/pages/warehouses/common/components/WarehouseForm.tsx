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

import { Card, RefreshDataElement, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  warehouse: Warehouse | undefined;
  setWarehouse: Dispatch<SetStateAction<Warehouse | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
};

const WarehouseForm = (props: Props) => {
  const t = useTranslation();

  const {
    warehouse,
    setWarehouse,
    errors,
    editPage,
    isLoading,
    onRefresh,
    onlyFields,
  } = props;

  const handleChange = useHandleChange({ setWarehouse });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('brand_name_placeholder')}
          value={warehouse?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Card
      title={t('details')}
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
        placeHolder={t('warehouse_name_placeholder')}
        value={warehouse?.name || ''}
        onValueChange={(value) => handleChange('name', value)}
        changeOnBlur
        errorMessage={errors?.name && t(errors.name)}
      />
    </Card>
  );
};

export default WarehouseForm;
