/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation } from '@hooks/index';

const useLabelCategoriesAdditionalOptions = () => {
  const t = useTranslation();

  const labelCategoriesAdditionalOptions = [
    {
      label: t('color'),
      value: 'color',
    },
  ];

  return labelCategoriesAdditionalOptions;
};

export default useLabelCategoriesAdditionalOptions;
