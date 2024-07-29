/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ValidationErrors } from '@interfaces/index';

import { Button, TextField } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import useLogin from './common/hooks/useLogin';

export interface LoginDetails {
  email: string;
  password: string;
}

const LoginPage = () => {
  const [t] = useTranslation();

  const colors = useColors();

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
    <div
      className="px-2 md:px-0"
      style={{
        width: '24.5rem',
      }}
    >
      <div
        className="flex flex-col border px-4 md:px-6 pb-12 pt-16"
        style={{
          borderColor: colors.$1,
          boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.03),
            0 4px 8px rgba(0, 0, 0, 0.02),
            0 8px 16px rgba(0, 0, 0, 0.01)
          `,
          backgroundColor: colors.$2,
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-16">
          <h1 className="text-6xl">{t('login')}</h1>

          <div className="flex flex-col justify-center items-center space-y-4 w-full">
            <TextField
              type="email"
              placeHolder={t('email_placeholder')}
              label={t('email')}
              value={loginDetails.email}
              onValueChange={(value) =>
                setLoginDetails((current) => ({ ...current, email: value }))
              }
              errorMessage={errors.email}
            />

            <TextField
              type="password"
              placeHolder={t('password_placeholder')}
              label={t('password')}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default LoginPage;
