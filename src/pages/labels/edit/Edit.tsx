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

import { Label, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import LabelForm from '../common/components/LabelForm';
import { validateLabel } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('labels'),
      href: '/labels',
    },
    {
      title: t('edit_label'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const refetch = useRefetch();
  const actions = useActions();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [label, setLabel] = useState<Label | undefined>();
  const [initialResponse, setInitialResponse] = useState<Label | undefined>();

  const { refresh } = useFetchEntity<Label>({
    queryIdentifiers: ['/api/labels'],
    endpoint: '/api/labels',
    setEntity: setLabel,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_label') ||
      hasPermission('view_label') ||
      hasPermission('edit_label'),
  });

  const handleSave = async () => {
    if (!isLoading && id && label) {
      if (isEqual(initialResponse, label)) {
        toast.info('no_label_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateLabel(label);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/labels/:id', { id }), label)
        .then(() => {
          toast.success('updated_label');

          refetch(['labels']);

          setInitialResponse(cloneDeep(label));
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
  }, [label]);

  useEffect(() => {
    return () => {
      setErrors({});
      setLabel(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_label')}
      breadcrumbs={breadcrumbs}
      actions={label ? actions(label) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading || !canEditEntity('edit_label', 'create_label', label)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_label', 'create_label', label)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && label)}
      tooltipPermissionMessage={t('no_permission_to_edit_label')}
    >
      <LabelForm
        label={label}
        setLabel={setLabel}
        errors={errors}
        editPage
        isLoading={isLoading && !label}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
