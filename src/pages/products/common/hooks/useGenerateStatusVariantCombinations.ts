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

import { Product, StatusByQuantity } from '@interfaces/product/product';

const useGenerateStatusVariantCombinations = () => {
  return (variants: Product['inventory_by_variant']): StatusByQuantity[] => {
    if (!variants || variants.length === 0) return [];

    const variantOptionsWithLabels = variants
      .filter((variant) => variant.label_ids && variant.label_ids.length > 0)
      .map((variant) => ({
        categoryId: variant.label_category_id,
        labelIds: variant.label_ids || [],
      }));

    if (variantOptionsWithLabels.length === 0) return [];

    const combinations: StatusByQuantity[] = [];

    const generateCombos = (
      currentCombo: string[],
      remainingVariants: typeof variantOptionsWithLabels
    ) => {
      if (remainingVariants.length === 0) {
        combinations.push({
          label_ids: cloneDeep(currentCombo),
          quantity: 1,
          status_id: '',
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

export default useGenerateStatusVariantCombinations;
