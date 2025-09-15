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
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { Supplier, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  useInitialSupplier,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import SupplierForm from '../common/components/SupplierForm';
import { validateSupplier } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('suppliers'),
      href: '/suppliers',
    },
    {
      title: t('new_supplier'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const { INITIAL_SUPPLIER } = useInitialSupplier();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [supplier, setSupplier] = useState<Supplier | undefined>(
    INITIAL_SUPPLIER
  );

  const handleSave = async () => {
    if (!supplier) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateSupplier(supplier);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/suppliers', supplier)
        .then((response) => {
          toast.success('created_supplier');

          refetch(['suppliers']);

          navigate(route('/suppliers/:id/edit', { id: response.data.id }));
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
      title: t('new_supplier'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="suppliers"
            onClick={() => {
              navigate(route('/suppliers'));
            }}
            iconName="truck"
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
    [supplier, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [supplier]);

  useEffect(() => {
    return () => {
      setErrors({});
      setSupplier(INITIAL_SUPPLIER);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: INITIAL_SUPPLIER,
    currentEntityValue: supplier,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isFormBusy || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isFormBusy || Object.keys(errors).length),
      onSaveClick: handleSave,
      onDiscardClick: () => setSupplier(INITIAL_SUPPLIER),
      changesLabel: 'unsaved_supplier',
      visibleBox: true,
    },
    [supplier, isFormBusy, handleSave]
  );

  return (
    <SupplierForm
      supplier={supplier}
      setSupplier={setSupplier}
      errors={errors}
    />
  );
};

export default Create;
