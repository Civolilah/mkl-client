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

import { ColorPicker, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

type Props = {
  status: Status;
  setStatus: Dispatch<SetStateAction<Status>>;
};

const Form = (props: Props) => {
  const t = useTranslation();

  const { status, setStatus } = props;

  const handleChange = (value: string, property: keyof Status) => {
    setStatus((currentStatus) => ({ ...currentStatus, [property]: value }));
  };

  return (
    <div className="flex flex-col space-y-6">
      <TextField
        required
        label={t('name')}
        value={status.name}
        onValueChange={(value) => handleChange(value, 'name')}
      />

      <ColorPicker
        label={t('color')}
        value={status.color}
        onValueChange={(value) => handleChange(value, 'color')}
      />
    </div>
  );
};

export default Form;
