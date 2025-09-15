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
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors, Warehouse } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import WarehouseForm from '../common/components/WarehouseForm';
import { validateWarehouse } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

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

  usePageLayoutAndActions(
    {
      title: t('new_warehouse'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="warehouses"
            onClick={() => {
              navigate(route('/warehouses'));
            }}
            iconName="warehouse"
            disabled={isFormBusy}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isFormBusy}
          />

          <AISearchAction disabled={isFormBusy} />
        </Box>
      ),
    },
    [warehouse, isFormBusy, handleSave]
  );

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

  useDetectChanges({
    initialEntityValue: INITIAL_WAREHOUSE,
    currentEntityValue: warehouse,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isFormBusy || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isFormBusy || Object.keys(errors).length),
      onSaveClick: handleSave,
      onDiscardClick: () => setWarehouse(INITIAL_WAREHOUSE),
      changesLabel: 'unsaved_warehouse',
      visibleBox: true,
    },
    [warehouse, isFormBusy, handleSave]
  );

  return (
    <WarehouseForm
      warehouse={warehouse}
      setWarehouse={setWarehouse}
      errors={errors}
    />
  );
};

export default Create;
