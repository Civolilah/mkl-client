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

import { INITIAL_STATUS, VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Status, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  usePageLayoutAndActions,
  useRefetch,
  useTranslation,
} from '@hooks/index';

import Form from '../common/components/Form';
import { validateStatus } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('statuses'),
      href: '/statuses',
    },
    {
      title: t('new_status'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [status, setStatus] = useState<Status | undefined>(INITIAL_STATUS);

  const handleSave = async () => {
    if (!status) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateStatus(status);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/statuses', status)
        .then((response) => {
          toast.success('created_status');

          refetch(['statuses']);

          navigate(route('/statuses/:id/edit', { id: response.data.id }));
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
  }, [status]);

  useEffect(() => {
    return () => {
      setErrors({});
      setStatus(INITIAL_STATUS);
    };
  }, []);

  usePageLayoutAndActions(
    {
      title: t('new_status'),
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
            text="statuses"
            onClick={() => {
              navigate(route('/statuses'));
            }}
            iconName="assignment"
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
    [status, isFormBusy, handleSave]
  );

  return <Form status={status} setStatus={setStatus} errors={errors} />;
};

export default Create;
