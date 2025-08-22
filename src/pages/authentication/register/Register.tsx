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
import { request, route } from '@helpers/index';
import { useNavigate, useSearchParams } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

import { ValidationErrors } from '@interfaces/index';

import {
  AppleButton,
  Box,
  Button,
  Captcha,
  GoogleButton,
  Icon,
  LanguageSwitcher,
  Link,
  Modal,
  Spinner,
  Text,
  TextField,
} from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import { validateUserDetails } from './helpers/helpers';

export type UserDetails = {
  email: string;
  password: string;
  password_confirmation?: string;
};

export type AccessType = 'credentials' | 'google' | 'apple';

const Register = () => {
  const t = useTranslation();

  const colors = useColors();
  const accentColor = useAccentColor();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [isAntiBotModalOpen, setIsAntiBotModalOpen] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleCaptchaVerify = (token: string) => {
    setTurnstileToken(token);
  };

  const handleRegister = async (type: AccessType, token?: string) => {
    if (!Object.keys(errors).length || type !== 'credentials') {
      setIsFormBusy(true);

      const result =
        type === 'credentials'
          ? await validateUserDetails(userDetails)
          : undefined;

      if (result !== undefined) {
        setErrors(result);
      } else {
        await request('POST', '/api/register', {
          type,
          ...(token && { token }),
          ...(!token && { details: userDetails }),
          ...(type === 'credentials' && { turnstile_token: turnstileToken }),
        })
          .then((response) => {
            localStorage.setItem('MKL-TOKEN', response.data.token);
            localStorage.setItem(
              'DEFAULT-MKL-COMPANY',
              response.data.company_id
            );

            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set('company', response.data.company_id);
            setSearchParams(newSearchParams);

            navigate(route('/'));
          })
          .catch((error) => {
            if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
              setErrors(error.response.data?.errors);
            }
          });
      }

      setIsFormBusy(false);
      setTurnstileToken('');
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
        password_confirmation: '',
      });

      setErrors({});

      setIsAntiBotModalOpen(false);
    };
  }, []);

  useEffect(() => {
    if (turnstileToken) {
      setTimeout(() => {
        setIsAntiBotModalOpen(false);

        handleRegister('credentials');
      }, 750);
    }
  }, [turnstileToken]);

  return (
    <>
      <Modal
        size="extraSmall"
        visible={isAntiBotModalOpen}
        withoutTitleAndClose
        disableClosing
      >
        {!turnstileToken ? (
          <Box className="flex items-center space-x-7">
            <Spinner size="large" />

            <Text className="font-medium text-base">
              {t('anti_bot_verification')}
            </Text>
          </Box>
        ) : (
          <Icon name="checkCircle" size={45} style={{ color: 'green' }} />
        )}
      </Modal>

      <Box
        className="flex justify-center items-center h-screen w-full"
        style={{
          backgroundImage: 'url(/public/images/login-register-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Box className="flex justify-center items-center h-full p-4 md:p-8 w-full md:w-[35rem]">
          <Box
            className="flex flex-col gap-y-16 justify-between items-center px-4 md:px-8 pt-6 md:pt-8 pb-4 h-auto w-full rounded-xl"
            style={{
              backgroundColor: colors.$2,
            }}
          >
            <Box className="flex w-full justify-between">
              <img
                src="/images/mkl.svg"
                width={75}
                height={50}
                alt="ecoMKL Logo"
              />

              <LanguageSwitcher />
            </Box>

            <Box className="flex flex-col gap-y-4 px-0 md:px-12 lg:px-10 w-full">
              <Box className="flex flex-col items-center gap-y-1 mb-4">
                <Text className="text-4xl font-normal text-center">
                  {t('create_account')}
                </Text>

                <Box className="flex items-center gap-x-1">
                  <Text className="text-sm" style={{ color: colors.$5 }}>
                    {t('already_have_account')}
                  </Text>

                  <Link to="/login" className="text-sm">
                    {t('log_in')}
                  </Link>
                </Box>
              </Box>

              <TextField
                type="email"
                label={t('email')}
                placeHolder={t('email_placeholder')}
                value={userDetails.email}
                onValueChange={(value) =>
                  setUserDetails((current) => ({ ...current, email: value }))
                }
                debounce={0}
                disabled={isFormBusy}
                onPressEnter={() => {
                  setTurnstileToken('');
                  setIsAntiBotModalOpen(true);
                }}
                errorMessage={errors.email && t(errors.email)}
                withoutOptionalText
                autoComplete="email"
              />

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
                disabled={isFormBusy}
                onPressEnter={() => {
                  setTurnstileToken('');
                  setIsAntiBotModalOpen(true);
                }}
                errorMessage={errors.password && t(errors.password)}
                withoutOptionalText
              />

              <TextField
                type="password"
                label={t('confirm_password')}
                placeHolder={t('password_placeholder')}
                value={userDetails.password_confirmation as string}
                onValueChange={(value) =>
                  setUserDetails((current) => ({
                    ...current,
                    password_confirmation: value,
                  }))
                }
                debounce={0}
                disabled={isFormBusy}
                onPressEnter={() => {
                  setTurnstileToken('');
                  setIsAntiBotModalOpen(true);
                }}
                errorMessage={
                  errors.password_confirmation &&
                  t(errors.password_confirmation)
                }
                withoutOptionalText
              />

              <Button
                className="w-full"
                onClick={() => {
                  setTurnstileToken('');
                  setIsAntiBotModalOpen(true);
                }}
                disabled={
                  isFormBusy ||
                  Boolean(Object.keys(errors).length) ||
                  isAntiBotModalOpen
                }
                disabledWithLoadingIcon={Boolean(
                  !Object.keys(errors).length && turnstileToken
                )}
              >
                {t('create_account')}
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
                  handleAccessApp={handleRegister}
                />

                <AppleButton
                  disabled={isFormBusy}
                  handleAccessApp={handleRegister}
                />

                {isAntiBotModalOpen && (
                  <Captcha onVerify={handleCaptchaVerify} />
                )}
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
      </Box>
    </>
  );
};

export default Register;
