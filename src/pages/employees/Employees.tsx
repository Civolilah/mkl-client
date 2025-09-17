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
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
  Table,
} from '@components/index';

import {
  useFetchEntity,
  useHasPermission,
  useMobileActions,
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
            onClick={() => navigate(route('/dashboard'))}
            iconName="dashboard"
            disabled={isLoading}
            visible={hasPermission('view_dashboard')}
          />

          <FooterAction
            text="reload"
            onClick={refresh}
            iconName="refresh"
            disabled={isLoading}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [isLoading, isLargeScreen]
  );

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/employees/new')),
        visible: true,
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <Table<User>
      columns={columns}
      data={users}
      isDataLoading={isLoading}
      enableFiltering
      filteringProps={['first_name', 'last_name', 'email']}
      creationRoute={route('/employees/new') as CreationRoute}
      creationButtonLabel={t('new_employee')}
      filterFieldPlaceHolder={t('search_employee_by')}
      turnOnMobilePreview
      mobileCardRender={(entity) => (
        <MobileCard entity={entity} refresh={refresh} />
      )}
      onMobileCardClick={(entity) => {
        navigate(route('/employees/:id/show', { id: entity.id || '' }));
      }}
    />
  );
};

export default Employees;
