/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Product } from '@interfaces/index';

import { useTranslation } from '@hooks/index';

export type QuantityGroup =
  | 'default'
  | 'default_and_subsidiaries'
  | 'default_and_warehouses'
  | 'default_and_suppliers'
  | 'default_and_subsidiaries_and_warehouses'
  | 'default_and_subsidiaries_and_suppliers'
  | 'default_and_warehouses_and_suppliers'
  | 'default_and_subsidiaries_and_warehouses_and_suppliers'
  | 'variants'
  | 'variants_and_subsidiaries'
  | 'variants_and_warehouses'
  | 'variants_and_suppliers'
  | 'variants_and_subsidiaries_and_warehouses'
  | 'variants_and_subsidiaries_and_suppliers'
  | 'variants_and_warehouses_and_suppliers'
  | 'variants_and_subsidiaries_and_warehouses_and_suppliers';

export type QuantityGroupOption = {
  label: string;
  value: QuantityGroup;
};

type Params = {
  product: Product | undefined;
};

const useInventoryGroupOptions = ({ product }: Params) => {
  const t = useTranslation();

  const hasSubsidiaries =
    product?.subsidiaries_ids && product?.subsidiaries_ids.length > 0;
  const hasWarehouses =
    product?.warehouses_ids && product?.warehouses_ids.length > 0;
  const hasSuppliers =
    (product?.suppliers_ids && product?.suppliers_ids.length > 0) ||
    (product?.supplier_ids && product?.supplier_ids.length > 0);

  const allOptions: QuantityGroupOption[] = [
    { label: t('default'), value: 'default' },
    { label: t('variants'), value: 'variants' },
    { label: t('default_and_subsidiaries'), value: 'default_and_subsidiaries' },
    { label: t('default_and_warehouses'), value: 'default_and_warehouses' },
    { label: t('default_and_suppliers'), value: 'default_and_suppliers' },
    {
      label: t('default_and_subsidiaries_and_warehouses'),
      value: 'default_and_subsidiaries_and_warehouses',
    },
    {
      label: t('default_and_subsidiaries_and_suppliers'),
      value: 'default_and_subsidiaries_and_suppliers',
    },
    {
      label: t('default_and_warehouses_and_suppliers'),
      value: 'default_and_warehouses_and_suppliers',
    },
    {
      label: t('default_and_subsidiaries_and_warehouses_and_suppliers'),
      value: 'default_and_subsidiaries_and_warehouses_and_suppliers',
    },
    {
      label: t('variants_and_subsidiaries'),
      value: 'variants_and_subsidiaries',
    },
    { label: t('variants_and_warehouses'), value: 'variants_and_warehouses' },
    { label: t('variants_and_suppliers'), value: 'variants_and_suppliers' },
    {
      label: t('variants_and_subsidiaries_and_warehouses'),
      value: 'variants_and_subsidiaries_and_warehouses',
    },
    {
      label: t('variants_and_subsidiaries_and_suppliers'),
      value: 'variants_and_subsidiaries_and_suppliers',
    },
    {
      label: t('variants_and_warehouses_and_suppliers'),
      value: 'variants_and_warehouses_and_suppliers',
    },
    {
      label: t('variants_and_subsidiaries_and_warehouses_and_suppliers'),
      value: 'variants_and_subsidiaries_and_warehouses_and_suppliers',
    },
  ];

  const options = allOptions.filter((option) => {
    const value = option.value;

    const requiresSubsidiaries = value.includes('subsidiaries');
    if (requiresSubsidiaries && !hasSubsidiaries) return false;

    const requiresWarehouses = value.includes('warehouses');
    if (requiresWarehouses && !hasWarehouses) return false;

    const requiresSuppliers = value.includes('suppliers');
    if (requiresSuppliers && !hasSuppliers) return false;

    return true;
  });

  return options;
};

export default useInventoryGroupOptions;
