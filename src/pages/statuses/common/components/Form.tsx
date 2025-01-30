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

import { Status, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  ColorPicker,
  RefreshDataElement,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { useHandleChange } from '../hooks/useHandleChange';

type Props = {
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  status: Status | undefined;
  errors: ValidationErrors | undefined;
  setStatus: Dispatch<SetStateAction<Status | undefined>>;
};

const Form = (props: Props) => {
  const t = useTranslation();

  const { status, setStatus, editPage, isLoading, onRefresh, errors } = props;

  const handleChange = useHandleChange({ setStatus });

  return (
    <Card
      title={editPage ? t('edit_status') : t('new_status')}
      className="w-full md:w-3/4 xl:w-1/2 pb-6"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement
            isLoading={isLoading}
            refresh={onRefresh}
            iconSize="1.45rem"
          />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-6">
        <TextField
          required
          placeHolder={t('status_name_placeholder')}
          label={t('name')}
          value={status?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        <ColorPicker
          label={t('color')}
          value={status?.color || ''}
          onValueChange={(value) => handleChange('color', value)}
          errorMessage={errors?.color && t(errors.color)}
        />
      </Box>
    </Card>
  );
};

export default Form;
