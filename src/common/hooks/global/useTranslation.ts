/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation as useBaseTranslation } from 'react-i18next';

const useTranslation = () => {
  const [t] = useBaseTranslation();

  return t;
};

export default useTranslation;
