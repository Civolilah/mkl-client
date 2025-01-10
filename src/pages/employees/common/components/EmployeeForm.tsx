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

import { Box, StaticTabs } from '@components/index';

import useActions from '../hooks/useActions';
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

  const actions = useActions();

  const handleChange = useHandleChange({ setEmployee });

  const tabs = useTabs({
    employee,
    editPage,
    isLoading,
    onRefresh,
    actions,
    errors,
    handleChange,
  });

  return (
    <Box className="flex w-full self-start md:w-3/4 xl:w-2/3">
      <StaticTabs defaultActiveKey="details" tabs={tabs} type="card" />
    </Box>
  );
};

export default EmployeeForm;
