/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { cloneDeep } from 'lodash';

import { Product, QuantityByVariant } from '@interfaces/product/product';

interface Params {
  product?: Product;
}

const useGenerateVariantCombinations = ({ product }: Params = {}) => {
  const getVariantIndex = (labelIds: string[]) => {
    console.log(product?.quantity_by_variant);

    return (
      product?.quantity_by_variant?.findIndex((variant) =>
        variant.label_ids.every((currentLabelId) =>
          labelIds.some((passedLabelId) => passedLabelId === currentLabelId)
        )
      ) || -1
    );
  };

  return (variants: Product['inventory_by_variant']): QuantityByVariant[] => {
    if (!variants || variants.length === 0) return [];

    const variantOptionsWithLabels = variants
      .filter((variant) => variant.label_ids && variant.label_ids.length > 0)
      .map((variant) => ({
        categoryId: variant.label_category_id,
        labelIds: variant.label_ids || [],
      }));

    if (variantOptionsWithLabels.length === 0) return [];

    const combinations: QuantityByVariant[] = [];

    const generateCombos = (
      currentCombo: string[],
      remainingVariants: typeof variantOptionsWithLabels
    ) => {
      if (remainingVariants.length === 0) {
        const addedVariantIndex =
          getVariantIndex(currentCombo) > -1
            ? getVariantIndex(currentCombo)
            : undefined;

        combinations.push({
          label_ids: cloneDeep(currentCombo),
          quantity: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.quantity || 0
            : 0,
          price: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.price || 0
            : 0,
          unlimited: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.unlimited ||
              false
            : false,
          weight: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.weight ||
              undefined
            : undefined,
          height: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.height ||
              undefined
            : undefined,
          width: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.width ||
              undefined
            : undefined,
          length: undefined,
          diameter: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.diameter ||
              undefined
            : undefined,
          supplier_id: addedVariantIndex
            ? product?.quantity_by_variant?.[addedVariantIndex]?.supplier_id ||
              undefined
            : undefined,
        });

        return;
      }

      const [currentVariant, ...rest] = remainingVariants;
      currentVariant.labelIds.forEach((labelId) => {
        generateCombos([...currentCombo, labelId], rest);
      });
    };

    generateCombos([], variantOptionsWithLabels);

    return combinations;
  };
};

export default useGenerateVariantCombinations;
