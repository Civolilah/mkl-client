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
  INITIAL_LABEL_CATEGORY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { LabelCategory, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import LabelCategoryForm from '../common/components/LabelCategoryForm';
import { validateLabelCategory } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('label_categories'),
      href: '/label_categories',
    },
    {
      title: t('new_label_category'),
    },
  ];

  const toast = useToast();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [labelCategory, setLabelCategory] = useState<LabelCategory | undefined>(
    INITIAL_LABEL_CATEGORY
  );

  const handleSave = async () => {
    if (!labelCategory) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateLabelCategory(labelCategory);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/label_categories', labelCategory)
        .then((response) => {
          toast.success('created_label_category');

          navigate(
            route('/label_categories/:id/edit', { id: response.data.id })
          );
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
  }, [labelCategory]);

  useEffect(() => {
    return () => {
      setErrors({});
      setLabelCategory(INITIAL_LABEL_CATEGORY);
    };
  }, []);

  return (
    <Default
      title={t('new_label_category')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <LabelCategoryForm
        labelCategory={labelCategory}
        setLabelCategory={setLabelCategory}
        errors={errors}
      />
    </Default>
  );
};

export default Create;
