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

import useHandleChange from '../hooks/useHandleChange';
import { ProfileProps } from '../hooks/useTabs';

const Preferences = ({ profile, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('preferences')} className="w-full">
      Preferences
    </Card>
  );
};

export default Preferences;
