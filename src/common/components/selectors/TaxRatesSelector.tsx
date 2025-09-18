/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode, useEffect, useState } from 'react';

import {
  INITIAL_TAX_RATE,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, useToast } from '@helpers/index';

import TaxRateForm from '@pages/tax-rates/common/components/TaxRateForm';
import { validateTaxRate } from '@pages/tax-rates/common/helpers/helpers';

import { TaxRate, ValidationErrors } from '@interfaces/index';

import { Box, Button, Modal } from '@components/index';
import SelectDataField, {
  Option,
} from '@components/input-fields/SelectDataField';

import { useHasPermission, useRefetch, useTranslation } from '@hooks/index';

interface Props {
  mode?: 'single' | 'multiple';
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
  onCreatedTaxRate?: (taxRateId: string) => void;
  withRefreshButton?: boolean;
  disabled?: boolean;
}

const TaxRatesSelector = ({
  mode = 'single',
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
  onCreatedTaxRate,
  withRefreshButton,
  disabled,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taxRatePayload, setTaxRatePayload] = useState<TaxRate | undefined>(
    INITIAL_TAX_RATE
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaxRatePayload(INITIAL_TAX_RATE);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateTaxRate = async () => {
    if (!taxRatePayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateTaxRate(taxRatePayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/tax_rates', taxRatePayload)
        .then((response) => {
          handleCloseModal();

          toast.success('created_tax_rate');

          refetch(['tax_rates']);

          onCreatedTaxRate?.(response.data.id);
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
    if (isModalOpen) {
      setErrors({});
      setTaxRatePayload(INITIAL_TAX_RATE);

      setTimeout(() => {
        const nameField = document.querySelector(
          '.tax-rate-modal-name-field'
        ) as HTMLInputElement | null;

        if (nameField) {
          nameField.focus();
        }
      }, 150);
    }
  }, [isModalOpen]);

  return (
    <>
      <Modal
        title={t('new_tax_rate')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-6 w-full">
          <TaxRateForm
            taxRate={taxRatePayload}
            setTaxRate={setTaxRatePayload}
            errors={errors}
            onMainFieldsEnterPress={handleCreateTaxRate}
            onlyFields
            nameFieldDebounce={0}
          />

          <Button
            type="primary"
            onClick={handleCreateTaxRate}
            disabled={isFormBusy || !taxRatePayload?.name}
            disabledWithLoadingIcon={isFormBusy}
            disablePreventAction
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/tax_rates', 'selector']}
        label={label}
        placeholder={placeholder}
        mode={mode}
        valueKey="id"
        labelKey="name"
        endpoint="/api/tax_rates?selector=true"
        enableByPermission={
          hasPermission('create_tax_rate') ||
          hasPermission('view_tax_rate') ||
          hasPermission('edit_tax_rate')
        }
        withoutRefreshData={!withRefreshButton}
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton && hasPermission('create_tax_rate') ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() => setTimeout(handleOpenModal, 200)}
              disablePreventAction
            >
              {t('new_tax_rate')}
            </Button>
          ) : undefined
        }
        additionalOptions={additionalOptions}
        withoutOptionalText={withoutOptionalText}
        afterLabel={afterSelectorLabel}
        tooltipOverlayInnerStyle={tooltipOverlayInnerStyle}
        disabled={disabled}
      />
    </>
  );
};

export default TaxRatesSelector;
