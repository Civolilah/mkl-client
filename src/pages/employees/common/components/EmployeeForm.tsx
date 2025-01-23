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

import { User, ValidationErrors } from '@interfaces/index';

import { Box, StaticTabs } from '@components/index';

import useHandleChange from '../hooks/useHandleChange';
import useTabs from '../hooks/useTabs';

type Props = {
  employee: User | undefined;
  setEmployee: Dispatch<SetStateAction<User | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
};

const EmployeeForm = (props: Props) => {
  const { employee, setEmployee, errors, editPage, isLoading, onRefresh } =
    props;

  const handleChange = useHandleChange({ setEmployee });

  const [activeTab, setActiveTab] = useState<string>('details');

  const tabs = useTabs({
    employee,
    editPage,
    isLoading,
    onRefresh,
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

      if (isErrorFromDetailsPage) {
        setActiveTab('details');
      }
    }
  }, [errors]);

  return (
    <Box className="flex w-full self-start md:w-3/4 xl:w-2/3">
      <StaticTabs
        tabs={tabs}
        type="card"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default EmployeeForm;
