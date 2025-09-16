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
import { request, useToast } from '@helpers/index';
import { isEqual } from 'lodash';

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
import { validateProfile } from './common/helpers/validation';

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
}

export interface ProfileProps {
  profile: ProfileType | undefined;
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
  isFormBusy: boolean;
}

const Profile = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('profile'),
      href: '/settings/profile',
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();

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

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialProfile, profile)) {
        toast.info('no_profile_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateProfile(profile);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

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
    [profile, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setProfile(initialProfile),
      changesLabel: 'unsaved_profile',
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
        isFormBusy={isFormBusy}
      />

      <Preferences
        profile={profile}
        errors={errors}
        setProfile={setProfile}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />

      <Passwords
        profile={profile}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
      />
    </Box>
  );
};

export default Profile;
