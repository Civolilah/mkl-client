/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

type QuantityByColor = {
  color: string;
  quantity: number;
};

type QuantityByVariant = {
  variant: string;
  quantity: number;
};

export type QuantityByGroup = {
  color?: string;
  quantity?: number;
  label_id?: string;
  quantity_by_color?: QuantityByColor[] | undefined;
  label_and_variant?: QuantityByVariant[] | undefined;
};

export type Product = {
  id?: string;
  name: string;
  quantity?: number;
  price?: number;
  quantity_group: string;
  quantity_by_group: QuantityByGroup[];
  is_status_by_quantity: boolean;
  status_by_quantity: string;
  description?: string;
  brand_id?: string;
};
