/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { INITIAL_LABEL, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, useToast } from '@helpers/index';

import LabelForm from '@pages/labels/common/components/LabelForm';
import { validateLabel } from '@pages/labels/common/helpers/helpers';

import { Label, ValidationErrors } from '@interfaces/index';

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
  withoutOptionalText?: boolean;
  labelCategoryId?: string;
  disableLabelCategorySelector?: boolean;
  withoutLabelCategorySelectorRefreshData?: boolean;
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
    withoutOptionalText,
    labelCategoryId,
    disableLabelCategorySelector,
    withoutLabelCategorySelectorRefreshData,
  } = props;

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [labelPayload, setLabelPayload] = useState<Label | undefined>(
    INITIAL_LABEL
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setLabelPayload(INITIAL_LABEL);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateLabel = async () => {
    if (!labelPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateLabel(labelPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/labels', labelPayload)
        .then((response) => {
          toast.success('created_label');

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

  useEffect(() => {
    if (labelCategoryId && isModalOpen) {
      setLabelPayload(
        (current) =>
          current && {
            ...current,
            label_category_id: labelCategoryId,
          }
      );
    }
  }, [labelCategoryId, isModalOpen]);

  return (
    <>
      <Modal
        title={t('new_label')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-4 w-full">
          <LabelForm
            label={labelPayload}
            setLabel={setLabelPayload}
            errors={errors}
            onlyFields
            disableLabelCategorySelector={disableLabelCategorySelector}
            withoutLabelCategorySelectorRefreshData={
              withoutLabelCategorySelectorRefreshData
            }
          />

          <Button
            type="primary"
            onClick={handleCreateLabel}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={
          labelCategoryId
            ? ['/api/labels', 'selector', labelCategoryId]
            : ['/api/labels', 'selector']
        }
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint={`/api/labels?selector=true${
          labelCategoryId ? `&label_category_id=${labelCategoryId}` : ''
        }`}
        enableByPermission={
          hasPermission('create_label') ||
          hasPermission('view_label') ||
          hasPermission('edit_label')
        }
        withoutRefreshData
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton ? (
            <Button type="primary" onClick={handleOpenModal}>
              {t('new_label')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        withoutOptionalText={withoutOptionalText}
      />
    </>
  );
};

export default LabelCategoriesSelector;
