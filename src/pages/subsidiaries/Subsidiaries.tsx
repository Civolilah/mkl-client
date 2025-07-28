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

import { Subsidiary } from '@interfaces/index';

import { Box, Default, RefreshDataElement, Table } from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Subsidiaries = () => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);

  const { refresh } = useFetchEntity<Subsidiary>({
    queryIdentifiers: ['/api/subsidiaries'],
    endpoint: '/api/subsidiaries',
    setEntities: setSubsidiaries,
    setIsLoading,
    listQuery: true,
    enableByPermission:
      hasPermission('create_subsidiary') ||
      hasPermission('view_subsidiary') ||
      hasPermission('edit_subsidiary'),
  });

  const columns = useColumns({
    refresh,
  });

  return (
    <Default
      title={t('subsidiaries')}
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
      <Table<Subsidiary>
        columns={columns}
        data={subsidiaries}
        isDataLoading={isLoading}
        enableFiltering
        filteringProps={['name']}
        creationRoute="/subsidiaries/new"
        creationButtonLabel={t('new_subsidiary')}
        filterFieldPlaceHolder={t('search_by_name')}
      />
    </Default>
  );
};

export default Subsidiaries;
