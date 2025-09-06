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

import { User, ValidationErrors } from '@interfaces/index';

import { Box } from '@components/index';

import Details from './Details';
import Permissions from './Permissions';
import useHandleChange from '../hooks/useHandleChange';

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
  const handleChange = useHandleChange({ setEmployee });

  return (
    <Box className="flex justify-center flex-col xxl:flex-row gap-4 self-start w-full lg:w-3/4 xxl:w-full pb-20">
      <Details
        employee={employee}
        editPage={editPage}
        isLoading={isLoading}
        errors={errors}
        handleChange={handleChange}
        setEmployee={setEmployee}
      />

      <Permissions
        employee={employee}
        editPage={editPage}
        isLoading={isLoading}
        errors={errors}
        handleChange={handleChange}
        setEmployee={setEmployee}
      />
    </Box>
  );
};

export default EmployeeForm;
