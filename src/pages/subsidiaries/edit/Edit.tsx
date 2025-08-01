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

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';
import { validateSubsidiary } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('subsidiaries'),
      href: '/subsidiaries',
    },
    {
      title: t('edit_subsidiary'),
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
  const [subsidiary, setSubsidiary] = useState<Subsidiary | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Subsidiary | undefined
  >();

  const { refresh } = useFetchEntity<Subsidiary>({
    queryIdentifiers: ['/api/subsidiaries'],
    endpoint: '/api/subsidiaries',
    setEntity: setSubsidiary,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_subsidiary') ||
      hasPermission('view_subsidiary') ||
      hasPermission('edit_subsidiary'),
  });

  const handleSave = async () => {
    if (!isLoading && id && subsidiary) {
      if (isEqual(initialResponse, subsidiary)) {
        toast.info('no_subsidiary_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateSubsidiary(subsidiary);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/subsidiaries/:id', { id }), subsidiary)
        .then(() => {
          toast.success('updated_subsidiary');

          refetch(['subsidiaries']);

          setInitialResponse(cloneDeep(subsidiary));
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
  }, [subsidiary]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSubsidiary(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_subsidiary')}
      breadcrumbs={breadcrumbs}
      actions={subsidiary ? actions(subsidiary) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading ||
        !canEditEntity('edit_subsidiary', 'create_subsidiary', subsidiary)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_subsidiary', 'create_subsidiary', subsidiary)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && subsidiary)}
      tooltipPermissionMessage={t('no_permission_to_edit_subsidiary')}
    >
      <SubsidiaryForm
        subsidiary={subsidiary}
        setSubsidiary={setSubsidiary}
        errors={errors}
        editPage
        isLoading={isLoading && !subsidiary}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
