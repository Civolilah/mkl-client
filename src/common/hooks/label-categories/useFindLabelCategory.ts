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

import { LabelCategory as LabelCategoryType } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindLabelCategory = () => {
  const hasPermission = useHasPermission();

  const [labelCategories, setLabelCategories] = useState<LabelCategoryType[]>(
    []
  );
  const [isLoadingLabelCategories, setIsLoadingLabelCategories] =
    useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/label_categories'],
    endpoint: '/api/label_categories',
    setEntities: setLabelCategories,
    setIsLoading: setIsLoadingLabelCategories,
    listQuery: true,
    enableByPermission:
      hasPermission('view_label_category') ||
      hasPermission('create_label_category') ||
      hasPermission('edit_label_category'),
  });

  const getLabelCategoryNameByLabelCategoryId = (labelCategoryId: string) => {
    const labelCategory = labelCategories.find(
      (labelCategory) => labelCategory.id === labelCategoryId
    );

    if (!labelCategory) {
      return labelCategoryId;
    }

    return labelCategory.name;
  };

  return {
    getLabelCategoryNameByLabelCategoryId,
    isLoadingLabelCategories,
  };
};

export default useFindLabelCategory;
