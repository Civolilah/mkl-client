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

import { Status } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Statuses = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [statuses, setStatuses] = useState<Status[]>([]);

  const { refresh } = useFetchEntity<Status>({
    queryKey: '/api/statuses',
    setEntities: setStatuses,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_status') ||
      hasPermission('view_status') ||
      hasPermission('edit_status'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('statuses')}
      footer={
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement isLoading={isLoading} refresh={refresh} />
        </Box>
      }
    >
      <Table<Status>
        columns={columns}
        data={statuses}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/statuses/new"
        creationButtonLabel={t('new_status')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Statuses;
