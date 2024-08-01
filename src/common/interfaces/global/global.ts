/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import * as Yup from 'yup';

export interface ValidationErrors {
  [key: string]: string;
}

export type YupValidationError = Yup.ValidationError;
