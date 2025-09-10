/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  useFetchEntity,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import NotificationsCard from './common/components/NotificationsCard';

export interface NotificationsType {
  enabled_web_notifications: boolean;
  enabled_mobile_notifications: boolean;
}

export interface NotificationsProps {
  notifications: NotificationsType | undefined;
  setNotifications: Dispatch<SetStateAction<NotificationsType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
  isFormBusy: boolean;
}

const Notifications = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('notifications'),
      href: '/settings/notifications',
    },
  ];

  const toast = useToast();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<
    NotificationsType | undefined
  >(undefined);
  const [initialNotifications, setInitialNotifications] = useState<
    NotificationsType | undefined
  >(undefined);

  useFetchEntity<NotificationsType>({
    queryIdentifiers: ['/api/users/notifications'],
    endpoint: '/api/users/notifications',
    setEntity: setNotifications,
    setIsLoading,
    setInitialResponse: setInitialNotifications,
    withoutQueryId: true,
  });

  useDetectChanges({
    initialEntityValue: initialNotifications,
    currentEntityValue: notifications,
  });

  const handleSave = async () => {
    if (!notifications) {
      return;
    }

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialNotifications, notifications)) {
        toast.info('no_notifications_changes');
        return;
      }

      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/users/notifications', notifications)
        .then(() => {
          toast.success('updated_notifications');

          refetch(['notifications']);
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

  usePageLayoutAndActions(
    {
      title: t('notifications'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: !isLargeScreen && (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="dashboard"
            onClick={() => {
              navigate(route('/dashboard'));
            }}
            iconName="dashboard"
            disabled={isLoading || isFormBusy}
            iconSize="1.2rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading || isFormBusy}
            iconSize="1.2rem"
          />

          <AISearchAction disabled={isLoading || isFormBusy} />
        </Box>
      ),
    },
    [notifications, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setNotifications(initialNotifications),
      changesLabel: 'unsaved_notifications',
    },
    [notifications, isFormBusy, handleSave]
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      <NotificationsCard
        notifications={notifications}
        setNotifications={setNotifications}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />
    </Box>
  );
};

export default Notifications;
