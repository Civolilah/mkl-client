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

export type QuantityGroup =
  | 'default'
  | 'default_and_subsidiaries'
  | 'default_and_warehouses'
  | 'default_and_subsidiaries_and_warehouses'
  | 'variants_and_subsidiaries'
  | 'variants_and_warehouses'
  | 'variants_and_subsidiaries_and_warehouses'
  | 'variants';

export type QuantityGroupOption = {
  label: string;
  value: QuantityGroup;
};

const useInventoryGroupOptions = () => {
  const t = useTranslation();

  const options: QuantityGroupOption[] = [
    { label: t('default'), value: 'default' },
    { label: t('variants'), value: 'variants' },
    { label: t('default_and_subsidiaries'), value: 'default_and_subsidiaries' },
    { label: t('default_and_warehouses'), value: 'default_and_warehouses' },
    {
      label: t('default_and_subsidiaries_and_warehouses'),
      value: 'default_and_subsidiaries_and_warehouses',
    },
    {
      label: t('variants_and_subsidiaries'),
      value: 'variants_and_subsidiaries',
    },
    { label: t('variants_and_warehouses'), value: 'variants_and_warehouses' },
    {
      label: t('variants_and_subsidiaries_and_warehouses'),
      value: 'variants_and_subsidiaries_and_warehouses',
    },
  ];

  return options;
};

export default useInventoryGroupOptions;
