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
import { endpoint, request, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useParams } from 'react-router-dom';

import { ValidationErrors, Warehouse } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import WarehouseForm from '../common/components/WarehouseForm';
import { validateWarehouse } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

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

  const actions = useActions();
  const refetch = useRefetch();
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

  return (
    <Default
      title={t('edit_warehouse')}
      breadcrumbs={breadcrumbs}
      actions={warehouse ? actions(warehouse) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading ||
        !canEditEntity('edit_warehouse', 'create_warehouse', warehouse)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_warehouse', 'create_warehouse', warehouse)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && warehouse)}
      tooltipPermissionMessage={t('no_permission_to_edit_warehouse')}
    >
      <WarehouseForm
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        errors={errors}
        editPage
        isLoading={isLoading && !warehouse}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
