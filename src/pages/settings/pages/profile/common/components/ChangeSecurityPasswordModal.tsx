/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, useToast } from '@helpers/index';
import classNames from 'classnames';

import { ValidationErrors } from '@interfaces/index';

import { Box, Button, LabelElement, Modal, TextField } from '@components/index';

import { useRefetch, useTranslation } from '@hooks/index';

import { ProfileType } from '../../Profile';
import { validateChangeSecurityPassword } from '../helpers/validation';

export interface PasswordPayload {
  password: string;
  password_confirmation: string;
  current_password: string;
}

interface Props {
  profile: ProfileType | undefined;
  isFormBusy: boolean;
}

const ChangeSecurityPasswordModal = ({
  profile,
  isFormBusy: isSaveProfileFormBusy,
}: Props) => {
  const t = useTranslation();

  const refetch = useRefetch();

  const toast = useToast();

  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [payload, setPayload] = useState<PasswordPayload>({
    password: '',
    password_confirmation: '',
    current_password: '',
  });

  const handleClose = () => {
    setPayload({
      password: '',
      password_confirmation: '',
      current_password: '',
    });

    setIsModalVisible(false);
  };

  const handleChangeSecurityPassword = async () => {
    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateChangeSecurityPassword(
        payload,
        Boolean(profile?.has_security_password)
      );

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/users/change_security_password', payload)
        .then(() => {
          toast.success('changed_security_password');

          refetch(['profile']);

          handleClose();
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  return (
    <>
      <LabelElement label={t('security_password')} withoutOptionalText>
        <Button
          id="set-security-password-button"
          onClick={() => setIsModalVisible(true)}
          disabled={isSaveProfileFormBusy}
        >
          {t(
            profile?.has_security_password
              ? 'change_security_password'
              : 'set_security_password'
          )}
        </Button>
      </LabelElement>

      <Modal
        title={
          profile?.has_security_password
            ? t('change_security_password')
            : t('set_security_password')
        }
        visible={isModalVisible}
        onClose={handleClose}
        disableClosing={isFormBusy}
      >
        <Box className="flex flex-col space-y-4 w-full">
          {profile?.has_security_password ? (
            <>
              {step === 1 ? (
                <>
                  <TextField
                    type="password"
                    label={t('new_password')}
                    value={payload.password}
                    onValueChange={(value) =>
                      setPayload((prev) => ({ ...prev, password: value }))
                    }
                    errorMessage={errors.password && t(errors.password)}
                    onPressEnter={() => setStep(2)}
                    withoutOptionalText
                  />

                  <TextField
                    type="password"
                    label={t('confirm_password')}
                    value={payload.password_confirmation}
                    onValueChange={(value) =>
                      setPayload((prev) => ({
                        ...prev,
                        password_confirmation: value,
                      }))
                    }
                    onPressEnter={() => setStep(2)}
                    errorMessage={
                      errors.password_confirmation &&
                      t(errors.password_confirmation)
                    }
                    withoutOptionalText
                  />
                </>
              ) : (
                <TextField
                  type="password"
                  label={t('current_security_password')}
                  value={payload.current_password}
                  onValueChange={(value) =>
                    setPayload((prev) => ({ ...prev, current_password: value }))
                  }
                  errorMessage={
                    errors.current_password && t(errors.current_password)
                  }
                  onPressEnter={handleChangeSecurityPassword}
                  withoutOptionalText
                  readOnly={isFormBusy}
                />
              )}

              <Box className="flex justify-between w-full">
                {step === 2 && (
                  <Button type="default" onClick={() => setStep(1)}>
                    {t('back')}
                  </Button>
                )}

                <Button
                  className={classNames({
                    'w-full': step === 1,
                  })}
                  onClick={() =>
                    step === 1 ? setStep(2) : handleChangeSecurityPassword()
                  }
                  disabled={
                    (step === 1
                      ? !payload.password || !payload.password_confirmation
                      : !payload.current_password) || isFormBusy
                  }
                  disabledWithLoadingIcon={isFormBusy}
                >
                  {step === 1 ? t('next') : t('confirm')}
                </Button>
              </Box>
            </>
          ) : (
            <>
              <TextField
                type="password"
                label={t('new_password')}
                value={payload.password}
                onValueChange={(value) =>
                  setPayload((prev) => ({ ...prev, password: value }))
                }
                errorMessage={errors.password && t(errors.password)}
                onPressEnter={() => setStep(2)}
                withoutOptionalText
              />

              <TextField
                type="password"
                label={t('confirm_password')}
                value={payload.password_confirmation}
                onValueChange={(value) =>
                  setPayload((prev) => ({
                    ...prev,
                    password_confirmation: value,
                  }))
                }
                onPressEnter={() => setStep(2)}
                errorMessage={
                  errors.password_confirmation &&
                  t(errors.password_confirmation)
                }
                withoutOptionalText
              />

              <Button
                className="w-full"
                onClick={handleChangeSecurityPassword}
                disabled={
                  !payload.password ||
                  !payload.password_confirmation ||
                  isFormBusy
                }
                disabledWithLoadingIcon={isFormBusy}
              >
                {t('confirm')}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ChangeSecurityPasswordModal;
