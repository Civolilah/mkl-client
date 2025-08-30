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
  send_email?: boolean;
  supplier_portal_access?: boolean;
  has_password?: boolean;
};

export type Supplier = {
  id?: string;
  name: string;
  number?: string;
  id_number?: string;
  vat_number?: string;
  website?: string;
  phone?: string;
  routing_id?: string;
  address?: string;
  address2?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  contacts: SupplierContact[];
  currency_id?: string;
  language?: string;
  country_id?: string;
  custom_field1?: string;
  custom_field2?: string;
  custom_field3?: string;
  custom_field4?: string;
};
