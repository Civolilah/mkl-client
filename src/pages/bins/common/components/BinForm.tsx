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

import { Bin, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  Text,
  TextField,
  WarehousesSelector,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

interface Props {
  bin: Bin | undefined;
  setBin: Dispatch<SetStateAction<Bin | undefined>>;
  errors: ValidationErrors;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
  onMainFieldsEnterPress?: () => void;
}

const BinForm = ({
  bin,
  setBin,
  errors,
  isLoading,
  onlyFields,
  onMainFieldsEnterPress,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setBin });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('bin_name_placeholder')}
          value={bin?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          onPressEnter={onMainFieldsEnterPress}
          errorMessage={errors?.name && t(errors.name)}
        />

        <WarehousesSelector
          required
          label={t('warehouse')}
          placeholder={t('select_warehouse')}
          value={bin?.warehouse_id ? [bin?.warehouse_id] : []}
          onChange={(value) => handleChange('warehouse_id', value as string)}
          onCreatedWarehouse={(warehouseId) =>
            handleChange('warehouse_id', warehouseId)
          }
          onClear={() => handleChange('warehouse_id', '')}
          errorMessage={errors?.warehouse_id && t(errors.warehouse_id)}
          withActionButton
          withRefreshButton
        />
      </>
    );
  }

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="boxAlignTopRightFilled" size="1.3rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      className="w-full md:w-3/4 xl:w-1/2"
      isLoading={isLoading}
    >
      <Box className="flex flex-col space-y-4">
        <TextField
          required
          label={t('name')}
          placeHolder={t('bin_name_placeholder')}
          value={bin?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          errorMessage={errors?.name && t(errors.name)}
        />

        <WarehousesSelector
          required
          mode="single"
          label={t('warehouse')}
          placeholder={t('select_warehouse')}
          value={bin?.warehouse_id ? [bin?.warehouse_id] : []}
          onChange={(value) => handleChange('warehouse_id', value as string)}
          onCreatedWarehouse={(warehouseId) =>
            handleChange('warehouse_id', warehouseId)
          }
          onClear={() => handleChange('warehouse_id', '')}
          errorMessage={errors?.warehouse_id && t(errors.warehouse_id)}
          withActionButton
          withRefreshButton
        />
      </Box>
    </Card>
  );
};

export default BinForm;
