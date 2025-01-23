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
import { useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';

import {
  ActionElement,
  Box,
  Button,
  Modal,
  PasswordConfirmationModal,
  Text,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { userCompanyAtom } from './PrivateRoute';
import { ResourceType } from './TableActionsDropdown';

type Props = {
  resourceName: string;
  deleteEndpoint: string;
  resourceId: string;
  resourceType: ResourceType;
  refresh?: () => void;
  editPageAction?: boolean;
  mainPageURL?: string;
};

const DeleteAction = (props: Props) => {
  const t = useTranslation();

  const toast = useToast();

  const navigate = useNavigate();

  const userCompany = useAtomValue(userCompanyAtom);

  const {
    deleteEndpoint,
    resourceType,
    refresh,
    resourceId,
    editPageAction = false,
    mainPageURL,
    resourceName,
  } = props;

  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isPasswordConfirmationModalOpen, setIsPasswordConfirmationModalOpen] =
    useState<boolean>(false);

  const handleDeleteResource = async (
    enteredPassword?: string,
    withoutRequiredPassword?: boolean
  ) => {
    if (!isFormBusy) {
      toast.loading();
      setIsFormBusy(true);

      let headers = {};

      if (!withoutRequiredPassword) {
        headers = {
          headers: {
            'X-Password': enteredPassword,
          },
        };
      }

      return request(
        'DELETE',
        endpoint(deleteEndpoint, { id: resourceId }),
        {},
        headers
      )
        .then(() => {
          toast.success(t(`deleted_${resourceType}`));
          refresh?.();

          if (editPageAction && mainPageURL) {
            navigate(mainPageURL);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  return (
    <>
      <PasswordConfirmationModal
        visible={isPasswordConfirmationModalOpen}
        setVisible={setIsPasswordConfirmationModalOpen}
        onConfirm={handleDeleteResource}
        isFormBusy={isFormBusy}
      />

      <ActionElement
        label={t('delete')}
        iconName="delete"
        onClick={() =>
          userCompany?.preference.enabled_security_password
            ? setIsPasswordConfirmationModalOpen(true)
            : setIsModalOpen(true)
        }
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
                  <Text key={resourceName} className="font-medium">
                    {`"${resourceName}"`}
                  </Text>
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

            <Button
              onClick={() => handleDeleteResource('', true)}
              disabled={isFormBusy}
            >
              {t('yes')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default DeleteAction;
