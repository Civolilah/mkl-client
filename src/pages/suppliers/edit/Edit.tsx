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

import { Supplier, ValidationErrors } from '@interfaces/index';

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
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import SupplierForm from '../common/components/SupplierForm';
import { validateSupplier } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('suppliers'),
      href: '/suppliers',
    },
    {
      title: t('edit_supplier'),
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
  const [supplier, setSupplier] = useState<Supplier | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Supplier | undefined
  >();

  const { refresh } = useFetchEntity<Supplier>({
    queryIdentifiers: ['/api/suppliers'],
    endpoint: '/api/suppliers',
    setEntity: setSupplier,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_supplier') ||
      hasPermission('view_supplier') ||
      hasPermission('edit_supplier'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && supplier) {
      if (isEqual(initialResponse, supplier)) {
        toast.info('no_supplier_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateSupplier(supplier);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/suppliers/:id', { id }), supplier)
        .then(() => {
          toast.success('updated_supplier');

          refetch(['suppliers']);
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
      title: t('edit_supplier'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading ||
          !canEditEntity('edit_supplier', 'create_supplier', supplier),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && supplier),
        displayPermissionTooltip: !canEditEntity(
          'edit_supplier',
          'create_supplier',
          supplier
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_supplier'),
      },
      actions: {
        list: supplier ? actions(supplier) : [],
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
            text="suppliers"
            onClick={() => {
              navigate(route('/suppliers'));
            }}
            iconName="truck"
            disabled={isLoading}
            iconSize="1.05rem"
          />

          <FooterAction
            text="new_supplier"
            onClick={() => {
              navigate(route('/suppliers/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_supplier')}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
            iconSize="1.2rem"
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => <ActionPopoverIcon isOpen={isOpen} />}
            disabled={isLoading}
            actions={supplier ? actions(supplier) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [supplier, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [supplier]);

  useEffect(() => {
    setSupplier(cloneDeep(initialResponse));
  }, [initialResponse]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSupplier(undefined);
    };
  }, []);

  return (
    <SupplierForm
      supplier={supplier}
      setSupplier={setSupplier}
      errors={errors}
      editPage
      isLoading={isLoading && !supplier}
      onRefresh={refresh}
    />
  );
};

export default Edit;
