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
import { useNavigate } from 'react-router-dom';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useTranslation } from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';

const Create = () => {
  const t = useTranslation();

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

  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [subsidiary, setSubsidiary] = useState<Subsidiary | undefined>(
    INITIAL_SUBSIDIARY
  );

  const handleCancel = () => {
    setSubsidiary(INITIAL_SUBSIDIARY);
  };

  const handleSave = () => {
    if (!isFormBusy) {
      setIsFormBusy(true);
      toast.loading();

      request('POST', '/api/subsidiaries', subsidiary)
        .then((response) => {
          toast.success('created_subsidiary');

          navigate(route('/subsidiaries/:id/edit', { id: response.data.id }));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
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

  return (
    <Default
      title={t('new_subsidiary')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      onCancelClick={handleCancel}
      disabledSaveButton={isFormBusy}
      disabledCancelButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <SubsidiaryForm
        subsidiary={subsidiary}
        setSubsidiary={setSubsidiary}
        errors={errors}
      />
    </Default>
  );
};

export default Create;
