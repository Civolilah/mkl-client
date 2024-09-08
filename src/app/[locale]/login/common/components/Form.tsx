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

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { Languages, locales } from 'src/config';

import { ValidationErrors } from '@interfaces/index';

import { Button, GoogleButton, TextField } from '@components/index';

import { useColors, useSwitchLanguage, useTranslation } from '@hooks/index';

import { LoginDetails } from '../../page';
import { handleLoginUser, validateLoginDetails } from '../helpers/helpers';

const Form = () => {
  const t = useTranslation({ section: 'LoginPage' });

  const colors = useColors();
  const params = useParams();

  const switchLanguage = useSwitchLanguage();

  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loginDetails, setLoginDetails] = useState<LoginDetails>({
    email: '',
    password: '',
  });

  const handleLogin = async () => {
    if (!Object.keys(errors).length) {
      setIsFormBusy(true);

      const result = await validateLoginDetails(loginDetails);

      if (result !== undefined) {
        setErrors(result);
      } else {
        await handleLoginUser(loginDetails);
      }

      setIsFormBusy(false);
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [loginDetails]);

  useEffect(() => {
    const browserLocale = navigator.language.split('-')[0];

    if (
      browserLocale &&
      locales.includes(browserLocale as Languages) &&
      params.locale !== browserLocale
    ) {
      switchLanguage(browserLocale);
    }
  }, []);

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
        onPressEnter={() => handleLogin()}
        errorMessage={errors.email && t(errors.email)}
      />

      <TextField
        type="password"
        label={t('password')}
        placeHolder={t('password_placeholder')}
        value={loginDetails.password}
        onValueChange={(value) =>
          setLoginDetails((current) => ({ ...current, password: value }))
        }
        onPressEnter={() => handleLogin()}
        errorMessage={
          errors.password &&
          (errors.password === 'password_special_char'
            ? t.raw('password_special_char')
            : t(errors.password))
        }
      />

      <Button
        onClick={handleLogin}
        disabled={isFormBusy || Boolean(Object.keys(errors).length)}
        disabledWithLoadingIcon={Boolean(!Object.keys(errors).length)}
        style={{ marginTop: 35 }}
      >
        {t('login')}
      </Button>

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

      <GoogleButton />
    </>
  );
};

export default Form;
