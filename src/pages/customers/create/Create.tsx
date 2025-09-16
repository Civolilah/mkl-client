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

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Customer, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  useInitialCustomer,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import CustomerForm from '../common/components/CustomerForm';
import { validateCustomer } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('customers'),
      href: '/customers',
    },
    {
      title: t('new_customer'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const { INITIAL_CUSTOMER } = useInitialCustomer();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>(
    INITIAL_CUSTOMER
  );

  const handleSave = async () => {
    if (!customer) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateCustomer(customer);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/customers', customer)
        .then((response) => {
          toast.success('created_customer');

          refetch(['customers']);

          navigate(route('/customers/:id/edit', { id: response.data.id }));
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

  usePageLayoutAndActions(
    {
      title: t('new_customer'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="customers"
            onClick={() => {
              navigate(route('/customers'));
            }}
            iconName="truck"
            disabled={isFormBusy}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [customer, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [customer]);

  useEffect(() => {
    return () => {
      setErrors({});
      setCustomer(INITIAL_CUSTOMER);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: INITIAL_CUSTOMER,
    currentEntityValue: customer,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isFormBusy || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isFormBusy || Object.keys(errors).length),
      onSaveClick: handleSave,
      onDiscardClick: () => setCustomer(INITIAL_CUSTOMER),
      changesLabel: 'unsaved_customer',
      visibleBox: true,
    },
    [customer, isFormBusy, handleSave]
  );

  return (
    <CustomerForm
      customer={customer}
      setCustomer={setCustomer}
      errors={errors}
    />
  );
};

export default Create;
