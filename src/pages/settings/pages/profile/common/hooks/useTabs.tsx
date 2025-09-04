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

import { ValidationErrors } from '@interfaces/index';

import { Icon, Text } from '@components/index';
import { Box } from '@components/index';

import { useTranslation } from '@hooks/index';

import Details from '../components/Details';
import Passwords from '../components/Passwords';
import Preferences from '../components/Preferences';

export interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
  state: string;
  company_name: string;
  company_address: string;
  company_city: string;
  company_country: string;
}

export interface ProfileProps {
  profile: Profile | undefined;
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
  errors: ValidationErrors | undefined;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const useTabs = ({ profile, isLoading, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="person" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('details')}</Text>
        </Box>
      ),
      children: (
        <Details
          profile={profile}
          isLoading={isLoading}
          errors={errors}
          setProfile={setProfile}
        />
      ),
    },

    {
      key: 'preferences',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="cogs" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('preferences')}</Text>
        </Box>
      ),
      children: (
        <Preferences
          profile={profile}
          errors={errors}
          setProfile={setProfile}
        />
      ),
    },
    {
      key: 'passwords',
      label: (
        <Box className="flex justify-center item-center space-x-2 md:px-5 py-0.5">
          <Box>
            <Icon name="password" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('passwords')}</Text>
        </Box>
      ),
      children: (
        <Passwords profile={profile} errors={errors} setProfile={setProfile} />
      ),
    },
  ];

  return tabs;
};

export default useTabs;
