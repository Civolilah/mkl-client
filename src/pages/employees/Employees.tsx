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

import { User } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Employees = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

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

  return (
    <Default
      title={t('employees')}
      footer={
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      }
    >
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
          ] as (keyof User)[]
        }
        creationRoute="/employees/new"
        creationButtonLabel={t('new_employee')}
        filterFieldPlaceHolder={t('search_employee_by')}
      />
    </Default>
  );
};

export default Employees;
