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

import { TaxRate } from '@interfaces/index';

export const validateTaxRate = async (taxRate: TaxRate) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('tax_rate_name_required')
      .max(200, 'tax_rate_name_max_length'),
  });

  try {
    await validationSchema.validate(taxRate, { abortEarly: false });
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
