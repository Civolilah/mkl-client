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

import { Supplier } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Suppliers = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  const { refresh } = useFetchEntity<Supplier>({
    queryKey: '/api/suppliers',
    setEntities: setSuppliers,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_supplier') ||
      hasPermission('view_supplier') ||
      hasPermission('edit_supplier'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('suppliers')}
      footer={
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement isLoading={isLoading} refresh={refresh} />
        </Box>
      }
    >
      <Table<Supplier>
        columns={columns}
        data={suppliers}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/suppliers/new"
        creationButtonLabel={t('new_supplier')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Suppliers;
