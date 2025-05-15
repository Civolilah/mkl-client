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

import { Category } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Categories = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { refresh } = useFetchEntity<Category>({
    queryKey: '/api/categories',
    setEntities: setCategories,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_category') ||
      hasPermission('view_category') ||
      hasPermission('edit_category'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('categories')}
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
      <Table<Category>
        columns={columns}
        data={categories}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/categories/new"
        creationButtonLabel={t('new_category')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Categories;
