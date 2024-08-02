/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { useEffect, useState } from 'react';

import { ValidationErrors } from '@interfaces/index';

import { Button, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { LoginDetails } from '../../page';
import useLogin from '../hooks/useLogin';

const Form = () => {
  const t = useTranslation();

  const [isFormBusy, setIsFormBusy] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: '',
  });

  const handleLogin = useLogin({
    setIsFormBusy,
    setErrors,
    isFormBusy,
    setLoginDetails,
  });

  useEffect(() => {
    setErrors({});
  }, [loginDetails]);

  return (
    <>
      <TextField
        type="email"
        label={t('email')}
        placeHolder={t('email_placeholder')}
        value={loginDetails.email}
        onValueChange={(value) =>
          setLoginDetails((current) => ({ ...current, email: value }))
        }
        errorMessage={errors.email}
      />

      <TextField
        type="password"
        label={t('password')}
        placeHolder={t('password_placeholder')}
        value={loginDetails.password}
        onValueChange={(value) =>
          setLoginDetails((current) => ({ ...current, password: value }))
        }
        errorMessage={errors.password}
      />

      <Button
        onClick={() => handleLogin(loginDetails)}
        disabled={isFormBusy}
        disabledWithLoadingIcon
        style={{ marginTop: 35 }}
      >
        {t('login')}
      </Button>
    </>
  );
};

export default Form;
