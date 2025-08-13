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

import { request, useToast } from '@helpers/index';
import classNames from 'classnames';
import { set } from 'lodash';
import ReCAPTCHA from 'react-google-recaptcha';
import styled from 'styled-components';
import isEmail from 'validator/lib/isEmail';
import * as Yup from 'yup';

import { ValidationErrors } from '@interfaces/index';

import { Button, Modal, Text, TextField } from '@components/index';

import { useAccentColor, useTranslation } from '@hooks/index';

const TextStyled = styled(Text)`
  color: ${({ theme }) => theme.color};

  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.hoverColor};
  }
`;

type Props = {
  email: string;
};

const ForgotPasswordModal = ({ email }: Props) => {
  const t = useTranslation();

  const captchaRef = useRef<ReCAPTCHA | null>(null);

  const toast = useToast();
  const accentColor = useAccentColor();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentEmail('');
    setIsFormBusy(false);
  };

  const validateEmail = async () => {
    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .required('email_required')
        .test('is-email-valid', 'invalid_email', (value) =>
          Boolean(value && isEmail(value))
        ),
    });

    try {
      await validationSchema.validate(
        { email: currentEmail },
        { abortEarly: false }
      );
    } catch (validationError) {
      const updatedValidationError =
        validationError as unknown as Yup.ValidationError;

      const errorMessages = {};

      updatedValidationError.inner.forEach((error) => {
        if (error.path) {
          set(errorMessages, error.path, error.message);
        }
      });

      return errorMessages;
    }
  };

  const handleResetPassword = async () => {
    if (!captchaRef.current) return;

    const captchaToken = await captchaRef.current.executeAsync();

    captchaRef.current.reset();

    if (!Object.keys(errors).length) {
      setIsFormBusy(true);

      const result = await validateEmail();

      if (result !== undefined) {
        setErrors(result);
      } else {
        toast.loading();

        await request('POST', '/api/reset-password', {
          email,
          captcha_token: captchaToken,
        })
          .then(() => {
            toast.success('check_email');
            handleClose();
          })
          .catch((error) => {
            toast.dismiss();
            console.error(error);
          });
      }

      setIsFormBusy(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      setCurrentEmail(email);
    }
  }, [isModalOpen, email]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [currentEmail]);

  return (
    <>
      <Modal
        size="small"
        title={t('recover_your_password')}
        visible={isModalOpen}
        onClose={handleClose}
      >
        <div className="flex flex-col w-full space-y-6">
          <TextField
            label={t('email')}
            value={currentEmail}
            onValueChange={(value) => setCurrentEmail(value)}
            errorMessage={errors.email && t(errors.email)}
            withoutOptionalText
          />

          <Button
            className="w-full"
            onClick={handleResetPassword}
            disabled={isFormBusy || Boolean(Object.keys(errors).length)}
            disabledWithLoadingIcon={Boolean(!Object.keys(errors).length)}
          >
            {t('send_code')}
          </Button>
        </div>
      </Modal>

      <TextStyled
        className={classNames('self-end text-xs-mid', {
          'cursor-not-allowed': isFormBusy,
          'cursor-pointer': !isFormBusy,
        })}
        onClick={() => setIsModalOpen(true)}
        theme={{ color: accentColor, hoverColor: '#2E6CBD' }}
      >
        {t('forgot_password')}
      </TextStyled>
    </>
  );
};

export default ForgotPasswordModal;
