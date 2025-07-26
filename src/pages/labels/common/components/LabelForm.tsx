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

import { Label, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  RefreshDataElement,
  SelectDataField,
  Text,
  TextField,
} from '@components/index';

import { useHasPermission, useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  label: Label | undefined;
  setLabel: Dispatch<SetStateAction<Label | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
};

const LabelForm = (props: Props) => {
  const t = useTranslation();

  const {
    label,
    setLabel,
    errors,
    editPage,
    isLoading,
    onRefresh,
    onlyFields,
  } = props;

  const hasPermission = useHasPermission();

  const handleChange = useHandleChange({ setLabel });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('label_name_placeholder')}
          value={label?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        <SelectDataField
          mode="single"
          required
          label={t('label_category')}
          placeholder={t('select_label_category')}
          valueKey="id"
          labelKey="name"
          endpoint="/api/label_categories?selector=true"
          enableByPermission={
            hasPermission('create_label_category') ||
            hasPermission('view_label_category') ||
            hasPermission('edit_label_category')
          }
          value={label?.label_category_id ? [label?.label_category_id] : []}
          onChange={(value) =>
            handleChange('label_category_id', value as string)
          }
          onClear={() => handleChange('label_category_id', '')}
          errorMessage={
            errors?.label_category_id && t(errors.label_category_id)
          }
        />
      </>
    );
  }

  return (
    <Card
      title={editPage ? t('edit_label') : t('new_label')}
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
        <TextField
          required
          label={t('name')}
          placeHolder={t('label_name_placeholder')}
          value={label?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        <SelectDataField
          mode="single"
          required
          label={t('label_category')}
          placeholder={t('select_label_category')}
          valueKey="id"
          labelKey="name"
          endpoint="/api/label_categories?selector=true"
          enableByPermission={
            hasPermission('create_label_category') ||
            hasPermission('view_label_category') ||
            hasPermission('edit_label_category')
          }
          value={label?.label_category_id ? [label?.label_category_id] : []}
          onChange={(value) =>
            handleChange('label_category_id', value as string)
          }
          onClear={() => handleChange('label_category_id', '')}
          errorMessage={
            errors?.label_category_id && t(errors.label_category_id)
          }
        />

        {!editPage && (
          <InformationLabel
            text={reactStringReplace(t('label_helper'), ':label', () => (
              <Text
                key="labelBolded"
                className="text-xs md:text-xs-mid font-bold lowercase"
              >
                {t('label')}
              </Text>
            ))}
          />
        )}
      </Box>
    </Card>
  );
};

export default LabelForm;
