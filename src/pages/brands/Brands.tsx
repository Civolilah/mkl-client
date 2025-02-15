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

import { Brand } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Brands = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  const { refresh } = useFetchEntity<Brand>({
    queryKey: '/api/brands',
    setEntities: setBrands,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_brand') ||
      hasPermission('view_brand') ||
      hasPermission('edit_brand'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('brands')}
      footer={
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement isLoading={isLoading} refresh={refresh} />
        </Box>
      }
    >
      <Table<Brand>
        columns={columns}
        data={brands}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/brands/new"
        creationButtonLabel={t('new_brand')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Brands;
