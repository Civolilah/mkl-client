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
  INITIAL_SUBSIDIARY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import SubsidiaryForm from '@pages/subsidiaries/common/components/SubsidiaryForm';
import { validateSubsidiary } from '@pages/subsidiaries/common/helpers/helpers';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

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
  onCreatedSubsidiary?: (subsidiaryId: string) => void;
  withRefreshButton?: boolean;
};

const SubsidiariesSelector = ({
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
  onCreatedSubsidiary,
  withRefreshButton,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [subsidiaryPayload, setSubsidiaryPayload] = useState<
    Subsidiary | undefined
  >(INITIAL_SUBSIDIARY);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubsidiaryPayload(INITIAL_SUBSIDIARY);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateSubsidiary = async () => {
    if (!subsidiaryPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateSubsidiary(subsidiaryPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/subsidiaries', subsidiaryPayload)
        .then((response) => {
          toast.success('created_subsidiary');

          refetch(['subsidiaries']);

          onCreatedSubsidiary?.(response.data.id);

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
        title={t('new_subsidiary')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-4 w-full">
          <SubsidiaryForm
            subsidiary={subsidiaryPayload}
            setSubsidiary={setSubsidiaryPayload}
            errors={errors}
            onlyFields
          />

          <Button
            type="primary"
            onClick={handleCreateSubsidiary}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/subsidiaries', 'selector']}
        label={label}
        placeholder={placeholder}
        valueKey="id"
        labelKey="name"
        endpoint="/api/subsidiaries?selector=true"
        enableByPermission={
          hasPermission('create_subsidiary') ||
          hasPermission('view_subsidiary') ||
          hasPermission('edit_subsidiary')
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
              {t('new_subsidiary')}
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

export default SubsidiariesSelector;
