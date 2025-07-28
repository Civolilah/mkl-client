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

import { Product } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Products = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const { refresh } = useFetchEntity<Product>({
    queryIdentifiers: ['/api/products'],
    endpoint: '/api/products',
    setEntities: setProducts,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_product') ||
      hasPermission('view_product') ||
      hasPermission('edit_product'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('products')}
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
      <Table<Product>
        columns={columns}
        data={products}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/products/new"
        creationButtonLabel={t('new_product')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Products;
