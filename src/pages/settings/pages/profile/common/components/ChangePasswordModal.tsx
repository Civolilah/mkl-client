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

import { useTranslation } from '@hooks/index';

import { validateChangePassword } from '../helpers/validation';

export interface PasswordPayload {
  password: string;
  password_confirmation: string;
  current_password: string;
}

const ChangePasswordModal = () => {
  const t = useTranslation();

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

  const handleChangePassword = async () => {
    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateChangePassword(payload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/users/change_password', payload)
        .then(() => {
          toast.success('changed_password');

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
      <LabelElement label={t('password')} withoutOptionalText>
        <Button onClick={() => setIsModalVisible(true)}>
          {t('change_password')}
        </Button>
      </LabelElement>

      <Modal
        title={step === 1 ? t('change_password') : t('enter_current_password')}
        visible={isModalVisible}
        onClose={handleClose}
        disableClosing={isFormBusy}
      >
        <Box className="flex flex-col space-y-4 w-full">
          {step === 1 ? (
            <>
              <TextField
                type="password"
                label={t('password')}
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
              label={t('current_password')}
              value={payload.current_password}
              onValueChange={(value) =>
                setPayload((prev) => ({ ...prev, current_password: value }))
              }
              errorMessage={
                errors.current_password && t(errors.current_password)
              }
              onPressEnter={handleChangePassword}
              withoutOptionalText
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
              onClick={() => (step === 1 ? setStep(2) : handleChangePassword())}
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
        </Box>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
