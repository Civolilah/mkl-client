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

const useTabs = ({
  employee,
  editPage,
  isLoading,
  onRefresh,
  errors,
  handleChange,
  setEmployee,
}: EmployeeProps) => {
  const t = useTranslation();

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="person" size="1.3rem" />
          </Box>

          <Text className="text-sm">{t('details')}</Text>
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
        <Box className="flex item-center space-x-2 px-5 py-0.5">
          <Box>
            <Icon name="security" size="1.25rem" />
          </Box>

          <Text className="text-sm">{t('permissions')}</Text>
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
