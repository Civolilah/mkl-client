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

import { Supplier, SupplierContact } from '@interfaces/index';

export const BLANK_SUPPLIER_CONTACT: SupplierContact = {
  id: v4(),
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  send_email: false,
  supplier_portal_access: false,
};

export const INITIAL_SUPPLIER: Supplier = {
  name: '',
  number: '',
  id_number: '',
  vat_number: '',
  routing_id: '',
  website: '',
  phone: '',
  address: '',
  address2: '',
  city: '',
  state: '',
  zip_code: '',
  country_id: '',
  custom_field1: '',
  custom_field2: '',
  custom_field3: '',
  custom_field4: '',
  contacts: [],
  currency_id: '',
};
