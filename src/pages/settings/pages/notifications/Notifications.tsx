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
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { Box } from '@components/index';
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
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  language: string;
  number_precision: number;
  enable_security_password: boolean;
  has_security_password: boolean;
  is_military_time: boolean;
  date_format: string;
  comma_as_decimal_separator: boolean;
  accent_color: string;
  time_zone: string;
  enabled_web_notifications: boolean;
}

export interface NotificationsProps {
  notifications: NotificationsType | undefined;
  setNotifications: Dispatch<SetStateAction<NotificationsType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
}

const Notifications = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings',
    },
    {
      title: t('notifications'),
      href: '/settings/notifications',
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<
    NotificationsType | undefined
  >(undefined);
  const [initialProfile, setInitialProfile] = useState<
    NotificationsType | undefined
  >(undefined);

  useFetchEntity<NotificationsType>({
    queryIdentifiers: ['/api/users/notifications'],
    endpoint: '/api/users/notifications',
    setEntity: setNotifications,
    setIsLoading,
    setInitialResponse: setInitialProfile,
    withoutQueryId: true,
    enableByPermission: false,
  });

  useDetectChanges({
    initialEntityValue: initialProfile,
    currentEntityValue: notifications,
  });

  const handleSave = async () => {
    if (!notifications) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/users/notifications', notifications)
        .then(() => {
          toast.success('updated_profile');

          refetch(['profile']);
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
    },
    []
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => navigate(route('/settings/profile')),
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
      />
    </Box>
  );
};

export default Notifications;
