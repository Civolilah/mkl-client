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

export type QuantityByGroup = {
  color?: string;
  quantity?: number;
  label_ids?: string[];
  quantity_by_color?: QuantityByColor[] | undefined;
};

export type Product = {
  id?: string;
  name: string;
  product_key?: string;
  price_by_item?: number;
  quantity_group: string;
  quantity_by_group: QuantityByGroup[];
  is_status_by_quantity: boolean;
  status_by_quantity: string;
  description?: string;
  brand_id?: string;
  category_id?: string;
  status_id?: string;
  subsidiaries?: string[];
};
