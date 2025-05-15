/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation } from '@hooks/index';

export type QuantityGroup = 'default' | 'color' | 'labels' | 'labels_and_color';

export type QuantityGroupOption = {
  label: string;
  value: QuantityGroup;
};

const useQuantityGroupOptions = () => {
  const t = useTranslation();

  const options: QuantityGroupOption[] = [
    { label: t('default'), value: 'default' },
    { label: t('color'), value: 'color' },
    { label: t('labels'), value: 'labels' },
    { label: t('labels_and_color'), value: 'labels_and_color' },
  ];

  return options;
};

export default useQuantityGroupOptions;
