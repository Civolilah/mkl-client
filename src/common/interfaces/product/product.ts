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
  label_ids?: string[];
};

export type QuantityByVariant = {
  label_ids: string[];
  quantity: number;
  price: number;
  unlimited: boolean;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
  diameter?: number;
  supplier_id?: string;
};

export type StatusByQuantity = {
  status_id: string;
  quantity: number;
  label_ids: string[];
};

export type Product = {
  id?: string;
  name: string;
  product_key?: string;
  price_by_item?: number;
  inventory_group: string;
  inventory_by_variant?: InventoryByVariant[];
  is_status_by_quantity: boolean;
  status_by_quantity: StatusByQuantity[];
  description?: string;
  brand_id?: string;
  category_id?: string;
  status_id?: string;
  subsidiaries?: string[];
  quantity_by_variant?: QuantityByVariant[];
  default_image_id: number;
  supplier_id?: string;
  images?: File[];
  quantity?: number;
  price?: number;
  unlimited_quantity?: boolean;
};
