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

import { useHasPermission, useTranslation } from '@hooks/index';

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
};

const LabelCategoriesSelector = (props: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const hasPermission = useHasPermission();

  const {
    value,
    onChange,
    onClear,
    errorMessage,
    label,
    placeholder,
    withActionButton,
    additionalOptions,
    exclude = [],
  } = props;

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

          onChange([response.data.id]);

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
        size="small"
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
        withoutRefreshData
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button type="primary" onClick={handleOpenModal}>
              {t('new_label_category')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        exclude={exclude}
      />
    </>
  );
};

export default LabelCategoriesSelector;
