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
import * as Yup from 'yup';

import { Subsidiary } from '@interfaces/index';

export const validateSubsidiary = async (subsidiary: Subsidiary) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('subsidiary_name_required')
      .max(200, 'subsidiary_name_max_length'),
    address: Yup.string().max(400, 'subsidiary_address_max_length').optional(),
    city: Yup.string().max(200, 'subsidiary_city_max_length').optional(),
    zip_code: Yup.string().max(50, 'subsidiary_zip_code_max_length').optional(),
    country_code: Yup.string()
      .max(30, 'subsidiary_country_code_max_length')
      .optional(),
  });

  try {
    await validationSchema.validate(subsidiary, { abortEarly: false });
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
