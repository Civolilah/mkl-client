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

const useGenerateVariantCombinations = () => {
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
      currentCombo: Array<{ categoryId: string; labelId: string }>,
      remainingVariants: typeof variantOptionsWithLabels
    ) => {
      if (remainingVariants.length === 0) {
        combinations.push({
          labels: cloneDeep(currentCombo),
          quantity: 1,
          price: 0,
          unlimited: false,
          weight: undefined,
          height: undefined,
          width: undefined,
          length: undefined,
          diameter: undefined,
          supplier_id: undefined,
        });

        return;
      }

      const [currentVariant, ...rest] = remainingVariants;
      currentVariant.labelIds.forEach((labelId) => {
        generateCombos(
          [
            ...currentCombo,
            { categoryId: currentVariant.categoryId as string, labelId },
          ],
          rest
        );
      });
    };

    generateCombos([], variantOptionsWithLabels);

    return combinations;
  };
};

export default useGenerateVariantCombinations;
