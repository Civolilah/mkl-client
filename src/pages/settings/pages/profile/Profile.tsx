/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { Box, StaticTabs } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { usePageLayoutAndActions, useTranslation } from '@hooks/index';

import useTabs, { Profile as ProfileType } from './common/hooks/useTabs';

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

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') ?? 'details'
  );

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [profile, setProfile] = useState<ProfileType | undefined>(undefined);

  const tabs = useTabs({
    profile,
    isLoading,
    errors,
    setProfile,
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      const isErrorFromDetailsPage = Object.keys(errors).some(
        (key) =>
          key.includes('first_name') ||
          key.includes('last_name') ||
          key.includes('email') ||
          key.includes('password') ||
          key.includes('subsidiaries')
      );

      const isErrorFromPermissionsPage = Object.keys(errors).some((key) =>
        key.includes('permissions')
      );

      if (isErrorFromDetailsPage) {
        setActiveTab('details');
      } else if (isErrorFromPermissionsPage) {
        setActiveTab('permissions');
      }
    }
  }, [errors]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', activeTab);
      return newParams;
    });
  }, [activeTab]);

  useEffect(() => {
    if (searchParams.get('tab') && searchParams.get('tab') !== activeTab) {
      setActiveTab(searchParams.get('tab') as string);
    }
  }, [searchParams]);

  usePageLayoutAndActions(
    {
      title: t('profile'),
      breadcrumbs: {
        breadcrumbs,
      },
    },
    []
  );

  return (
    <Box className="flex w-full">
      <StaticTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default Profile;
