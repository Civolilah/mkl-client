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

import { route } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { Box } from '@components/index';

import {
  usePageLayoutAndActions,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import DeleteAccount from './common/components/DeleteAccount';
import Details from './common/components/Details';
import Notifications from './common/components/Notifications';
import Passwords from './common/components/Passwords';
import Preferences from './common/components/Preferences';

export interface ProfileType {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  subsidiaries_ids: string[];
  warehouses_ids: string[];
  permissions: string[];
  company_id: string;
  language: string;
  number_precision: number;
  enable_security_password: boolean;
}

export interface ProfileProps {
  profile: ProfileType | undefined;
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
}

const Profile = () => {
  const t = useTranslation();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  const handleSave = async () => {
    if (!profile) {
      return;
    }
  };

  usePageLayoutAndActions(
    {
      title: t('profile'),
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

      <Passwords />

      <Notifications
        profile={profile}
        errors={errors}
        setProfile={setProfile}
        isLoading={isLoading}
      />

      <DeleteAccount />
    </Box>
  );
};

export default Profile;
