/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import { Default } from '@components/index';

import { useTranslation } from '@hooks/index';

const Statuses = () => {
  const t = useTranslation();

  return <Default title={t('statuses')}>Statuses</Default>;
};

export default Statuses;
