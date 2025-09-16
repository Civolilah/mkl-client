/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

export interface CustomerContact {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password?: string;
  add_to_invoice?: boolean;
  customer_portal_access?: boolean;
  has_password?: boolean;
}

export interface Customer {
  id?: string;
  name: string;
  number?: string;
  id_number?: string;
  vat_number?: string;
  website?: string;
  phone?: string;
  routing_id?: string;
  billing_address?: string;
  billing_address2?: string;
  billing_city?: string;
  billing_state?: string;
  billing_zip_code?: string;
  billing_country_id?: string;
  currency_id?: string;
  language?: string;
  contacts: CustomerContact[];
  custom_field1?: string;
  custom_field2?: string;
  custom_field3?: string;
  custom_field4?: string;
  shipping_address?: string;
  shipping_address2?: string;
  shipping_city?: string;
  shipping_state?: string;
  shipping_zip_code?: string;
  shipping_country_id?: string;
}
