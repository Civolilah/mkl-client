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

import ChangePasswordModal from './ChangePasswordModal';
import ChangeSecurityPasswordModal from './ChangeSecurityPasswordModal';
import { ProfileType } from '../../Profile';

interface Props {
  profile: ProfileType | undefined;
  isLoading: boolean;
}

const Passwords = ({ profile, isLoading }: Props) => {
  const t = useTranslation();

  return (
    <Card
      title={t('passwords')}
      className="w-full"
      paddingBottom="0"
      isLoading={isLoading}
    >
      <ChangePasswordModal />

      <ChangeSecurityPasswordModal profile={profile} />
    </Card>
  );
};

export default Passwords;
