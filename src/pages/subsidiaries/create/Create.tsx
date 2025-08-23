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
  INITIAL_SUBSIDIARY,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';
import { validateSubsidiary } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('subsidiaries'),
      href: '/subsidiaries',
    },
    {
      title: t('new_subsidiary'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [subsidiary, setSubsidiary] = useState<Subsidiary | undefined>(
    INITIAL_SUBSIDIARY
  );

  const handleSave = async () => {
    if (!subsidiary) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateSubsidiary(subsidiary);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/subsidiaries', subsidiary)
        .then((response) => {
          toast.success('created_subsidiary');

          refetch(['subsidiaries']);

          navigate(route('/subsidiaries/:id/edit', { id: response.data.id }));
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
  }, [subsidiary]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSubsidiary(INITIAL_SUBSIDIARY);
    };
  }, []);

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
            text="subsidiaries"
            onClick={() => {
              navigate(route('/subsidiaries'));
            }}
            iconName="subsidiary"
            disabled={isFormBusy}
            iconSize="1.3rem"
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
    [subsidiary, isFormBusy, handleSave]
  );

  return (
    <SubsidiaryForm
      subsidiary={subsidiary}
      setSubsidiary={setSubsidiary}
      errors={errors}
    />
  );
};

export default Create;
