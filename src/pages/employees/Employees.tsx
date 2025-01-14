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

import { useFetchEntity, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Employees = () => {
  const t = useTranslation();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { refresh } = useFetchEntity<User>({
    queryKey: '/api/users',
    setEntities: setUsers,
    setIsLoading,
    listQuery: true,
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('employees')}
      footer={
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement isLoading={isLoading} refresh={refresh} />
        </Box>
      }
    >
      <Table<User>
        columns={columns}
        data={users}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['first_name', 'last_name', 'email']}
        creationRoute="/employees/new"
        creationButtonLabel={t('new_employee')}
        filterFieldPlaceHolder={t('search_employee_by')}
        scrollX="70rem"
      />
    </Default>
  );
};

export default Employees;
