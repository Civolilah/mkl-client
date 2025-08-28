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

import { Category, Subsidiary, ValidationErrors } from '@interfaces/index';

import {
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

import CategoryForm from '../common/components/CategoryForm';
import { validateCategory } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

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

  const refetch = useRefetch();
  const actions = useActions();
  const navigate = useNavigate();
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

          refetch(['categories']);
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
      title: t('edit_category'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading ||
          !canEditEntity('edit_category', 'create_category', category),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && category),
        displayPermissionTooltip: !canEditEntity(
          'edit_category',
          'create_category',
          category
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_category'),
      },
      actions: {
        list: category ? actions(category) : [],
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
            text="categories"
            onClick={() => {
              navigate(route('/categories'));
            }}
            iconName="category"
            disabled={isLoading}
            iconSize="1.05rem"
          />

          <FooterAction
            text="new_category"
            onClick={() => {
              navigate(route('/categories/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_category')}
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [category, isLoading, handleSave]
  );

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
    <CategoryForm
      category={category}
      setCategory={setCategory}
      errors={errors}
      isLoading={isLoading && !category}
    />
  );
};

export default Edit;
