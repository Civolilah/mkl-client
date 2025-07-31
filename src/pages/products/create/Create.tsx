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

import {
  INITIAL_PRODUCT,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { Product, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import ProductForm from '../common/components/ProductForm';
import { validateProduct } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('products'),
      href: '/products',
    },
    {
      title: t('new_product'),
    },
  ];

  const toast = useToast();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [product, setProduct] = useState<Product | undefined>(INITIAL_PRODUCT);

  const handleSave = async () => {
    if (!product) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateProduct(product);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/products', product)
        .then((response) => {
          toast.success('created_product');

          navigate(route('/products/:id/edit', { id: response.data.id }));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
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
      setProduct(INITIAL_PRODUCT);
    };
  }, []);

  return (
    <Default
      title={t('new_product')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <ProductForm
        product={product}
        setProduct={setProduct}
        errors={errors}
        isLoading={isFormBusy}
      />
    </Default>
  );
};

export default Create;
