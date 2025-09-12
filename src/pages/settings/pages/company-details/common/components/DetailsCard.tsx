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

import { Card } from '@components/index';

import { useTranslation } from '@hooks/index';

const DetailsCard = () => {
  const t = useTranslation();

  return (
    <Card className="w-full" title={t('details')}>
      DetailsCard
    </Card>
  );
};

export default DetailsCard;
