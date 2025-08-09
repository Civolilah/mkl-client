/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import {
  INITIAL_SUPPLIER,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import SupplierForm from '@pages/suppliers/common/components/SupplierForm';
import { validateSupplier } from '@pages/suppliers/common/helpers/helpers';

import { Supplier, ValidationErrors } from '@interfaces/index';

import { Box, Button, Modal } from '@components/index';
import SelectDataField, {
  Option,
} from '@components/input-fields/SelectDataField';

import { useHasPermission, useRefetch, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  placeholder?: string;
  mode?: 'single' | 'multiple';
  value: string[];
  onChange?: (value: string | string[]) => void;
  onClear?: () => void;
  errorMessage?: string;
  withActionButton?: boolean;
  additionalOptions?: Option[];
  withoutOptionalText?: boolean;
  onCreatedSupplier?: (supplierId: string) => void;
  readOnly?: boolean;
  withRefreshButton?: boolean;
};

const SuppliersSelector = ({
  mode,
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  withActionButton,
  additionalOptions,
  withoutOptionalText,
  onCreatedSupplier,
  readOnly,
  withRefreshButton,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [supplierPayload, setSupplierPayload] = useState<Supplier | undefined>(
    INITIAL_SUPPLIER
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSupplierPayload(INITIAL_SUPPLIER);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateSupplier = async () => {
    if (!supplierPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateSupplier(supplierPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/suppliers', supplierPayload)
        .then((response) => {
          toast.success('created_supplier');

          refetch(['suppliers']);

          onCreatedSupplier?.(response.data.id);

          handleCloseModal();
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
        title={t('new_supplier')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-4 w-full">
          <SupplierForm
            supplier={supplierPayload}
            setSupplier={setSupplierPayload}
            errors={errors}
            onlyFields
          />

          <Button
            type="primary"
            onClick={handleCreateSupplier}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        mode={mode}
        queryIdentifiers={['/api/suppliers', 'selector']}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/suppliers?selector=true"
        enableByPermission={
          hasPermission('create_supplier') ||
          hasPermission('view_supplier') ||
          hasPermission('edit_supplier')
        }
        withoutRefreshData={!withRefreshButton}
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button className="w-full" type="primary" onClick={handleOpenModal}>
              {t('new_supplier')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        withoutOptionalText={withoutOptionalText}
        readOnly={readOnly}
      />
    </>
  );
};

export default SuppliersSelector;
