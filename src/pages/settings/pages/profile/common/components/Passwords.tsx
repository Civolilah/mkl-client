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

import { Box, Card, Icon, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import ChangePasswordModal from './ChangePasswordModal';
import ChangeSecurityPasswordModal from './ChangeSecurityPasswordModal';
import { ProfileType } from '../../Profile';

interface Props {
  profile: ProfileType | undefined;
  isLoading: boolean;
  isFormBusy: boolean;
}

const Passwords = ({ profile, isLoading, isFormBusy }: Props) => {
  const t = useTranslation();

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="key" size="1.45rem" />
          </Box>

          <Text>{t('passwords')}</Text>
        </Box>
      }
      className="w-full"
      paddingBottom="0"
      isLoading={isLoading}
    >
      <ChangePasswordModal isFormBusy={isFormBusy} />

      <ChangeSecurityPasswordModal profile={profile} isFormBusy={isFormBusy} />
    </Card>
  );
};

export default Passwords;
