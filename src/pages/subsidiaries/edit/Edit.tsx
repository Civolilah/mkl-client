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
import { cloneDeep, isEqual } from 'lodash';
import { useParams } from 'react-router-dom';

import { Subsidiary, ValidationErrors } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useFetchEntity, useTranslation } from '@hooks/index';

import SubsidiaryForm from '../common/components/SubsidiaryForm';
import { validateSubsidiary } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

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

  const actions = useActions({ resourceName: subsidiary?.name || '' });

  const { refresh } = useFetchEntity<Subsidiary>({
    queryKey: '/api/subsidiaries',
    setEntity: setSubsidiary,
    setIsLoading,
    setInitialResponse,
  });

  const handleSave = async () => {
    if (!isLoading && id && subsidiary) {
      if (isEqual(initialResponse, subsidiary)) {
        toast.success('updated_subsidiary');
        return;
      }

      setErrors({});

      const validationErrors = await validateSubsidiary(subsidiary);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

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
      actions={actions}
      onSaveClick={handleSave}
      disabledSaveButton={isLoading}
      disabledSaveButtonWithLoadingIcon={Boolean(isLoading && subsidiary)}
    >
      <SubsidiaryForm
        subsidiary={subsidiary}
        setSubsidiary={setSubsidiary}
        errors={errors}
        editPage
        isLoading={isLoading && !subsidiary}
        onRefresh={refresh}
      />
    </Default>
  );
};

export default Edit;
