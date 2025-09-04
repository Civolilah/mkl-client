/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { User, ValidationErrors } from '@interfaces/index';

import { Box, StaticTabs } from '@components/index';

import useHandleChange from '../hooks/useHandleChange';
import useTabs from '../hooks/useTabs';

interface Props {
  employee: User | undefined;
  setEmployee: Dispatch<SetStateAction<User | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
}

const EmployeeForm = ({
  employee,
  setEmployee,
  errors,
  editPage,
  isLoading,
}: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = useHandleChange({ setEmployee });

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') ?? 'details'
  );

  const tabs = useTabs({
    employee,
    editPage,
    isLoading,
    errors,
    handleChange,
    setEmployee,
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

  return (
    <Box className="flex w-full self-start md:w-full xl:w-3/4">
      <StaticTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default EmployeeForm;
