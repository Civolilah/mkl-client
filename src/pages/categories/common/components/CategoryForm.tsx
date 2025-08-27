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

import { Category, ValidationErrors } from '@interfaces/index';

import { Box, Card, TextField } from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  category: Category | undefined;
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
};

const CategoryForm = ({
  category,
  setCategory,
  errors,
  editPage,
  isLoading,
  onlyFields,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setCategory });

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('category_name_placeholder')}
          value={category?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Card
      title={editPage ? t('edit_category') : t('new_category')}
      className="w-full md:w-3/4 xl:w-1/2"
      isLoading={isLoading}
    >
      <Box className="pb-2">
        <TextField
          required
          label={t('name')}
          placeHolder={t('category_name_placeholder')}
          value={category?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </Box>
    </Card>
  );
};

export default CategoryForm;
