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

import Details from './common/components/Details';
import Passwords from './common/components/Passwords';
import Preferences from './common/components/Preferences';

export interface ProfileType {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  language: string;
  number_precision: number;
  enabled_security_password: boolean;
  has_security_password: boolean;
  is_military_time: boolean;
  date_format: string;
  comma_as_decimal_separator: boolean;
  accent_color: string;
  time_zone: string;
  enabled_web_notifications: boolean;
}

export interface ProfileProps {
  profile: ProfileType | undefined;
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
}

const Profile = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings',
    },
    {
      title: t('profile'),
      href: '/settings/profile',
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);
  const [initialProfile, setInitialProfile] = useState<ProfileType | undefined>(
    undefined
  );

  useFetchEntity<ProfileType>({
    queryIdentifiers: ['/api/users/profile'],
    endpoint: '/api/users/profile',
    setEntity: setProfile,
    setIsLoading,
    setInitialResponse: setInitialProfile,
    withoutQueryId: true,
  });

  useDetectChanges({
    initialEntityValue: initialProfile,
    currentEntityValue: profile,
  });

  const handleSave = async () => {
    if (!profile) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/users/profile', profile)
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
      title: t('profile'),
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
      onDiscardClick: () => navigate(route('/employees')),
    },
    [profile, isFormBusy, handleSave]
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      <Details
        profile={profile}
        setProfile={setProfile}
        errors={errors}
        isLoading={isLoading}
      />

      <Preferences
        profile={profile}
        errors={errors}
        setProfile={setProfile}
        isLoading={isLoading}
      />

      <Passwords profile={profile} isLoading={isLoading} />
    </Box>
  );
};

export default Profile;
