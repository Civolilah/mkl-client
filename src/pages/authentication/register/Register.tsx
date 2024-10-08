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
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import {
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

import { useColors, useTranslation } from '@hooks/index';

import { validateUserDetails } from './helpers/helpers';

export type UserDetails = {
  email: string;
  password: string;
  password_confirmation?: string;
};

export type AccessType = 'credentials' | 'google';

const Register = () => {
  const t = useTranslation();
  const colors = useColors();

  const navigate = useNavigate();

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
          language: localStorage.getItem('MKL-LOCALE') || 'en',
          timezone:
            Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ||
            'Europe/Sarajevo',
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
      <Modal size="extraSmall" visible={isAntiBotModalOpen} disableClosing>
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

        <Box className="px-2 md:px-0 max-w-full w-[26.5rem]">
          <Box
            className={classNames(
              'flex flex-col border px-4 sm:px-8 md:px-10 pt-10 w-full',
              {
                'pb-8': isAntiBotModalOpen,
                'pb-12': !isAntiBotModalOpen,
              }
            )}
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
              <Text style={{ fontSize: '1.75rem' }}>
                {t('create_your_account')}
              </Text>

              <Box className="flex flex-col justify-center items-center space-y-4 w-full">
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

                <Box
                  className="flex flex-col items-center justify-center w-full space-y-3"
                  style={{ marginTop: '1.5rem' }}
                >
                  <Button
                    className="w-full"
                    onClick={() => {
                      setTurnstileToken('');
                      setIsAntiBotModalOpen(true);
                    }}
                    disabled={isFormBusy || Boolean(Object.keys(errors).length)}
                    disabledWithLoadingIcon={Boolean(
                      !Object.keys(errors).length && turnstileToken
                    )}
                  >
                    {t('create_account')}
                  </Button>

                  <Box className="flex items-center justify-center w-full space-x-3">
                    <Text className="text-sm">{t('already_have_account')}</Text>

                    <Link className="text-sm" to="/login" constantUnderline>
                      {t('sign_in')}
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
                  handleAccessApp={handleRegister}
                />

                {isAntiBotModalOpen && (
                  <Captcha onVerify={handleCaptchaVerify} />
                )}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="w-38">
          <Box className="w-full">
            <LanguageSwitcher />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
