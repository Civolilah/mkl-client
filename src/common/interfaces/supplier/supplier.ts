/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

export type SupplierContact = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  add_to_purchase_orders?: boolean;
};

export type Supplier = {
  id?: string;
  name: string;
  contacts: SupplierContact[];
  currency_id?: string;
  country_id?: string;
};
