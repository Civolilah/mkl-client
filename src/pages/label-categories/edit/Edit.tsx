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

import { LabelCategory, ValidationErrors } from '@interfaces/index';

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

import LabelCategoryForm from '../common/components/LabelCategoryForm';
import { validateLabelCategory } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

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

  const refetch = useRefetch();
  const navigate = useNavigate();
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

  const actions = useActions({ refresh });

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

  usePageLayoutAndActions(
    {
      title: t('edit_label_category'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading ||
          !canEditEntity(
            'edit_label_category',
            'create_label_category',
            labelCategory
          ),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && labelCategory),
        displayPermissionTooltip: !canEditEntity(
          'edit_label_category',
          'create_label_category',
          labelCategory
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_label_category'),
      },
      actions: {
        list: labelCategory ? actions(labelCategory) : [],
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
            text="label_categories"
            onClick={() => {
              navigate(route('/label_categories'));
            }}
            iconName="tags"
            disabled={isLoading}
            iconSize="1.2rem"
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
            actions={labelCategory ? actions(labelCategory) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [labelCategory, isLoading, handleSave]
  );

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
    <LabelCategoryForm
      labelCategory={labelCategory}
      setLabelCategory={setLabelCategory}
      errors={errors}
      editPage
      isLoading={isLoading && !labelCategory}
      onRefresh={refresh}
    />
  );
};

export default Edit;
