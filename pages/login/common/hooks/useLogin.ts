/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';
import * as Yup from 'yup';

import { request } from '@helpers/index';

import { LoginDetails } from '@pages/login';

import { ValidationErrors } from '@interfaces/index';

import { useTranslation } from '@hooks/index';

interface Params {
  isFormBusy: boolean;
  setErrors: Dispatch<SetStateAction<ValidationErrors>>;
  setIsFormBusy: Dispatch<SetStateAction<boolean>>;
  setLoginDetails: Dispatch<SetStateAction<LoginDetails>>;
}
const useLogin = (params: Params) => {
  const [t] = useTranslation();

  const { isFormBusy, setErrors, setIsFormBusy, setLoginDetails } = params;

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

  return async (loginDetails: LoginDetails) => {
    if (!isFormBusy) {
      setIsFormBusy(true);

      try {
        await validationSchema.validate(loginDetails, { abortEarly: false });

        await request('POST', '/api/login', loginDetails)
          .then(() => {
            setErrors({});
            setLoginDetails({
              email: '',
              password: '',
            });
          })
          .finally(() => setIsFormBusy(false));

        setErrors({});
      } catch (validationErrors) {
        if (validationErrors instanceof Yup.ValidationError) {
          const errorMessages = {};

          validationErrors.inner.forEach((error) => {
            errorMessages[error.path] = error.message;
          });

          setErrors(errorMessages);
        }
      } finally {
        setIsFormBusy(false);
      }
    }
  };
};

export default useLogin;
