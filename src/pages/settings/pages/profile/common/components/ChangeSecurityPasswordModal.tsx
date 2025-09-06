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

import { ValidationErrors } from '@interfaces/index';

import { Box, Button, LabelElement, Modal, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { validateChangeSecurityPassword } from '../helpers/validation';

export interface PasswordPayload {
  password: string;
  password_confirmation: string;
}

const ChangeSecurityPasswordModal = () => {
  const t = useTranslation();

  const toast = useToast();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [payload, setPayload] = useState<PasswordPayload>({
    password: '',
    password_confirmation: '',
  });

  const handleClose = () => {
    setPayload({
      password: '',
      password_confirmation: '',
    });

    setIsModalVisible(false);
  };

  const handleChangeSecurityPassword = async () => {
    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateChangeSecurityPassword(payload);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/change_security_password', payload)
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
      <LabelElement label={t('security_password')} withoutOptionalText>
        <Button onClick={() => setIsModalVisible(true)}>
          {t('change_security_password')}
        </Button>
      </LabelElement>

      <Modal
        title={t('change_security_password')}
        visible={isModalVisible}
        onClose={handleClose}
        disableClosing={isFormBusy}
      >
        <Box className="flex flex-col space-y-6 w-full">
          <TextField
            required
            type="password"
            label={t('password')}
            value={payload.password}
            onValueChange={(value) =>
              setPayload((prev) => ({ ...prev, password: value }))
            }
            errorMessage={errors.password && t(errors.password)}
          />

          <TextField
            required
            type="password"
            label={t('confirm_password')}
            value={payload.password_confirmation}
            onValueChange={(value) =>
              setPayload((prev) => ({ ...prev, password_confirmation: value }))
            }
            errorMessage={
              errors.password_confirmation && t(errors.password_confirmation)
            }
          />

          <Button
            onClick={handleChangeSecurityPassword}
            disabled={
              !payload.password || !payload.password_confirmation || isFormBusy
            }
            disabledWithLoadingIcon={isFormBusy}
          >
            {t('confirm')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ChangeSecurityPasswordModal;
