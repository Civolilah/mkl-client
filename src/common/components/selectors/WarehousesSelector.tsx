/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode, useState } from 'react';

import {
  INITIAL_WAREHOUSE,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import WarehouseForm from '@pages/warehouses/common/components/WarehouseForm';
import { validateWarehouse } from '@pages/warehouses/common/helpers/helpers';

import { ValidationErrors, Warehouse } from '@interfaces/index';

import { Box, Button, Modal } from '@components/index';
import SelectDataField, {
  Option,
} from '@components/input-fields/SelectDataField';

import { useHasPermission, useRefetch, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string | string[]) => void;
  onClear?: () => void;
  errorMessage?: string;
  withActionButton?: boolean;
  additionalOptions?: Option[];
  withoutOptionalText?: boolean;
  afterSelectorLabel?: ReactNode;
  tooltipOverlayInnerStyle?: CSSProperties;
  onCreatedWarehouse?: (warehouseId: string) => void;
  withRefreshButton?: boolean;
};

const WarehousesSelector = ({
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  withActionButton,
  additionalOptions,
  withoutOptionalText,
  afterSelectorLabel,
  tooltipOverlayInnerStyle,
  onCreatedWarehouse,
  withRefreshButton,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [warehousePayload, setWarehousePayload] = useState<
    Warehouse | undefined
  >(INITIAL_WAREHOUSE);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setWarehousePayload(INITIAL_WAREHOUSE);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateWarehouse = async () => {
    if (!warehousePayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateWarehouse(warehousePayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/warehouses', warehousePayload)
        .then((response) => {
          handleCloseModal();

          toast.success('created_warehouse');

          refetch(['warehouses']);

          onCreatedWarehouse?.(response.data.id);
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  return (
    <>
      <Modal
        title={t('new_warehouse')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-6 w-full">
          <WarehouseForm
            warehouse={warehousePayload}
            setWarehouse={setWarehousePayload}
            errors={errors}
            onMainFieldsEnterPress={handleCreateWarehouse}
            onlyFields
          />

          <Button
            type="primary"
            onClick={handleCreateWarehouse}
            disabled={isFormBusy || !warehousePayload?.name}
            disabledWithLoadingIcon={isFormBusy}
            disablePreventAction
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/warehouses', 'selector']}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/warehouses?selector=true"
        enableByPermission={
          hasPermission('create_warehouse') ||
          hasPermission('view_warehouse') ||
          hasPermission('edit_warehouse')
        }
        withoutRefreshData={!withRefreshButton}
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() => setTimeout(handleOpenModal, 200)}
              disablePreventAction
            >
              {t('new_warehouse')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        withoutOptionalText={withoutOptionalText}
        afterLabel={afterSelectorLabel}
        tooltipOverlayInnerStyle={tooltipOverlayInnerStyle}
      />
    </>
  );
};

export default WarehousesSelector;
