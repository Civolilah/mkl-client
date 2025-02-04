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

import { LabelCategory, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  RefreshDataElement,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  labelCategory: LabelCategory | undefined;
  setLabelCategory: Dispatch<SetStateAction<LabelCategory | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
};

const LabelCategoryForm = (props: Props) => {
  const t = useTranslation();

  const {
    labelCategory,
    setLabelCategory,
    errors,
    editPage,
    isLoading,
    onRefresh,
  } = props;

  const handleChange = useHandleChange({ setLabelCategory });

  return (
    <Card
      title={editPage ? t('edit_label_category') : t('new_label_category')}
      className="w-full md:w-3/4 xl:w-1/2"
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
      paddingBottom={!editPage ? '0rem' : undefined}
    >
      <Box
        className={classNames('flex flex-col space-y-7', { 'pb-2': editPage })}
      >
        <TextField
          required
          label={t('name')}
          placeHolder={t('label_category_name_placeholder')}
          value={labelCategory?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        {!editPage && (
          <InformationLabel
            text={reactStringReplace(
              t('label_category_helper'),
              ':labelCategory',
              () => (
                <Text key="labelCategoryBolded" className="font-bold lowercase">
                  {t('label_category')}
                </Text>
              )
            )}
          />
        )}
      </Box>
    </Card>
  );
};

export default LabelCategoryForm;
