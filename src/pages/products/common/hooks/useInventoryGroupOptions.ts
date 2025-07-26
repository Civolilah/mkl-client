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

export type QuantityGroup = 'default' | 'variant';

export type QuantityGroupOption = {
  label: string;
  value: QuantityGroup;
};

const useInventoryGroupOptions = () => {
  const t = useTranslation();

  const options: QuantityGroupOption[] = [
    { label: t('default'), value: 'default' },
    { label: t('variant'), value: 'variant' },
  ];

  return options;
};

export default useInventoryGroupOptions;
