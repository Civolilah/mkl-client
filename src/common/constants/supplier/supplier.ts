/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Supplier, SupplierContact } from '@interfaces/index';

export const BLANK_SUPPLIER_CONTACT: SupplierContact = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  add_to_purchase_orders: false,
};

export const INITIAL_SUPPLIER: Supplier = {
  name: '',
  contacts: [],
  currency_id: '',
};
