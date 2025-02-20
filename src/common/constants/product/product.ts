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
  quantity_group: 'default',
  quantity_by_group: [],
  is_status_by_quantity: false,
  status_by_quantity: '',
};
