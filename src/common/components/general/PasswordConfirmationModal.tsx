/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { useToast } from '@helpers/index';

import { ValidationErrors } from '@interfaces/index';

import {
  TextField,
  Modal,
  Box,
  Button,
  InformationLabel,
} from '@components/index';

import { useTranslation } from '@hooks/index';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  onConfirm: (
    enteredPassword: string,
    withoutProcessingToaster?: boolean
  ) => Promise<void>;
  isFormBusy: boolean;
};

const PasswordConfirmationModal = (props: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const { visible, setVisible, onConfirm, isFormBusy } = props;

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(visible);

  const handleClose = () => {
    setErrors({});
    setVisible(false);
    setCurrentPassword('');
    setIsModalVisible(false);
  };

  const handleOnConfirm = (currentPassword: string) => {
    if (!isFormBusy) {
      toast.loading();

      setErrors({});

      onConfirm(currentPassword)
        .then(() => handleClose())
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        });
    }
  };

  useEffect(() => {
    setIsModalVisible(visible);
  }, [visible]);

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [currentPassword]);

  useEffect(() => {
    return () => {
      handleClose();
    };
  }, []);

  return (
    <>
      <Modal
        title={t('enter_password')}
        visible={isModalVisible}
        onClose={() => {
          handleClose();
          setCurrentPassword('');
          setErrors({});
        }}
        disableClosing={isFormBusy}
        size="small"
      >
        <Box className="flex flex-col space-y-6 w-full">
          <Box className="flex flex-col space-y-2">
            <TextField
              type="password"
              label={t('password')}
              value={currentPassword}
              onValueChange={(value) => setCurrentPassword(value)}
              onPressEnter={() => handleOnConfirm(currentPassword)}
              debounce={0}
              disabled={isFormBusy}
              withoutOptionalText
              errorMessage={errors.password && t(errors.password)}
            />

            <InformationLabel text={t('confirm_password_message')} />
          </Box>

          <Button
            onClick={() => handleOnConfirm(currentPassword)}
            disabled={!currentPassword || isFormBusy}
            disabledWithLoadingIcon={Boolean(currentPassword)}
          >
            {t('confirm')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default PasswordConfirmationModal;
