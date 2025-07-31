/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import {
  INITIAL_CATEGORY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { Category, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useRefetch, useTranslation } from '@hooks/index';

import CategoryForm from '../common/components/CategoryForm';
import { validateCategory } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('categories'),
      href: '/categories',
    },
    {
      title: t('new_category'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [category, setCategory] = useState<Category | undefined>(
    INITIAL_CATEGORY
  );

  const handleSave = async () => {
    if (!category) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateCategory(category);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/categories', category)
        .then((response) => {
          toast.success('created_category');

          refetch(['categories']);

          navigate(route('/categories/:id/edit', { id: response.data.id }));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsFormBusy(false));
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [category]);

  useEffect(() => {
    return () => {
      setErrors({});
      setCategory(INITIAL_CATEGORY);
    };
  }, []);

  return (
    <Default
      title={t('new_category')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <CategoryForm
        category={category}
        setCategory={setCategory}
        errors={errors}
      />
    </Default>
  );
};

export default Create;
