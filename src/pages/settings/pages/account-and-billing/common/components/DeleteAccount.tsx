/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, useToast } from '@helpers/index';

import { ValidationErrors } from '@interfaces/index';

import {
  Box,
  Button,
  Card,
  LabelElement,
  Modal,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

const DeleteAccount = () => {
  const t = useTranslation();

  const toast = useToast();

  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    if (!isFormBusy) {
      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/delete_account', { password })
        .then(() => {
          window.dispatchEvent(new CustomEvent('logout_user'));
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
      <Modal
        title={t('delete_account')}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        disableClosing={isFormBusy}
      >
        <Box className="flex flex-col space-y-6 w-full">
          <TextField
            type="password"
            value={password}
            onValueChange={(value) => setPassword(value)}
            label={t('password')}
            errorMessage={errors.password && t(errors.password)}
          />
        </Box>

        <Button
          onClick={handleDeleteAccount}
          disabled={isFormBusy}
          disabledWithLoadingIcon={isFormBusy}
        >
          {t('confirm')}
        </Button>
      </Modal>

      <Card title={t('delete_account')} className="w-full" paddingBottom="0">
        <LabelElement
          label={t('delete_account')}
          helpLabel={t('delete_account_help')}
          withoutOptionalText
          twoGridColumns
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            disabled={isFormBusy}
            disabledWithLoadingIcon={isFormBusy}
            handleHoverWithOpacity
            style={{ backgroundColor: 'red' }}
          >
            {t('delete_account')}
          </Button>
        </LabelElement>
      </Card>
    </>
  );
};

export default DeleteAccount;
