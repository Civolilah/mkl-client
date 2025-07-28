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

import { Supplier, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useTranslation,
} from '@hooks/index';

import SupplierForm from '../common/components/SupplierForm';
import { validateSupplier } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

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

  const actions = useActions();
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
          setInitialResponse(cloneDeep(supplier));
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
  }, [supplier]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSupplier(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_supplier')}
      breadcrumbs={breadcrumbs}
      actions={supplier ? actions(supplier) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading ||
        !canEditEntity('edit_supplier', 'create_supplier', supplier)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_supplier', 'create_supplier', supplier)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && supplier)}
      tooltipPermissionMessage={t('no_permission_to_edit_supplier')}
    >
      <SupplierForm
        supplier={supplier}
        setSupplier={setSupplier}
        errors={errors}
        editPage
        isLoading={isLoading && !supplier}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
