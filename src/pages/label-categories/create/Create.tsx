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
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { LabelCategory, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import LabelCategoryForm from '../common/components/LabelCategoryForm';
import { validateLabelCategory } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

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

  const refetch = useRefetch();
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

          refetch(['label_categories']);

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

  usePageLayoutAndActions(
    {
      title: t('new_subsidiary'),
      breadcrumbs: {
        breadcrumbs,
      },
      buttonAction: {
        isLoading: isFormBusy,
        isDisabled: isFormBusy,
        onClick: handleSave,
        disabledWithLoadingIcon: isFormBusy,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="label_categories"
            onClick={() => {
              navigate(route('/label_categories'));
            }}
            iconName="tags"
            disabled={isFormBusy}
            iconSize="1.2rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
            iconSize="1.2rem"
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [labelCategory, isFormBusy, handleSave]
  );

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
    <LabelCategoryForm
      labelCategory={labelCategory}
      setLabelCategory={setLabelCategory}
      errors={errors}
    />
  );
};

export default Create;
