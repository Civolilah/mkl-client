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

import classNames from 'classnames';
import reactStringReplace from 'react-string-replace';

import { Status, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  ColorPicker,
  InformationLabel,
  RefreshDataElement,
  Text,
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
  onlyFields?: boolean;
};

const Form = (props: Props) => {
  const t = useTranslation();

  const {
    status,
    setStatus,
    editPage,
    isLoading,
    onRefresh,
    errors,
    onlyFields,
  } = props;

  const handleChange = useHandleChange({ setStatus });

  if (onlyFields) {
    return (
      <>
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
      </>
    );
  }

  return (
    <Card
      title={editPage ? t('edit_status') : t('new_status')}
      className="w-full md:w-3/4 xl:w-1/2"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
      paddingBottom={!editPage ? '0rem' : undefined}
    >
      <Box
        className={classNames('flex flex-col space-y-7', { 'pb-2': editPage })}
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

        {!editPage && (
          <InformationLabel
            text={reactStringReplace(t('status_helper'), ':status', () => (
              <Text
                key="statusBolded"
                className="text-xs md:text-xs font-bold lowercase"
              >
                {t('status')}
              </Text>
            ))}
          />
        )}
      </Box>
    </Card>
  );
};

export default Form;
