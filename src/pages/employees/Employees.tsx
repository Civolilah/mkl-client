/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { route } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { User } from '@interfaces/index';

import { CreationRoute } from '@components/general/Table';
import {
  Box,
  FooterAction,
  MobileSearchAction,
  RefreshDataElement,
  Table,
  Text,
} from '@components/index';

import {
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useTranslation,
} from '@hooks/index';

import MobileCard from './common/components/MobileCard';
import useColumns from './common/hooks/useColumns';

const Employees = () => {
  const t = useTranslation();

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const isLargeScreen = useMediaQuery({
    query: '(min-width: 1024px)',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refresh } = useFetchEntity<User>({
    queryIdentifiers: ['/api/users'],
    endpoint: '/api/users',
    setEntities: setUsers,
    setIsLoading,
    listQuery: true,
    enableByPermission: hasPermission('admin'),
  });

  const columns = useColumns({
    refresh,
  });

  usePageLayoutAndActions(
    {
      title: t('employees'),
      footer: isLargeScreen ? (
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      ) : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="dashboard"
            onClick={() => {
              navigate(route('/dashboard'));
            }}
            iconName="dashboard"
            disabled={isLoading}
            iconSize="1.1rem"
          />

          <MobileSearchAction
            disabled={isLoading}
            iconSize="1.3rem"
            searchPlaceholder="search_employee_by"
          />

          <FooterAction
            text="new_employee"
            onClick={() => {
              navigate(route('/employees/new'));
            }}
            iconName="add"
            disabled={isLoading}
            iconSize="1.3rem"
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />
        </Box>
      ),
    },
    [isLoading, isLargeScreen]
  );

  return (
    <Table<User>
      columns={columns}
      data={users}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={
        [
          'first_name',
          'last_name',
          'email',
          'subsidiaries.name',
          'warehouses.name',
        ] as (keyof User)[]
      }
      creationRoute={route('/employees/new') as CreationRoute}
      creationButtonLabel={t('new_employee')}
      filterFieldPlaceHolder={t('search_employee_by')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      mobileModalRender={(entity) => (
        <Box className="flex flex-col gap-2">
          <Text>
            {entity.first_name} {entity.last_name}
          </Text>
        </Box>
      )}
    />
  );
};

export default Employees;
