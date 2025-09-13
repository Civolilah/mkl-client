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
  INITIAL_TAX_RATE,
  VALIDATION_ERROR_STATUS_CODE,
} from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { TaxRate, ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import TaxRateForm from '../common/components/TaxRateForm';
import { validateTaxRate } from '../common/helpers/helpers';

const Create = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('tax_rates'),
      href: '/tax_rates',
    },
    {
      title: t('new_tax_rate'),
    },
  ];

  const toast = useToast();

  const refetch = useRefetch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<TaxRate | undefined>(INITIAL_TAX_RATE);

  const handleSave = async () => {
    if (!taxRate) {
      return;
    }

    if (!isFormBusy) {
      setErrors({});

      const validationErrors = await validateTaxRate(taxRate);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsFormBusy(true);

      request('POST', '/api/tax_rates', taxRate)
        .then((response) => {
          toast.success('created_tax_rate');

          refetch(['tax_rates']);

          navigate(route('/tax_rates/:id/edit', { id: response.data.id }));
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
      title: t('new_tax_rate'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: isLargeScreen ? undefined : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="tax_rates"
            onClick={() => {
              navigate(route('/tax_rates'));
            }}
            iconName="tags"
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
    [taxRate, isFormBusy, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [taxRate]);

  useEffect(() => {
    return () => {
      setErrors({});
      setTaxRate(INITIAL_TAX_RATE);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: INITIAL_TAX_RATE,
    currentEntityValue: taxRate,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isFormBusy || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isFormBusy || Object.keys(errors).length),
      onSaveClick: handleSave,
      onDiscardClick: () => setTaxRate(INITIAL_TAX_RATE),
      changesLabel: 'unsaved_tax_rate',
      visibleBox: true,
    },
    [taxRate, isFormBusy, handleSave]
  );

  return (
    <TaxRateForm taxRate={taxRate} setTaxRate={setTaxRate} errors={errors} />
  );
};

export default Create;
