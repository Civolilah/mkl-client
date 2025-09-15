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

import { ValidationErrors, Warehouse } from '@interfaces/index';

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
  useMobileActions,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import WarehouseForm from '../common/components/WarehouseForm';
import { validateWarehouse } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('warehouses'),
      href: '/warehouses',
    },
    {
      title: t('edit_warehouse'),
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
  const [warehouse, setWarehouse] = useState<Warehouse | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Warehouse | undefined
  >();

  const { refresh } = useFetchEntity<Warehouse>({
    queryIdentifiers: ['/api/warehouses'],
    endpoint: '/api/warehouses',
    setEntity: setWarehouse,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_warehouse') ||
      hasPermission('view_warehouse') ||
      hasPermission('edit_warehouse'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && warehouse) {
      if (isEqual(initialResponse, warehouse)) {
        toast.info('no_warehouse_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateWarehouse(warehouse);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/warehouses/:id', { id }), warehouse)
        .then(() => {
          toast.success('updated_warehouse');

          refetch(['warehouses']);

          setInitialResponse(cloneDeep(warehouse));
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
      title: t('edit_warehouse'),
      breadcrumbs: {
        breadcrumbs,
      },
      actions: {
        list: warehouse ? actions(warehouse) : [],
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
            text="warehouses"
            onClick={() => {
              navigate(route('/warehouses'));
            }}
            iconName="warehouse"
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
            actions={warehouse ? actions(warehouse) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [warehouse, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [warehouse]);

  useEffect(() => {
    return () => {
      setErrors({});
      setWarehouse(undefined);
    };
  }, []);

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isLoading || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isLoading || Object.keys(errors).length),
      disabledWithLoadingIcon: Boolean(isLoading && warehouse),
      onSaveClick: handleSave,
      onDiscardClick: () => setWarehouse(initialResponse),
      changesLabel: 'unsaved_warehouse',
      hideBox: !canEditEntity('edit_warehouse', 'create_warehouse', warehouse),
    },
    [warehouse, isLoading, handleSave]
  );

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/warehouses/new')),
        visible: hasPermission('create_warehouse'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <WarehouseForm
      warehouse={warehouse}
      setWarehouse={setWarehouse}
      errors={errors}
      isLoading={isLoading && !warehouse}
    />
  );
};

export default Edit;
