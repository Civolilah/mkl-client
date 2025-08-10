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

import { INITIAL_BRAND, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, useToast } from '@helpers/index';

import BrandForm from '@pages/brands/common/components/BrandForm';
import { validateBrand } from '@pages/brands/common/helpers/helpers';

import { Brand, ValidationErrors } from '@interfaces/index';

import { Box, Button, Modal } from '@components/index';
import SelectDataField from '@components/input-fields/SelectDataField';

import { useHasPermission, useRefetch, useTranslation } from '@hooks/index';

type Props = {
  label?: string;
  placeholder?: string;
  value: string[];
  onChange: (value: string | string[]) => void;
  onClear: () => void;
  errorMessage: string;
  withActionButton?: boolean;
  mode?: 'single' | 'multiple';
  onBrandCreated?: (brandId: string) => void;
  withRefreshButton?: boolean;
};

const BrandsSelector = ({
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  withActionButton,
  mode = 'multiple',
  onBrandCreated,
  withRefreshButton,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [brandPayload, setBrandPayload] = useState<Brand | undefined>(
    INITIAL_BRAND
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setBrandPayload(INITIAL_BRAND);
    setIsModalOpen(false);
  };

  const handleCreateBrand = async () => {
    if (!brandPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateBrand(brandPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/brands', brandPayload)
        .then((response) => {
          toast.success('created_brand');

          refetch(['brands']);

          setTimeout(() => {
            onBrandCreated?.(response.data.id);
          }, 100);

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
        title={t('new_brand')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
      >
        <Box className="flex flex-col space-y-6 w-full">
          <BrandForm
            brand={brandPayload}
            setBrand={setBrandPayload}
            errors={errors}
            onlyFields
          />

          <Button
            type="primary"
            onClick={handleCreateBrand}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/brands', 'selector']}
        mode={mode}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/brands?selector=true"
        enableByPermission={
          hasPermission('create_brand') ||
          hasPermission('view_brand') ||
          hasPermission('edit_brand')
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
            >
              {t('new_brand')}
            </Button>
          ) : undefined
        }
      />
    </>
  );
};

export default BrandsSelector;
