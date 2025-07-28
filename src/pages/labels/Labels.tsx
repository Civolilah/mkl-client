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

import { Label } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Labels = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [labels, setLabels] = useState<Label[]>([]);

  const { refresh } = useFetchEntity<Label>({
    queryIdentifiers: ['/api/labels'],
    endpoint: '/api/labels',
    setEntities: setLabels,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_label') ||
      hasPermission('view_label') ||
      hasPermission('edit_label'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('labels')}
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
      <Table<Label>
        columns={columns}
        data={labels}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/labels/new"
        creationButtonLabel={t('new_label')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Labels;
