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

import { LabelCategory } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const LabelCategories = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [labelCategories, setLabelCategories] = useState<LabelCategory[]>([]);

  const { refresh } = useFetchEntity<LabelCategory>({
    queryIdentifiers: ['/api/label_categories'],
    endpoint: '/api/label_categories',
    setEntities: setLabelCategories,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_label_category') ||
      hasPermission('view_label_category') ||
      hasPermission('edit_label_category'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('label_categories')}
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
      <Table<LabelCategory>
        columns={columns}
        data={labelCategories}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/label_categories/new"
        creationButtonLabel={t('new_label_category')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default LabelCategories;
