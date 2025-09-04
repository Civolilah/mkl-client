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

import { Button, Card, LabelElement } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { ProfileProps } from '../hooks/useTabs';

const Passwords = ({ profile, errors, setProfile }: ProfileProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProfile });

  return (
    <Card title={t('password')} className="w-full">
      <LabelElement label={t('password')} withoutOptionalText>
        <Button>{t('change_password')}</Button>
      </LabelElement>

      <LabelElement label={t('security_password')} withoutOptionalText>
        <Button>{t('change_security_password')}</Button>
      </LabelElement>
    </Card>
  );
};

export default Passwords;
