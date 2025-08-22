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

import { Subsidiary as SubsidiaryType } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindSubsidiary = () => {
  const hasPermission = useHasPermission();

  const [subsidiaries, setSubsidiaries] = useState<SubsidiaryType[]>([]);
  const [isLoadingSubsidiaries, setIsLoadingSubsidiaries] =
    useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/subsidiaries', 'selector'],
    endpoint: '/api/subsidiaries?selector=true',
    setEntities: setSubsidiaries,
    setIsLoading: setIsLoadingSubsidiaries,
    listQuery: true,
    enableByPermission:
      hasPermission('view_subsidiary') ||
      hasPermission('create_subsidiary') ||
      hasPermission('edit_subsidiary'),
  });

  const findSubsidiaryById = (subsidiaryId: string) => {
    const subsidiary = subsidiaries.find(
      (subsidiary) => subsidiary.id === subsidiaryId
    );

    return subsidiary;
  };

  return {
    findSubsidiaryById,
    isLoadingSubsidiaries,
  };
};

export default useFindSubsidiary;
