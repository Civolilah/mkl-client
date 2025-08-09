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

import { Warehouse } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Warehouses = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const { refresh } = useFetchEntity<Warehouse>({
    queryIdentifiers: ['/api/warehouses'],
    endpoint: '/api/warehouses',
    setEntities: setWarehouses,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_warehouse') ||
      hasPermission('view_warehouse') ||
      hasPermission('edit_warehouse'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('warehouses')}
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
      <Table<Warehouse>
        columns={columns}
        data={warehouses}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/warehouses/new"
        creationButtonLabel={t('new_warehouse')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Warehouses;
