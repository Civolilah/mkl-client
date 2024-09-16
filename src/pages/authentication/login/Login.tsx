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

import { request } from '@helpers/index';

import { ValidationErrors } from '@interfaces/index';

import {
  Button,
  GoogleButton,
  LanguageSwitcher,
  Link,
  Text,
  TextField,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { AccessType, UserDetails } from '../register/Register';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { validateUserDetails } from './helpers/helpers';

const Login = () => {
  const t = useTranslation();
  const colors = useColors();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
  });

  const handleAccessApp = async (type: AccessType, token?: string) => {
    if (!Object.keys(errors).length) {
      setIsFormBusy(true);

      const result =
        type === 'credentials'
          ? await validateUserDetails(userDetails)
          : undefined;

      if (result !== undefined) {
        setErrors(result);
      } else {
        await request('POST', '/api/login', {
          type,
          ...(token && { token }),
          ...(!token && { details: userDetails }),
        })
          .then((response) => response)
          .catch((error) => {
            console.error(error);
          });
      }

      setIsFormBusy(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [userDetails]);

  useEffect(() => {
    return () => {
      setUserDetails({
        email: '',
        password: '',
      });

      setErrors({});
    };
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen min-w-screen space-y-16"
      style={{
        backgroundColor: colors.$3,
      }}
    >
      <img
        className="cursor-pointer"
        src="/images/logo.png"
        width={195}
        height={60}
        alt="The MKL Store Logo"
      />

      <div className="px-2 md:px-0 max-w-full w-[26.5rem]">
        <div
          className="flex flex-col border px-4 sm:px-8 md:px-10 pb-12 pt-10 w-full"
          style={{
            borderRadius: '4px',
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
          <div className="flex flex-col items-center justify-center space-y-10">
            <h1 style={{ fontSize: '2rem', letterSpacing: 0.8 }}>
              {t('sign_in')}
            </h1>

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
              <TextField
                label={t('email')}
                placeHolder={t('email_placeholder')}
                value={userDetails.email}
                onValueChange={(value) =>
                  setUserDetails((current) => ({ ...current, email: value }))
                }
                debounce={0}
                onPressEnter={() => handleAccessApp('credentials')}
                errorMessage={errors.email && t(errors.email)}
              />

              <div className="flex flex-col w-full space-y-1">
                <TextField
                  type="password"
                  label={t('password')}
                  placeHolder={t('password_placeholder')}
                  value={userDetails.password}
                  onValueChange={(value) =>
                    setUserDetails((current) => ({
                      ...current,
                      password: value,
                    }))
                  }
                  debounce={0}
                  onPressEnter={() => handleAccessApp('credentials')}
                  errorMessage={
                    errors.password &&
                    (errors.password === 'password_special_char'
                      ? t('password_special_char')
                      : t(errors.password))
                  }
                />

                <ForgotPasswordModal email={userDetails.email} />
              </div>

              <div
                className="flex flex-col items-center justify-center w-full space-y-3"
                style={{ marginTop: '1.5rem' }}
              >
                <Button
                  className="w-full"
                  onClick={() => handleAccessApp('credentials')}
                  disabled={isFormBusy || Boolean(Object.keys(errors).length)}
                  disabledWithLoadingIcon={Boolean(!Object.keys(errors).length)}
                >
                  {t('sign_in')}
                </Button>

                <div className="flex items-center justify-center w-full space-x-3">
                  <Text className="text-sm">{t('dont_have_account')}</Text>

                  <Link className="text-sm" to="/register" constantUnderline>
                    {t('sign_up')}
                  </Link>
                </div>
              </div>

              <div className="flex items-center w-full space-x-4">
                <div
                  className="flex-1"
                  style={{
                    height: '1px',
                    backgroundColor: colors.$1,
                  }}
                />

                <div
                  className="text-sm font-medium uppercase"
                  style={{
                    color: colors.$5,
                  }}
                >
                  {t('or')}
                </div>

                <div
                  className="flex-1"
                  style={{
                    height: '1px',
                    backgroundColor: colors.$1,
                  }}
                />
              </div>

              <GoogleButton
                isFormBusy={isFormBusy}
                handleAccessApp={handleAccessApp}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-38">
        <div className="w-full">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default Login;
