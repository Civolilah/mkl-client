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

import { Status, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useTranslation,
} from '@hooks/index';

import Form from '../common/components/Form';
import { validateStatus } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('statuses'),
      href: '/statuses',
    },
    {
      title: t('edit_status'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<Status | undefined>();
  const [initialResponse, setInitialResponse] = useState<Status | undefined>();

  const { refresh } = useFetchEntity<Status>({
    queryKey: '/api/statuses',
    setEntity: setStatus,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_status') ||
      hasPermission('view_status') ||
      hasPermission('edit_status'),
  });

  const handleSave = async () => {
    if (!isLoading && id && status) {
      if (isEqual(initialResponse, status)) {
        toast.info('no_status_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateStatus(status);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/statuses/:id', { id }), status)
        .then(() => {
          toast.success('updated_status');
          setInitialResponse(cloneDeep(status));
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
  }, [status]);

  useEffect(() => {
    return () => {
      setErrors({});
      setStatus(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_status')}
      breadcrumbs={breadcrumbs}
      actions={status ? actions(status) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading || !canEditEntity('edit_status', 'create_status', status)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_status', 'create_status', status)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && status)}
      tooltipPermissionMessage={t('no_permission_to_edit_status')}
    >
      <Form
        status={status}
        setStatus={setStatus}
        errors={errors}
        editPage
        isLoading={isLoading && !status}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
