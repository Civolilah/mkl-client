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
  INITIAL_CATEGORY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import CategoryForm from '@pages/categories/common/components/CategoryForm';
import { validateCategory } from '@pages/categories/common/helpers/helpers';

import { Category, ValidationErrors } from '@interfaces/index';

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
  onCategoryCreated?: (categoryId: string) => void;
};

const CategoriesSelector = (props: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const {
    value,
    onChange,
    onClear,
    errorMessage,
    label,
    placeholder,
    withActionButton,
    mode = 'multiple',
    onCategoryCreated,
  } = props;

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryPayload, setCategoryPayload] = useState<Category | undefined>(
    INITIAL_CATEGORY
  );

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryPayload(INITIAL_CATEGORY);
    setIsModalOpen(false);
  };

  const handleCreateBrand = async () => {
    if (!categoryPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateCategory(categoryPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/categories', categoryPayload)
        .then((response) => {
          toast.success('created_category');

          refetch(['categories']);

          setTimeout(() => {
            onCategoryCreated?.(response.data.id);
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
          <CategoryForm
            category={categoryPayload}
            setCategory={setCategoryPayload}
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
        queryIdentifiers={['/api/categories', 'selector']}
        mode={mode}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/categories?selector=true"
        enableByPermission={
          hasPermission('create_category') ||
          hasPermission('view_category') ||
          hasPermission('edit_category')
        }
        withoutRefreshData
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
              {t('new_category')}
            </Button>
          ) : undefined
        }
      />
    </>
  );
};

export default CategoriesSelector;
