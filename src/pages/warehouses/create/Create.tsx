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
  INITIAL_WAREHOUSE,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors, Warehouse } from '@interfaces/index';

import { Default } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import { useRefetch, useTranslation } from '@hooks/index';

import WarehouseForm from '../common/components/WarehouseForm';
import { validateWarehouse } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('warehouses'),
      href: '/warehouses',
    },
    {
      title: t('new_warehouse'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [warehouse, setWarehouse] = useState<Warehouse | undefined>(
    INITIAL_WAREHOUSE
  );

  const handleSave = async () => {
    if (!warehouse) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateWarehouse(warehouse);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/warehouses', warehouse)
        .then((response) => {
          toast.success('created_warehouse');

          refetch(['warehouses']);

          navigate(route('/warehouses/:id/edit', { id: response.data.id }));
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
  }, [warehouse]);

  useEffect(() => {
    return () => {
      setErrors({});
      setWarehouse(INITIAL_WAREHOUSE);
    };
  }, []);

  return (
    <Default
      title={t('new_warehouse')}
      breadcrumbs={breadcrumbs}
      onSaveClick={handleSave}
      disabledSaveButton={isFormBusy}
      disabledSaveButtonWithLoadingIcon={isFormBusy}
    >
      <WarehouseForm
        warehouse={warehouse}
        setWarehouse={setWarehouse}
        errors={errors}
      />
    </Default>
  );
};

export default Create;
