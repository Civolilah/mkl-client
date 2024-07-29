/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useTranslation as useBaseTranslation } from 'next-i18next';

interface Params {
  namespace: 'index';
}
const useTranslation = (params?: Params) => {
  const { namespace = 'common' } = params || {};

  const [t] = useBaseTranslation(namespace);

  return [t];
};

export default useTranslation;
