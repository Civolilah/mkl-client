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

export const INITIAL_PRODUCT: Product = {
  name: '',
  inventory_group: 'default',
  inventory_by_variant: [],
  is_status_by_quantity: false,
  status_by_quantity: [],
  unlimited_default_quantity: false,
  quantity_by_variant: [],
  default_image_id: 0,
};
