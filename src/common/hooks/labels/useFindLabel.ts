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

import { Label as LabelType } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindLabel = () => {
  const hasPermission = useHasPermission();

  const [labels, setLabels] = useState<LabelType[]>([]);
  const [isLoadingLabels, setIsLoadingLabels] = useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/labels'],
    endpoint: '/api/labels',
    setEntities: setLabels,
    setIsLoading: setIsLoadingLabels,
    listQuery: true,
    enableByPermission:
      hasPermission('view_label') ||
      hasPermission('create_label') ||
      hasPermission('edit_label'),
  });

  const getLabelNameByLabelId = (labelId: string) => {
    const label = labels.find((label) => label.id === labelId);

    if (!label) {
      return labelId;
    }

    return `${label.name} (${label.label_category?.name})`;
  };

  return {
    getLabelNameByLabelId,
    isLoadingLabels,
  };
};

export default useFindLabel;
