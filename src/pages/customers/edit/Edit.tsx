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
import { endpoint, request, route, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

import { Customer, ValidationErrors } from '@interfaces/index';

import {
  ActionPopoverIcon,
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useDetectChanges,
  useFetchEntity,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import CustomerForm from '../common/components/CustomerForm';
import { validateCustomer } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('customers'),
      href: '/customers',
    },
    {
      title: t('edit_customer'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Customer | undefined
  >();

  const { refresh } = useFetchEntity<Customer>({
    queryIdentifiers: ['/api/customers'],
    endpoint: '/api/customers',
    setEntity: setCustomer,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_customer') ||
      hasPermission('view_customer') ||
      hasPermission('edit_customer'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && customer) {
      if (isEqual(initialResponse, customer)) {
        toast.info('no_customer_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateCustomer(customer);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/customers/:id', { id }), customer)
        .then(() => {
          toast.success('updated_customer');

          refetch(['customers']);
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  usePageLayoutAndActions(
    {
      title: t('edit_customer'),
      breadcrumbs: {
        breadcrumbs,
      },
      actions: {
        list: customer ? actions(customer) : [],
      },
      footer: isLargeScreen ? (
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      ) : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="customers"
            onClick={() => {
              navigate(route('/customers'));
            }}
            iconName="truck"
            disabled={isLoading}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => <ActionPopoverIcon isOpen={isOpen} />}
            disabled={isLoading}
            actions={customer ? actions(customer) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [customer, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [customer]);

  useEffect(() => {
    setCustomer(cloneDeep(initialResponse));
  }, [initialResponse]);

  useEffect(() => {
    return () => {
      setErrors({});
      setCustomer(undefined);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: initialResponse,
    currentEntityValue: customer,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isLoading || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isLoading || Object.keys(errors).length),
      disabledWithLoadingIcon: Boolean(isLoading && customer),
      onSaveClick: handleSave,
      onDiscardClick: () => setCustomer(initialResponse),
      changesLabel: 'unsaved_customer',
      hideBox: !canEditEntity('edit_customer', 'create_customer', customer),
    },
    [customer, isLoading, handleSave]
  );

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/customers/new')),
        visible: hasPermission('create_customer'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <CustomerForm
      customer={customer}
      setCustomer={setCustomer}
      errors={errors}
      editPage
      isLoading={isLoading && !customer}
      onRefresh={refresh}
    />
  );
};

export default Edit;
