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

import { Product, ValidationErrors } from '@interfaces/index';

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
  useTranslation,
} from '@hooks/index';

import ProductForm from '../common/components/ProductForm';
import { validateProduct } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('products'),
      href: '/products',
    },
    {
      title: t('edit_product'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const actions = useActions();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [initialResponse, setInitialResponse] = useState<Product | undefined>();

  const { refresh } = useFetchEntity<Product>({
    queryIdentifiers: ['/api/products'],
    endpoint: '/api/products',
    setEntity: setProduct,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_product') ||
      hasPermission('view_product') ||
      hasPermission('edit_product'),
  });

  const handleSave = async () => {
    if (!isLoading && id && product) {
      if (isEqual(initialResponse, product)) {
        toast.info('no_product_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateProduct(product);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/products/:id', { id }), product)
        .then(() => {
          toast.success('updated_product');
          setInitialResponse(cloneDeep(product));
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
      title: t('edit_product'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isLoading,
        isDisabled:
          isLoading ||
          !canEditEntity('edit_product', 'create_product', product),
        onClick: handleSave,
        disabledWithLoadingIcon: Boolean(isLoading && product),
        displayPermissionTooltip: !canEditEntity(
          'edit_product',
          'create_product',
          product
        ),
        tooltipPermissionMessage: t('no_permission_to_edit_product'),
      },
      actions: {
        list: product ? actions(product) : [],
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
            text="products"
            onClick={() => {
              navigate(route('/products'));
            }}
            iconName="product"
            disabled={isLoading}
            iconSize="1.05rem"
          />

          <FooterAction
            text="new_product"
            onClick={() => {
              navigate(route('/products/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
            visible={hasPermission('create_product')}
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
            iconSize="1.2rem"
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
    [product, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [product]);

  useEffect(() => {
    return () => {
      setErrors({});
      setProduct(undefined);
    };
  }, []);

  return (
    <ProductForm
      product={product}
      setProduct={setProduct}
      errors={errors}
      isLoading={isLoading && !product}
      onRefresh={refresh}
    />
  );
};

export default Edit;
