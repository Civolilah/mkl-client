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

import { ValidationErrors } from '@interfaces/index';

import { Box } from '@components/index';

import { usePageLayoutAndActions, useTranslation } from '@hooks/index';

import Details from './common/components/Details';
import Passwords from './common/components/Passwords';
import Preferences from './common/components/Preferences';

interface ProfileType {
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
}

export interface ProfileProps {
  profile: ProfileType | undefined;
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
  errors: ValidationErrors;
  isLoading: boolean;
}

const Profile = () => {
  const t = useTranslation();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  usePageLayoutAndActions(
    {
      title: t('profile'),
    },
    []
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

      <Passwords
        profile={profile}
        errors={errors}
        setProfile={setProfile}
        isLoading={isLoading}
      />
    </Box>
  );
};

export default Profile;
