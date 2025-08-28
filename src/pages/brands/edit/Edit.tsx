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

import { Brand, ValidationErrors } from '@interfaces/index';

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

import BrandForm from '../common/components/BrandForm';
import { validateBrand } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('brands'),
      href: '/brands',
    },
    {
      title: t('edit_brand'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [brand, setBrand] = useState<Brand | undefined>();
  const [initialResponse, setInitialResponse] = useState<Brand | undefined>();

  const { refresh } = useFetchEntity<Brand>({
    queryIdentifiers: ['/api/brands'],
    endpoint: '/api/brands',
    setEntity: setBrand,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_brand') ||
      hasPermission('view_brand') ||
      hasPermission('edit_brand'),
  });

  const handleSave = async () => {
    if (!isLoading && id && brand) {
      if (isEqual(initialResponse, brand)) {
        toast.info('no_brand_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateBrand(brand);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/brands/:id', { id }), brand)
        .then(() => {
          toast.success('updated_brand');

          refetch(['brands']);

          setInitialResponse(cloneDeep(brand));
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
      title: t('edit_brand'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading || !canEditEntity('edit_brand', 'create_brand', brand),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && brand),
        displayPermissionTooltip: !canEditEntity(
          'edit_brand',
          'create_brand',
          brand
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_brand'),
      },
      actions: {
        list: brand ? actions(brand) : [],
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
            text="brands"
            onClick={() => {
              navigate(route('/brands'));
            }}
            iconName="brand"
            disabled={isLoading}
            iconSize="1.05rem"
          />

          <FooterAction
            text="new_brand"
            onClick={() => {
              navigate(route('/brands/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_brand')}
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
    [brand, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [brand]);

  useEffect(() => {
    return () => {
      setErrors({});
      setBrand(undefined);
    };
  }, []);

  return (
    <BrandForm
      brand={brand}
      setBrand={setBrand}
      errors={errors}
      editPage
      isLoading={isLoading && !brand}
      onRefresh={refresh}
    />
  );
};

export default Edit;
