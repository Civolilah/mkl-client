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

import { useTranslation } from '@hooks/index';

import { LoginDetails } from '../../page';

const useValidateLoginDetails = () => {
  const t = useTranslation();

  return async (loginDetails: LoginDetails) => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          t('invalid_email')
        )
        .required(t('email_required')),
      password: Yup.string()
        .min(8, t('password_min_length'))
        .matches(/[A-Z]/, t('password_uppercase'))
        .matches(/[0-9]/, t('password_number'))
        .matches(/[!@#$%^&*(),.?":{}|<>]/, t('password_special_char'))
        .required(t('password_required')),
    });

    await validationSchema.validate(loginDetails, { abortEarly: false });
  };
};

export default useValidateLoginDetails;
