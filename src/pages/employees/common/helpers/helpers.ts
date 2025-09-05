/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { set } from 'lodash';
import isEmail from 'validator/lib/isEmail';
import * as Yup from 'yup';

import { User } from '@interfaces/index';

const AVAILABLE_PERMISSIONS = [
  'director',
  'owner',
  'admin',

  'view_dashboard',
  'manage_orders',
  'import_products',
  'export_products',
  'manage_stock_counting',

  'create_all',
  'view_all',
  'edit_all',

  'create_product',
  'view_product',
  'edit_product',

  'create_warehouse',
  'view_warehouse',
  'edit_warehouse',

  'create_subsidiary',
  'view_subsidiary',
  'edit_subsidiary',

  'create_customer',
  'view_customer',
  'edit_customer',

  'create_supplier',
  'view_supplier',
  'edit_supplier',

  'create_brand',
  'view_brand',
  'edit_brand',

  'create_category',
  'view_category',
  'edit_category',

  'create_label',
  'view_label',
  'edit_label',

  'create_label_category',
  'view_label_category',
  'edit_label_category',

  'create_purchase_order',
  'view_purchase_order',
  'edit_purchase_order',

  'create_status',
  'view_status',
  'edit_status',

  'create_bin',
  'view_bin',
  'edit_bin',
];

type ValidationOptions = {
  creatingUser?: boolean;
  password?: string;
};

export const validateEmployee = async (
  employee: User,
  options?: ValidationOptions
) => {
  const { creatingUser = false, password } = options ?? {};

  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required('first_name_required')
      .max(150, 'first_name_max_length'),
    last_name: Yup.string().optional().max(150, 'last_name_max_length'),
    email: Yup.string()
      .test('is-email-valid', 'invalid_email', (value) =>
        Boolean(value && isEmail(value))
      )
      .required('email_required'),
    password: Yup.string().when(['$creatingUser', '$currentPassword'], {
      is: (creatingUser: boolean, currentPassword: string) => {
        if (creatingUser) return true;
        if (!creatingUser && currentPassword) return true;
        return false;
      },
      then: (schema) =>
        schema
          .min(5, 'password_min_length')
          .max(200, 'password_max_length')
          .when('$creatingUser', {
            is: true,
            then: (schema) => schema.required('password_required'),
          }),
      otherwise: (schema) => schema.optional(),
    }),
    subsidiaries: Yup.array().of(Yup.string().required('incorrect_input')),
    permissions: Yup.array().of(
      Yup.string().oneOf(AVAILABLE_PERMISSIONS, 'incorrect_input')
    ),
  });

  try {
    await validationSchema.validate(employee, {
      abortEarly: false,
      context: { creatingUser, currentPassword: password },
    });
  } catch (validationError) {
    const updatedValidationError =
      validationError as unknown as Yup.ValidationError;

    const errorMessages = {};

    updatedValidationError.inner.forEach((error) => {
      if (error.path) {
        set(errorMessages, error.path, error.message);
      }
    });

    return errorMessages;
  }
};
