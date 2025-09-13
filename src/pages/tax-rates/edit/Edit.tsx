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
import { endpoint, request, route, useToast } from '@helpers/index';
import { cloneDeep, isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router-dom';

import { TaxRate, ValidationErrors } from '@interfaces/index';

import {
  ActionPopoverIcon,
  AISearchAction,
  Box,
  FooterAction,
  RefreshDataElement,
} from '@components/index';
import { BreadcrumbItem } from '@components/layout/Default';

import {
  useCanEditEntity,
  useDetectChanges,
  useFetchEntity,
  useHasPermission,
  useMobileActions,
  usePageLayoutAndActions,
  useRefetch,
  useSaveAndDiscardActions,
  useTranslation,
} from '@hooks/index';

import TaxRateForm from '../common/components/TaxRateForm';
import { validateTaxRate } from '../common/helpers/helpers';
import useActions from '../common/hooks/useActions';

const Edit = () => {
  const t = useTranslation();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('tax_rates'),
      href: '/tax_rates',
    },
    {
      title: t('edit_tax_rate'),
    },
  ];

  const toast = useToast();
  const { id } = useParams();

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const canEditEntity = useCanEditEntity();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<TaxRate | undefined>();
  const [initialResponse, setInitialResponse] = useState<TaxRate | undefined>();

  const { refresh } = useFetchEntity<TaxRate>({
    queryIdentifiers: ['/api/tax_rates'],
    endpoint: '/api/tax_rates',
    setEntity: setTaxRate,
    setIsLoading,
    setInitialResponse,
    enableByPermission:
      hasPermission('create_tax_rate') ||
      hasPermission('view_tax_rate') ||
      hasPermission('edit_tax_rate'),
  });

  const actions = useActions({ refresh });

  const handleSave = async () => {
    if (!isLoading && id && taxRate) {
      if (isEqual(initialResponse, taxRate)) {
        toast.info('no_tax_rate_changes');
        return;
      }

      setErrors({});

      const validationErrors = await validateTaxRate(taxRate);

      if (validationErrors) {
        setErrors(validationErrors);
        return;
      }

      toast.loading();

      setIsLoading(true);

      request('PATCH', endpoint('/api/tax_rates/:id', { id }), taxRate)
        .then(() => {
          toast.success('updated_tax_rate');

          refetch(['tax_rates']);

          setInitialResponse(cloneDeep(taxRate));
        })
        .catch((error) => {
          if (error.response?.status === VALIDATION_ERROR_STATUS_CODE) {
            toast.dismiss();
            setErrors(error.response.data.errors);
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  usePageLayoutAndActions(
    {
      title: t('edit_tax_rate'),
      breadcrumbs: {
        breadcrumbs,
      },
      actions: {
        list: taxRate ? actions(taxRate) : [],
      },
      footer: isLargeScreen ? (
        <Box className="flex w-full items-center justify-end">
          <RefreshDataElement
            isLoading={isLoading}
            refresh={refresh}
            tooltipPlacement="left"
          />
        </Box>
      ) : (
        <Box className="flex w-full items-center justify-end h-full">
          <FooterAction
            text="tax_rates"
            onClick={() => {
              navigate(route('/tax_rates'));
            }}
            iconName="percentage"
            disabled={isLoading}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading}
          />

          <FooterAction
            text="actions"
            iconForPopover={(isOpen) => <ActionPopoverIcon isOpen={isOpen} />}
            disabled={isLoading}
            actions={taxRate ? actions(taxRate) : []}
          />

          <AISearchAction disabled={isLoading} />
        </Box>
      ),
    },
    [taxRate, isLoading, handleSave]
  );

  useEffect(() => {
    if (Object.keys(errors).length) {
      setErrors({});
    }
  }, [taxRate]);

  useEffect(() => {
    return () => {
      setErrors({});
      setTaxRate(undefined);
    };
  }, []);

  useDetectChanges({
    initialEntityValue: initialResponse,
    currentEntityValue: taxRate,
  });

  useSaveAndDiscardActions(
    {
      disabledSaveButton: Boolean(isLoading || Object.keys(errors).length),
      disabledDiscardButton: Boolean(isLoading || Object.keys(errors).length),
      disabledWithLoadingIcon: Boolean(isLoading && taxRate),
      onSaveClick: handleSave,
      onDiscardClick: () => setTaxRate(initialResponse),
      changesLabel: 'unsaved_tax_rate',
      hideBox: !canEditEntity('edit_tax_rate', 'create_tax_rate', taxRate),
    },
    [taxRate, isLoading, handleSave]
  );

  useMobileActions(
    [
      {
        iconName: 'add',
        iconSize: '1.6rem',
        onClick: () => navigate(route('/tax_rates/new')),
        visible: hasPermission('create_tax_rate'),
        disabled: isLoading,
      },
    ],
    [isLoading, isLargeScreen]
  );

  return (
    <TaxRateForm
      taxRate={taxRate}
      setTaxRate={setTaxRate}
      errors={errors}
      isLoading={isLoading && !taxRate}
      onRefresh={refresh}
    />
  );
};

export default Edit;
