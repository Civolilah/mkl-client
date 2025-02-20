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

import { Product, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useFetchEntity,
  useHasPermission,
  useTranslation,
} from '@hooks/index';

import ProductForm from '../common/components/ProductForm';
import { validateProduct } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

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
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>();
  const [initialResponse, setInitialResponse] = useState<Product | undefined>();

  const { refresh } = useFetchEntity<Product>({
    queryKey: '/api/products',
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
    <Default
      title={t('edit_product')}
      breadcrumbs={breadcrumbs}
      actions={product ? actions(product) : undefined}
      onSaveClick={handleSave}
      disabledSaveButton={
        isLoading || !canEditEntity('edit_product', 'create_product', product)
      }
      displayPermissionTooltip={
        !canEditEntity('edit_product', 'create_product', product)
      }
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && product)}
      tooltipPermissionMessage={t('no_permission_to_edit_product')}
    >
      <ProductForm
        product={product}
        setProduct={setProduct}
        errors={errors}
        editPage
        isLoading={isLoading && !product}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
