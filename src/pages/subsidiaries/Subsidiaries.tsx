/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Default } from '@components/index';

import { useTranslation } from '@hooks/index';

const Subsidiaries = () => {
  const t = useTranslation();

  return <Default title={t('subsidiaries')}>Subsidiaries</Default>;
};

export default Subsidiaries;
