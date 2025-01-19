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

import { endpoint, request, useToast } from '@helpers/index';
import { useNavigate } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

import { ActionElement, Box, Button, Modal, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import { ResourceType } from './TableActionsDropdown';

type Props = {
  deleteEndpoint: string;
  resourceId: string;
  resourceName: string;
  resourceType: ResourceType;
  refresh?: () => void;
  editPageAction?: boolean;
  mainPageURL?: string;
};

const DeleteAction = (props: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const navigate = useNavigate();

  const {
    deleteEndpoint,
    resourceName,
    resourceType,
    refresh,
    resourceId,
    editPageAction = false,
    mainPageURL,
  } = props;

  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleDeleteResource = () => {
    if (!isFormBusy) {
      toast.loading();
      setIsFormBusy(true);

      request('DELETE', endpoint(deleteEndpoint, { id: resourceId }))
        .then(() => {
          toast.success(t(`deleted_${resourceType}`));
          refresh?.();

          if (editPageAction && mainPageURL) {
            navigate(mainPageURL);
          }
        })
        .catch(() => toast.dismiss())
        .finally(() => setIsFormBusy(false));
    }
  };

  return (
    <>
      <ActionElement
        label={t('delete')}
        iconName="delete"
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        title={t('delete')}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        disableClosing={isFormBusy}
        size="small"
      >
        <Box className="flex flex-col space-y-6">
          <Text className="text-center text-base break-words">
            {reactStringReplace(
              reactStringReplace(
                t('are_you_sure_you_want_to_delete_resource', {
                  resourceName: ':resourceName',
                  resourceType: ':resourceType',
                }),
                ':resourceName',
                () => (
                  <Text
                    key={resourceName}
                    className="font-medium"
                  >{`"${resourceName}"`}</Text>
                )
              ),
              ':resourceType',
              () => t(resourceType).toLowerCase()
            )}
          </Text>

          <Box className="flex justify-between">
            <Button
              type="default"
              onClick={() => setIsModalOpen(false)}
              disabled={isFormBusy}
            >
              {t('no')}
            </Button>

            <Button onClick={handleDeleteResource} disabled={isFormBusy}>
              {t('yes')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAction;
