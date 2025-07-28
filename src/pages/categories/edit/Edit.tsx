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

import { Category, Subsidiary, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useTranslation,
} from '@hooks/index';

import CategoryForm from '../common/components/CategoryForm';
import { validateCategory } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('categories'),
      href: '/categories',
    },
    {
      title: t('edit_category'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Category | undefined
  >();

  const { refresh } = useFetchEntity<Subsidiary>({
    queryIdentifiers: ['/api/categories'],
    endpoint: '/api/categories',
    setEntity: setCategory,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_category') ||
      hasPermission('view_category') ||
      hasPermission('edit_category'),
  });

  const handleSave = async () => {
    if (!isLoading && id && category) {
      if (isEqual(initialResponse, category)) {
        toast.info('no_category_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateCategory(category);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/categories/:id', { id }), category)
        .then(() => {
          toast.success('updated_category');
          setInitialResponse(cloneDeep(category));
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
  }, [category]);

  useEffect(() => {
    return () => {
      setErrors({});
      setCategory(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_category')}
      breadcrumbs={breadcrumbs}
      actions={category ? actions(category) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading ||
        !canEditEntity('edit_category', 'create_category', category)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_category', 'create_category', category)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && category)}
      tooltipPermissionMessage={t('no_permission_to_edit_category')}
    >
      <CategoryForm
        category={category}
        setCategory={setCategory}
        errors={errors}
        editPage
        isLoading={isLoading && !category}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
