/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ItemType } from 'antd/es/menu/interface';

import { User } from '@interfaces/index';

import { Icon, Text } from '@components/index';
import { Box } from '@components/index';

import { useTranslation } from '@hooks/index';

import Details from '../components/Details';
import Permissions from '../components/Permissions';

type Params = {
  employee: User | undefined;
  editPage: boolean | undefined;
  isLoading: boolean | undefined;
  onRefresh?: () => void;
  actions: ItemType[];
  errors: Record<string, string>;
  handleChange: (field: keyof User, value: string) => void;
};

const useTabs = (params: Params) => {
  const t = useTranslation();

  const {
    employee,
    editPage,
    isLoading,
    onRefresh,
    actions,
    errors,
    handleChange,
  } = params;

  const tabs = [
    {
      key: 'details',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="person" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      ),
      children: (
        <Details
          employee={employee}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          actions={actions}
          errors={errors}
          handleChange={handleChange}
        />
      ),
    },
    {
      key: 'permissions',
      label: (
        <Box className="flex item-center space-x-3">
          <Box className="mt-0.5">
            <Icon name="security" />
          </Box>

          <Text>{t('permissions')}</Text>
        </Box>
      ),
      children: (
        <Permissions
          employee={employee}
          editPage={editPage}
          isLoading={isLoading}
          onRefresh={onRefresh}
          actions={actions}
          errors={errors}
          handleChange={handleChange}
        />
      ),
    },
  ];

  return tabs;
};

export default useTabs;
