/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { QuantityByGroup } from '@interfaces/product/product';

import { useAccentColor } from '@hooks/index';

import { QuantityGroup } from './useQuantityGroupOptions';

const useBlankQuantityByGroup = () => {
  const accentColor = useAccentColor();

  const blankQuantityByGroup: Record<QuantityGroup, QuantityByGroup[]> = {
    default: [],
    color: [{ color: accentColor, quantity: 1 }],
    labels: [{ quantity: 1, label_ids: [] }],
    labels_and_color: [
      {
        label_ids: [],
        quantity_by_color: [{ color: accentColor, quantity: 1 }],
      },
    ],
  };

  return blankQuantityByGroup;
};

export default useBlankQuantityByGroup;
