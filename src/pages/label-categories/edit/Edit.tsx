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

import { LabelCategory, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import LabelCategoryForm from '../common/components/LabelCategoryForm';
import { validateLabelCategory } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('label_categories'),
      href: '/label_categories',
    },
    {
      title: t('edit_label_category'),
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
  const [labelCategory, setLabelCategory] = useState<
    LabelCategory | undefined
  >();
  const [initialResponse, setInitialResponse] = useState<
    LabelCategory | undefined
  >();

  const { refresh } = useFetchEntity<LabelCategory>({
    queryIdentifiers: ['/api/label_categories'],
    endpoint: '/api/label_categories',
    setEntity: setLabelCategory,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_label_category') ||
      hasPermission('view_label_category') ||
      hasPermission('edit_label_category'),
  });

  const handleSave = async () => {
    if (!isLoading && id && labelCategory) {
      if (isEqual(initialResponse, labelCategory)) {
        toast.info('no_label_category_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateLabelCategory(labelCategory);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request(
        'PATCH',
        endpoint('/api/label_categories/:id', { id }),
        labelCategory
      )
        .then(() => {
          toast.success('updated_label_category');

          refetch(['label_categories']);

          setInitialResponse(cloneDeep(labelCategory));
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
  }, [labelCategory]);

  useEffect(() => {
    return () => {
      setErrors({});
      setLabelCategory(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_label_category')}
      breadcrumbs={breadcrumbs}
      actions={labelCategory ? actions(labelCategory) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading ||
        !canEditEntity(
          'edit_label_category',
          'create_label_category',
          labelCategory
        )
      }
      displayPermissionTooltip={
        !canEditEntity(
          'edit_label_category',
          'create_label_category',
          labelCategory
        )
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && labelCategory)}
      tooltipPermissionMessage={t('no_permission_to_edit_label_category')}
    >
      <LabelCategoryForm
        labelCategory={labelCategory}
        setLabelCategory={setLabelCategory}
        errors={errors}
        editPage
        isLoading={isLoading && !labelCategory}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
