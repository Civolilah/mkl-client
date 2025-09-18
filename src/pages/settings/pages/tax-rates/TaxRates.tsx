/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { AISearchAction, Box, FooterAction } from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useDetectChanges,
  useFetchEntity,
  useHasPermission,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import InvoiceDefaultTaxesCard from './common/components/InvoiceDefaultTaxesCard';
import ProductDefaultTaxesCard from './common/components/ProductDefaultTaxesCard';
import PurchaseOrderDefaultTaxesCard from './common/components/PurchaseOrderDefaultTaxesCard';
import TaxRatesCard from './common/components/TaxRatesCard';

export interface TaxesByCustomer {
  customer_id: string;
  tax1_id: string;
  tax2_id: string;
  tax3_id: string;
}

export interface TaxRatesType {
  number_of_order_taxes: string;
  number_of_product_taxes: string;
  number_of_purchase_order_taxes: string;
  inclusive_taxes: boolean;
  uniform_customer_taxes: boolean;
  default_invoice_tax1_id: string;
  default_invoice_tax2_id: string;
  default_invoice_tax3_id: string;
  default_product_tax1_id: string;
  default_product_tax2_id: string;
  default_product_tax3_id: string;
  default_purchase_order_tax1_id: string;
  default_purchase_order_tax2_id: string;
  default_purchase_order_tax3_id: string;
  taxes_by_customer: TaxesByCustomer[];
}

const TaxRates = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('tax_rates'),
      href: '/settings/tax_rates',
    },
  ];

  const toast = useToast();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [taxRates, setTaxRates] = useState<TaxRatesType | undefined>(undefined);
  const [initialTaxRates, setInitialTaxRates] = useState<
    TaxRatesType | undefined
  >(undefined);

  const { isLoading, isFetching } = useFetchEntity<TaxRatesType>({
    queryIdentifiers: ['/api/companies/tax_rates_settings'],
    endpoint: '/api/companies/tax_rates',
    setEntity: setTaxRates,
    setInitialResponse: setInitialTaxRates,
    withoutQueryId: true,
    enableByPermission: hasPermission('admin'),
  });

  useDetectChanges({
    initialEntityValue: initialTaxRates,
    currentEntityValue: taxRates,
  });

  const handleSave = async () => {
    if (!taxRates) {
      return;
    }

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialTaxRates, taxRates)) {
        toast.info('no_tax_rates_changes');
        return;
      }

      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/companies/tax_rates', taxRates)
        .then(() => {
          toast.success('updated_tax_rates_settings');

          refetch(['tax_rates_settings']);
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
      title: t('tax_rates'),
      breadcrumbs: {
        breadcrumbs,
      },
      footer: !isLargeScreen && (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="dashboard"
            onClick={() => {
              navigate(route('/dashboard'));
            }}
            iconName="dashboard"
            disabled={isLoading || isFormBusy}
            visible={hasPermission('view_dashboard')}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading || isFormBusy}
          />

          <AISearchAction disabled={isLoading || isFormBusy} />
        </Box>
      ),
    },
    [taxRates, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setTaxRates(initialTaxRates),
      changesLabel: 'unsaved_tax_rates',
    },
    [taxRates, isFormBusy, handleSave]
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      <TaxRatesCard
        taxRates={taxRates}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
        setTaxRates={setTaxRates}
        isFetching={isFetching}
        initialResponse={initialTaxRates}
      />

      <InvoiceDefaultTaxesCard
        taxRates={taxRates}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
        setTaxRates={setTaxRates}
        isFetching={isFetching}
        initialResponse={initialTaxRates}
      />

      <ProductDefaultTaxesCard
        taxRates={taxRates}
        isLoading={isLoading}
        errors={errors}
        isFormBusy={isFormBusy}
        setTaxRates={setTaxRates}
        isFetching={isFetching}
        initialResponse={initialTaxRates}
      />

      <PurchaseOrderDefaultTaxesCard
        taxRates={taxRates}
        isLoading={isLoading}
        errors={errors}
        isFormBusy={isFormBusy}
        setTaxRates={setTaxRates}
        isFetching={isFetching}
        initialResponse={initialTaxRates}
      />
    </Box>
  );
};

export default TaxRates;
