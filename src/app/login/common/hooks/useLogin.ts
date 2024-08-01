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
import { Dispatch, SetStateAction } from 'react';

import { request } from '@helpers/index';

import { ValidationErrors, YupValidationError } from '@interfaces/index';

import useValidateLoginDetails from './useValidateLoginDetails';
import { LoginDetails } from '../../page';

interface Params {
  isFormBusy: boolean;
  setErrors: Dispatch<SetStateAction<ValidationErrors>>;
  setIsFormBusy: Dispatch<SetStateAction<boolean>>;
  setLoginDetails: Dispatch<SetStateAction<LoginDetails>>;
}
const useLogin = (params: Params) => {
  const { isFormBusy, setErrors, setIsFormBusy, setLoginDetails } = params;

  const validateLoginDetails = useValidateLoginDetails();

  return async (loginDetails: LoginDetails) => {
    if (!isFormBusy) {
      setIsFormBusy(true);

      validateLoginDetails(loginDetails)
        .then(() => {
          request('POST', '/api/login', loginDetails)
            .then(() => {
              setErrors({});
              setLoginDetails({
                email: '',
                password: '',
              });
            })
            .finally(() => setIsFormBusy(false));
        })
        .catch((validationError: YupValidationError) => {
          const errorMessages = {};

          validationError.inner.forEach((error) => {
            if (error.path) {
              set(errorMessages, error.path, error.message);
            }
          });

          setErrors(errorMessages);
          setIsFormBusy(false);
        });
    }
  };
};

export default useLogin;
