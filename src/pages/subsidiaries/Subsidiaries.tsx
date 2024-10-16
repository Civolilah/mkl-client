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

import { Default, Table } from '@components/index';

import { useFetchEntity, useTranslation } from '@hooks/index';

import useColumns from './common/hooks/useColumns';

const Subsidiaries = () => {
  const t = useTranslation();

  const columns = useColumns();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subsidiaries, setSubsidiaries] = useState<Subsidiary[]>([]);

  const { refresh } = useFetchEntity({
    queryKey: '/api/subsidiaries',
    setEntities: setSubsidiaries,
    setIsLoading,
    listQuery: true,
  });

  return (
    <Default title={t('subsidiaries')}>
      <Table
        columns={columns}
        data={subsidiaries}
        isDataLoading={isLoading}
        handleRefresh={refresh}
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
