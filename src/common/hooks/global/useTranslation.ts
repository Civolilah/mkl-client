/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslations as useBaseTranslation } from 'next-intl';

type Params = {
  section: 'LoginPage' | 'NavigationMenu';
};

const useTranslation = (params?: Params) => {
  const t = useBaseTranslation(params?.section);

  return t;
};

export default useTranslation;
