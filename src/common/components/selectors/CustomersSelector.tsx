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

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, useToast } from '@helpers/index';

import CustomerForm from '@pages/customers/common/components/CustomerForm';
import { validateCustomer } from '@pages/customers/common/helpers/helpers';

import { Customer, ValidationErrors } from '@interfaces/index';

import { Box, Button, Modal } from '@components/index';
import SelectDataField, {
  Option,
} from '@components/input-fields/SelectDataField';

import {
  useHasPermission,
  useInitialCustomer,
  useRefetch,
  useTranslation,
} from '@hooks/index';

interface Props {
  label?: string;
  placeholder?: string;
  mode?: 'single' | 'multiple';
  value: string[];
  onChange: (value: string | string[]) => void;
  onClear?: () => void;
  errorMessage?: string;
  withActionButton?: boolean;
  additionalOptions?: Option[];
  withoutOptionalText?: boolean;
  afterSelectorLabel?: ReactNode;
  tooltipOverlayInnerStyle?: CSSProperties;
  onCreatedCustomer?: (customerId: string) => void;
  withRefreshButton?: boolean;
  disabled?: boolean;
}

const CustomersSelector = ({
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
  onCreatedCustomer,
  withRefreshButton,
  disabled,
}: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const refetch = useRefetch();
  const hasPermission = useHasPermission();
  const { INITIAL_CUSTOMER } = useInitialCustomer();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [customerPayload, setCustomerPayload] = useState<Customer | undefined>(
    INITIAL_CUSTOMER
  );

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCustomerPayload(INITIAL_CUSTOMER);
    setErrors({});
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateCustomer = async () => {
    if (!customerPayload) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateCustomer(customerPayload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/customers', customerPayload)
        .then((response) => {
          handleCloseModal();

          toast.success('created_customer');

          refetch(['customers']);

          onCreatedCustomer?.(response.data.id);
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
      setCustomerPayload(INITIAL_CUSTOMER);

      setTimeout(() => {
        const nameField = document.querySelector(
          '.customer-modal-name-field'
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
        title={t('new_customer')}
        visible={isModalOpen}
        onClose={handleCloseModal}
        disableClosing={isFormBusy}
        size="regular"
      >
        <Box className="flex flex-col space-y-6 w-full">
          <CustomerForm
            customer={customerPayload}
            setCustomer={setCustomerPayload}
            errors={errors}
            onMainFieldsEnterPress={handleCreateCustomer}
            onlyFields
            nameFieldDebounce={0}
          />

          <Button
            type="primary"
            onClick={handleCreateCustomer}
            disabled={isFormBusy || !customerPayload?.name}
            disabledWithLoadingIcon={isFormBusy}
            disablePreventAction
          >
            {t('done')}
          </Button>
        </Box>
      </Modal>

      <SelectDataField
        queryIdentifiers={['/api/customers', 'selector']}
        label={label}
        placeholder={placeholder}
        mode={mode}
        valueKey="id"
        labelKey="name"
        endpoint="/api/customers?selector=true"
        enableByPermission={
          hasPermission('create_customer') ||
          hasPermission('view_customer') ||
          hasPermission('edit_customer')
        }
        withoutRefreshData={!withRefreshButton}
        value={value}
        onChange={onChange}
        onClear={onClear}
        errorMessage={errorMessage}
        actionButton={
          withActionButton && hasPermission('create_customer') ? (
            <Button
              className="w-full"
              type="primary"
              onClick={() => setTimeout(handleOpenModal, 200)}
              disablePreventAction
            >
              {t('new_customer')}
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

export default CustomersSelector;
