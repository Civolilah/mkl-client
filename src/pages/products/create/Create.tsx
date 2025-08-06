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
import { cloneDeep, isEqual } from 'lodash';
import { useNavigate } from 'react-router-dom';

import {
  Product,
  QuantityByVariant,
  ValidationErrors,
} from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import ProductForm from '../common/components/ProductForm';
import { validateProduct } from '../common/helpers/helpers';
import useGenerateStatusVariantCombinations from '../common/hooks/useGenerateStatusVariantCombinations';
import useGenerateVariantCombinations from '../common/hooks/useGenerateVariantCombinations';

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
  const generateVariantCombinations = useGenerateVariantCombinations();
  const generateStatusVariantCombinations =
    useGenerateStatusVariantCombinations();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [currentImages, setCurrentImages] = useState<string[]>([]);
  const [product, setProduct] = useState<Product | undefined>(INITIAL_PRODUCT);
  const [quantityByVariants, setQuantityByVariants] = useState<
    QuantityByVariant[]
  >([]);
  const [lastInventoriesByVariant, setLastInventoriesByVariant] = useState<
    Product['inventory_by_variant']
  >(product?.inventory_by_variant || []);

  const cleanupPayload = (currentProduct: Product) => {
    return {
      ...currentProduct,
      images: currentImages.map((image) => image),
    };
  };

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

      request('POST', '/api/products', cleanupPayload(product))
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
    if (
      product?.inventory_by_variant &&
      !isEqual(product.inventory_by_variant, lastInventoriesByVariant)
    ) {
      setLastInventoriesByVariant(cloneDeep(product.inventory_by_variant));

      setQuantityByVariants(
        generateVariantCombinations(product.inventory_by_variant)
      );

      const statusByQuantity = generateStatusVariantCombinations(
        product.inventory_by_variant
      );

      setProduct(
        (currentProduct) =>
          currentProduct && {
            ...currentProduct,
            status_by_quantity: statusByQuantity,
          }
      );
    }
  }, [product?.inventory_by_variant]);

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
        quantityByVariants={quantityByVariants}
        setQuantityByVariants={setQuantityByVariants}
        setCurrentImages={setCurrentImages}
        currentImages={currentImages}
      />
    </Default>
  );
};

export default Create;
