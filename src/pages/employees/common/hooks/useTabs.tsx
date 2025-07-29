/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Icon, Text } from '@components/index';
import { Box } from '@components/index';

import { useTranslation } from '@hooks/index';

import Details, { EmployeeProps } from '../components/Details';
import Permissions from '../components/Permissions';

const useTabs = (params: EmployeeProps) => {
  const t = useTranslation();

  const {
    employee,
    editPage,
    isLoading,
    onRefresh,
    errors,
    handleChange,
    setEmployee,
  } = params;

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="person" size="1rem" />
          </Box>

          <Text className="text-xs">{t('details')}</Text>
        </Box>
      ),
      children: (
        <Details
          employee={employee}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
          setEmployee={setEmployee}
        />
      ),
    },
    {
      key: 'permissions',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="security" size="1rem" />
          </Box>

          <Text className="text-xs">{t('permissions')}</Text>
        </Box>
      ),
      children: (
        <Permissions
          employee={employee}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          errors={errors}
          handleChange={handleChange}
          setEmployee={setEmployee}
        />
      ),
    },
  ];

  return tabs;
};

export default useTabs;
