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
import reactStringReplace from 'react-string-replace';

import { ValidationErrors } from '@interfaces/index';

import {
  AppleButton,
  Box,
  Button,
  GoogleButton,
  LanguageSwitcher,
  Link,
  Text,
  TextField,
} from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import { AccessType, UserDetails } from '../register/Register';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import { validateUserDetails } from './helpers/helpers';

const Login = () => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

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
        })
          .then((response) => {
            localStorage.setItem('MKL-TOKEN', response.data.token);

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
      className="flex h-screen"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Box className="h-full p-8 lg:w-5/12">
        <Box
          className="flex flex-col justify-between items-center px-5 pt-5 pb-6 h-full w-full"
          style={{
            backgroundColor: colors.$2,
          }}
        >
          <Box className="flex w-full justify-between">
            <img
              className="cursor-pointer"
              src="/images/logo.png"
              width={150}
              height={45}
              alt="Logo"
            />

            <LanguageSwitcher />
          </Box>

          <Box className="flex flex-col gap-y-5 w-[23rem]">
            <Box className="flex flex-col items-center gap-y-2 mb-5">
              <Text className="text-4xl font-normal">{t('welcome_back')}</Text>

              <Box className="flex items-center gap-x-1">
                <Text className="text-sm" style={{ color: colors.$5 }}>
                  {t('new_to_ecomkl')}
                </Text>

                <Link to="/register" className="text-sm">
                  {t('sign_up')}
                </Link>
              </Box>
            </Box>

            <TextField
              label={t('email')}
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

            <Box className="flex flex-col gap-y-1">
              <TextField
                label={t('password')}
                type="password"
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

              <ForgotPasswordModal email={userDetails.email} />
            </Box>

            <Button
              onClick={() => handleAccessApp('credentials')}
              disabled={isFormBusy || Boolean(Object.keys(errors).length)}
              disabledWithLoadingIcon={Boolean(!Object.keys(errors).length)}
            >
              {t('log_in')}
            </Button>

            <Box className="flex items-center w-full space-x-4">
              <Box
                className="flex-1"
                style={{
                  height: '1px',
                  backgroundColor: colors.$1,
                }}
              />

              <Box
                className="text-xs-mid font-medium uppercase"
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

            <Box className="grid grid-cols-2 gap-x-4">
              <GoogleButton
                disabled={isFormBusy}
                handleAccessApp={handleAccessApp}
              />

              <AppleButton
                disabled={isFormBusy}
                handleAccessApp={handleAccessApp}
              />
            </Box>
          </Box>

          <Box
            className="text-center text-xs mt-6"
            style={{
              color: colors.$5,
            }}
          >
            {reactStringReplace(
              reactStringReplace(
                t('copyright_text', {
                  terms: ':terms',
                  privacyPolicy: ':privacyPolicy',
                }),
                ':terms',
                () => (
                  <Link
                    key="terms"
                    to="/terms"
                    className="text-xs font-medium"
                    style={{
                      color: accentColor,
                    }}
                  >
                    {t('terms')}
                  </Link>
                )
              ),
              ':privacyPolicy',
              () => (
                <Link
                  key="privacyPolicy"
                  to="/privacy"
                  className="text-xs font-medium"
                  style={{
                    color: accentColor,
                  }}
                >
                  {t('privacy_policy')}
                </Link>
              )
            )}
          </Box>
        </Box>
      </Box>

      {/* Right Side - Hero Text */}
      <Box className="hidden lg:flex flex-col justify-center items-center w-1/2 p-12 relative z-10">
        <Box className="text-center text-white max-w-lg">
          <Text
            className="mb-4"
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              lineHeight: '1.1',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero_title')}
          </Text>
          <Text
            style={{
              fontSize: '1.25rem',
              fontWeight: '300',
              opacity: 0.9,
              textShadow: '0 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            {t('hero_subtitle')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
