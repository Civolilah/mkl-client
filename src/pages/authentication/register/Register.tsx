/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useRef, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request } from '@helpers/index';
import { atom, useSetAtom } from 'jotai';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import {
  Button,
  Captcha,
  GoogleButton,
  LanguageSwitcher,
  Link,
  Text,
  TextField,
} from '@components/index';
import { Languages } from '@components/layout/LanguageSwitcher';

import { useColors, useTranslation } from '@hooks/index';

export type UserDetails = {
  email: string;
  password: string;
  password_confirmation?: string;
};

export type AccessType = 'credentials' | 'google';

type UserLoginDetails = {
  user: {
    first_name: string;
    last_name: string;
    email: string;
    created_at: number;
    is_director: boolean;
    is_owner: boolean;
    preference: {
      language: Languages;
      mini_side_bar: boolean | null;
      time_zone: string | null;
      comma_as_decimal_separator: boolean | null;
      color_theme: string | null;
      accent_color: string | null;
      hover_accent_color: string | null;
      email_notification: boolean | null;
    };
    permissions: string[];
  };
  company: {
    name: string;
  };
  token: string;
};

export const userLoginDetailsAtom = atom<UserLoginDetails | undefined>(
  undefined
);

const Register = () => {
  const t = useTranslation();
  const colors = useColors();

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const navigate = useNavigate();

  const setUserLoginDetails = useSetAtom(userLoginDetailsAtom);

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleRegister = async (type: AccessType, token?: string) => {
    if (!captchaRef.current) return;

    const captchaToken = await captchaRef.current.executeAsync();

    captchaRef.current.reset();

    if (!Object.keys(errors).length && captchaToken) {
      setIsFormBusy(true);

      const result = undefined;

      if (result !== undefined) {
        setErrors(result);
      } else {
        await request('POST', '/api/register', {
          type,
          ...(token && { token }),
          ...(!token && { details: userDetails }),
          captcha_token: captchaToken,
          language: navigator?.language?.split('-')?.[0] || 'en',
        })
          .then((response) => {
            setUserLoginDetails(response.data.user);
            localStorage.setItem('MKL-TOKEN', response.data.token);
            setTimeout(() => {
              window.dispatchEvent(new CustomEvent('display_welcome_message'));
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
            <h1 style={{ fontSize: '1.75rem', letterSpacing: 0.8 }}>
              {t('create_your_account')}
            </h1>

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
              <TextField
                type="email"
                label={t('email')}
                placeHolder={t('email_placeholder')}
                value={userDetails.email}
                onValueChange={(value) =>
                  setUserDetails((current) => ({ ...current, email: value }))
                }
                maxLength={100}
                debounce={0}
                onPressEnter={() => handleRegister('credentials')}
                errorMessage={errors.email && t(errors.email)}
                withoutOptionalText
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
                maxLength={100}
                debounce={0}
                onPressEnter={() => handleRegister('credentials')}
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
                maxLength={100}
                debounce={0}
                onPressEnter={() => handleRegister('credentials')}
                errorMessage={
                  errors.password_confirmation &&
                  t(errors.password_confirmation)
                }
                withoutOptionalText
              />

              <div
                className="flex flex-col items-center justify-center w-full space-y-3"
                style={{ marginTop: '1.5rem' }}
              >
                <Button
                  className="w-full"
                  onClick={() => handleRegister('credentials')}
                  disabled={isFormBusy || Boolean(Object.keys(errors).length)}
                  disabledWithLoadingIcon={Boolean(!Object.keys(errors).length)}
                >
                  {t('create_account')}
                </Button>

                <div className="flex items-center justify-center w-full space-x-3">
                  <Text className="text-sm">{t('already_have_account')}</Text>

                  <Link className="text-sm" to="/login" constantUnderline>
                    {t('sign_in')}
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
                handleAccessApp={handleRegister}
              />

              <Captcha innerRef={captchaRef} />
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

export default Register;
