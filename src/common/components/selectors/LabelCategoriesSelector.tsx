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
  INITIAL_LABEL_CATEGORY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import LabelCategoryForm from '@pages/label-categories/common/components/LabelCategoryForm';
import { validateLabelCategory } from '@pages/label-categories/common/helpers/helpers';

import { LabelCategory, ValidationErrors } from '@interfaces/index';

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
  exclude?: string[];
  onCreatedLabelCategory?: (labelCategoryId: string) => void;
  withoutRefreshData?: boolean;
  disabled?: boolean;
  required?: boolean;
  mode?: 'single' | 'multiple';
};

const LabelCategoriesSelector = ({
  mode = 'single',
  value,
  onChange,
  onClear,
  errorMessage,
  label,
  placeholder,
  withActionButton,
  additionalOptions,
  exclude = [],
  onCreatedLabelCategory,
  withoutRefreshData,
  disabled,
  required,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [labelCategoryPayload, setLabelCategoryPayload] = useState<
    LabelCategory | undefined
  >(INITIAL_LABEL_CATEGORY);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLabelCategoryPayload(INITIAL_LABEL_CATEGORY);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateLabelCategory = async () => {
    if (!labelCategoryPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors =
        await validateLabelCategory(labelCategoryPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/label_categories', labelCategoryPayload)
        .then((response) => {
          toast.success('created_category');

          refetch(['label_categories']);

          onCreatedLabelCategory?.(response.data.id);

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
        title={t('new_label_category')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-4 w-full">
          <LabelCategoryForm
            labelCategory={labelCategoryPayload}
            setLabelCategory={setLabelCategoryPayload}
            errors={errors}
            onlyFields
          />

          <Button
            type="primary"
            onClick={handleCreateLabelCategory}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/label_categories', 'selector']}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/label_categories?selector=true"
        enableByPermission={
          hasPermission('create_label_category') ||
          hasPermission('view_label_category') ||
          hasPermission('edit_label_category')
        }
        withoutRefreshData={withoutRefreshData}
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
              {t('new_label_category')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        exclude={exclude}
        disabled={disabled}
        required={required}
        mode={mode}
      />
    </>
  );
};

export default LabelCategoriesSelector;
