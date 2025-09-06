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

import { ProfileProps } from '../../Profile';

const Notifications = ({
  profile,
  errors,
  setProfile,
  isLoading,
}: ProfileProps) => {
  const t = useTranslation();

  return (
    <Card title={t('notifications')} className="w-full">
      Notifications
    </Card>
  );
};

export default Notifications;
