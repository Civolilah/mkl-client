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

import { INITIAL_LABEL, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Label, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import LabelForm from '../common/components/LabelForm';
import { validateLabel } from '../common/helpers/helpers';

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

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [label, setLabel] = useState<Label | undefined>(INITIAL_LABEL);

  const handleSave = async () => {
    if (!label) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateLabel(label);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/labels', label)
        .then((response) => {
          toast.success('created_label');

          refetch(['labels']);

          navigate(route('/labels/:id/edit', { id: response.data.id }));
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
      title: t('new_label'),
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
            text="labels"
            onClick={() => {
              navigate(route('/labels'));
            }}
            iconName="tag"
            disabled={isFormBusy}
            iconSize="1.05rem"
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
            iconSize="1.3rem"
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [label, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [label]);

  useEffect(() => {
    return () => {
      setErrors({});
      setLabel(INITIAL_LABEL);
    };
  }, []);

  return <LabelForm label={label} setLabel={setLabel} errors={errors} />;
};

export default Create;
