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

import ProductSettingsCard from './common/components/ProductSettingsCard';

export interface ProductSettingsType {
  notification_threshold: number;
  send_email_notification: boolean;
  convert_product_currency: boolean;
}

const Product = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('product'),
      href: '/settings/product',
    },
  ];

  const toast = useToast();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const refetch = useRefetch();
  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFormBusy, setIsFormBusy] = useState<boolean>(false);
  const [productSettings, setProductSettings] = useState<
    ProductSettingsType | undefined
  >(undefined);
  const [initialProductSettings, setInitialProductSettings] = useState<
    ProductSettingsType | undefined
  >(undefined);

  useFetchEntity<ProductSettingsType>({
    queryIdentifiers: ['/api/companies/product_settings'],
    endpoint: '/api/companies/product_settings',
    setEntity: setProductSettings,
    setIsLoading,
    setInitialResponse: setInitialProductSettings,
    withoutQueryId: true,
    enableByPermission: false,
  });

  useDetectChanges({
    initialEntityValue: initialProductSettings,
    currentEntityValue: productSettings,
  });

  const handleSave = async () => {
    if (!productSettings) {
      return;
    }

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialProductSettings, productSettings)) {
        toast.info('no_product_settings_changes');
        return;
      }

      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/companies/product_settings', productSettings)
        .then(() => {
          toast.success('updated_product_settings');

          refetch(['product_settings']);
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
      title: t('product_settings'),
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
            iconSize="1.2rem"
            visible={hasPermission('view_dashboard')}
          />

          <FooterAction
            text="save"
            onClick={handleSave}
            iconName="save"
            disabled={isLoading || isFormBusy}
            iconSize="1.2rem"
          />

          <AISearchAction disabled={isLoading || isFormBusy} />
        </Box>
      ),
    },
    [productSettings, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setProductSettings(initialProductSettings),
      changesLabel: 'unsaved_product_settings',
    },
    [productSettings, isFormBusy, handleSave]
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      <ProductSettingsCard
        productSettings={productSettings}
        errors={errors}
        isLoading={isLoading}
        isFormBusy={isFormBusy}
        setProductSettings={setProductSettings}
      />
    </Box>
  );
};

export default Product;
