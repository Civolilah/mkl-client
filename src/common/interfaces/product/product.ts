/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

export type InventoryByVariant = {
  label_category_id?: string;
  quantity?: number;
  label_ids?: string[];
  price: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
};

export type Product = {
  id?: string;
  name: string;
  product_key?: string;
  price_by_item?: number;
  inventory_group: string;
  inventory_by_variant: InventoryByVariant[];
  is_status_by_quantity: boolean;
  status_by_quantity: string;
  description?: string;
  brand_id?: string;
  category_id?: string;
  status_id?: string;
  subsidiaries?: string[];
  unlimited_default_quantity: boolean;
};
