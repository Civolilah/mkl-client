/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { v4 } from 'uuid';

import { Customer, CustomerContact } from '@interfaces/index';

export const BLANK_CUSTOMER_CONTACT: CustomerContact = {
  id: v4(),
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  add_to_invoice: false,
  customer_portal_access: false,
};

export const INITIAL_CUSTOMER: Customer = {
  name: '',
  number: '',
  id_number: '',
  vat_number: '',
  routing_id: '',
  website: '',
  phone: '',
  billing_address: '',
  billing_address2: '',
  billing_city: '',
  billing_state: '',
  billing_zip_code: '',
  billing_country_id: '',
  custom_field1: '',
  custom_field2: '',
  custom_field3: '',
  custom_field4: '',
  contacts: [],
  currency_id: '',
  shipping_address: '',
  shipping_address2: '',
  shipping_city: '',
  shipping_state: '',
  shipping_zip_code: '',
  shipping_country_id: '',
};
