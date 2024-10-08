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

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import {
  Box,
  Button,
  GoogleButton,
  LanguageSwitcher,
  Link,
  Text,
  TextField,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { AccessType, UserDetails } from '../register/Register';
import { validateUserDetails } from './helpers/helpers';

const Login = () => {
  const t = useTranslation();
  const colors = useColors();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
  });

  const handleAccessApp = async (type: AccessType, token?: string) => {
    if (!Object.keys(errors).length || type !== 'credentials') {
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
          ...(type !== 'credentials' && {
            language: localStorage.getItem('MKL-LOCALE') || 'en',
            timezone:
              Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ||
              'Europe/Sarajevo',
          }),
        })
          .then((response) => {
            localStorage.setItem('MKL-TOKEN', response.data.token);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('display_welcome_modal'));
            }, 450);

            navigate('/');
          })
          .catch((error) => {
            if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
              setErrors(error.response.data.errors);
            }
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
    <Box
      className="flex flex-col items-center justify-center min-h-screen min-w-screen space-y-16"
      style={{
        backgroundColor: colors.$3,
      }}
    >
      <img
        className="cursor-pointer"
        src="/images/logo.png"
        width={450}
        height={130}
        alt="The MKL Store Logo"
      />

      <Box className="px-2 md:px-0 max-w-full w-[26.5rem]">
        <Box
          className="flex flex-col border px-4 sm:px-8 md:px-10 pb-12 pt-10 w-full"
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
          <Box className="flex flex-col items-center justify-center space-y-10">
            <Text style={{ fontSize: '2rem' }}>{t('sign_in')}</Text>

            <Box className="flex flex-col justify-center items-center space-y-4 w-full">
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
                withoutOptionalText
                autoComplete="email"
              />

              <Box className="flex flex-col w-full space-y-1">
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
                  withoutOptionalText
                />

                {/* <ForgotPasswordModal email={userDetails.email} /> */}
              </Box>

              <Box
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

                <Box className="flex items-center justify-center w-full space-x-3">
                  <Text className="text-sm">{t('dont_have_account')}</Text>

                  <Link className="text-sm" to="/register" constantUnderline>
                    {t('sign_up')}
                  </Link>
                </Box>
              </Box>

              <Box className="flex items-center w-full space-x-4">
                <Box
                  className="flex-1"
                  style={{
                    height: '1px',
                    backgroundColor: colors.$1,
                  }}
                />

                <Box
                  className="text-sm font-medium uppercase"
                  style={{
                    color: colors.$5,
                  }}
                >
                  {t('or')}
                </Box>

                <Box
                  className="flex-1"
                  style={{
                    height: '1px',
                    backgroundColor: colors.$1,
                  }}
                />
              </Box>

              <GoogleButton
                disabled={isFormBusy}
                handleAccessApp={handleAccessApp}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <div className="w-38">
        <div className="w-full">
          <LanguageSwitcher />
        </div>
      </div>
    </Box>
  );
};

export default Login;
