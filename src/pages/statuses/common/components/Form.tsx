/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { Status } from '@interfaces/index';

import { Box, Card, ColorPicker, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import { useHandleChange } from '../hooks/useHandleChange';

type Props = {
  status: Status | undefined;
  setStatus: Dispatch<SetStateAction<Status | undefined>>;
};

const Form = (props: Props) => {
  const t = useTranslation();

  const { status, setStatus } = props;

  const handleChange = useHandleChange({ setStatus });

  return (
    <Card title={t('new_status')} className="w-full md:w-3/4 xl:w-1/2 pb-6">
      <Box className="flex flex-col space-y-6">
        <TextField
          required
          placeHolder={t('status_name_placeholder')}
          label={t('name')}
          value={status?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
        />

        <ColorPicker
          label={t('color')}
          value={status?.color || ''}
          onValueChange={(value) => handleChange('color', value)}
        />
      </Box>
    </Card>
  );
};

export default Form;
