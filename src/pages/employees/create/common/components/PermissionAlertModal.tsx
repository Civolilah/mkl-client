/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { Box, Button, Icon, Modal, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  saveEmployee: () => void;
}

const PermissionAlertModal = ({ visible, setVisible, saveEmployee }: Props) => {
  const t = useTranslation();

  return (
    <Modal
      title={t('permissions_reminder')}
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <Box className="flex flex-col gap-y-6 w-full pt-2">
        <Box className="flex items-center gap-x-4">
          <Box className="mt-0.5">
            <Icon name="warning" size="1.45rem" style={{ color: '#eab308' }} />
          </Box>

          <Text className="text-sm font-medium">
            {t('permissions_reminder_description')}
          </Text>
        </Box>

        <Box className="flex justify-between w-full">
          <Button
            type="default"
            onClick={() => {
              setVisible(false);

              setTimeout(() => {
                const permissionsCard =
                  document.getElementById('permissions-card');

                if (permissionsCard) {
                  permissionsCard.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }
              }, 100);
            }}
            disablePreventAction
          >
            {t('manage_permissions')}
          </Button>

          <Button
            type="primary"
            onClick={() => {
              setVisible(false);

              setTimeout(() => {
                saveEmployee();
              }, 100);
            }}
            disablePreventAction
          >
            {t('save_employee')}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default PermissionAlertModal;
