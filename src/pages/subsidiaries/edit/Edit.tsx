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

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { endpoint, request, useToast } from '@helpers/index';
import { cloneDeep } from 'lodash';
import { useParams } from 'react-router-dom';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useFetchEntity, useTranslation } from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';

const Edit = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('subsidiaries'),
      href: '/subsidiaries',
    },
    {
      title: t('edit_subsidiary'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subsidiary, setSubsidiary] = useState<Subsidiary | undefined>();
  const [initialResponse, setInitialResponse] = useState<
    Subsidiary | undefined
  >();

  const { refresh } = useFetchEntity({
    queryKey: '/api/subsidiaries',
    setEntity: setSubsidiary,
    setIsLoading,
    setInitialResponse,
  });

  const handleCancel = () => {
    setSubsidiary(initialResponse);
  };

  const handleSave = () => {
    if (!isLoading && id) {
      setIsLoading(true);
      toast.loading();

      request('PATCH', endpoint('/api/subsidiaries/:id', { id }), subsidiary)
        .then(() => {
          toast.success('updated_subsidiary');
          setInitialResponse(cloneDeep(subsidiary));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            setErrors(error.response.data.errors);
          }

          toast.dismiss();
        })
        .finally(() => setIsLoading(false));
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
      setSubsidiary(undefined);
    };
  }, []);

  return (
    <Default
      title={t('edit_subsidiary')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      onCancelClick={handleCancel}
      disabledSaveButton={isLoading}
      disabledCancelButton={isLoading}
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && subsidiary)}
    >
      <SubsidiaryForm
        subsidiary={subsidiary}
        setSubsidiary={setSubsidiary}
        errors={errors}
        editPage
        isLoading={isLoading}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
