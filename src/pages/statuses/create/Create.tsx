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
import { useNavigate } from 'react-router-dom';

import { Status, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useRefetch, useTranslation } from '@hooks/index';

import Form from '../common/components/Form';
import { validateStatus } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

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

  return (
    <Default
      title={t('new_status')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <Form status={status} setStatus={setStatus} errors={errors} />
    </Default>
  );
};

export default Create;
