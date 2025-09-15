/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMemo, useState } from 'react';

import { VALIDATION_ERROR_STATUS_CODE } from '@constants/index';
import { request, route, useToast } from '@helpers/index';
import { isEqual } from 'lodash';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { ValidationErrors } from '@interfaces/index';

import { IconName } from '@components/general/Icon';
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

import CustomFieldsCard from './common/components/CustomFieldsCard';

export interface CustomField {
  label: string;
  type: string;
  value: string;
}

export interface CustomFieldsType {
  order_custom_fields: CustomField[];
  product_custom_fields: CustomField[];
  customer_custom_fields: CustomField[];
  purchase_order_custom_fields: CustomField[];
  supplier_custom_fields: CustomField[];
}

interface CustomFieldsCard {
  iconName: IconName;
  title: string;
  iconSize: string;
  entity: 'order' | 'product' | 'customer' | 'purchase_order' | 'supplier';
}

const CustomFields = () => {
  const t = useTranslation();

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: t('settings'),
      href: '/settings/profile',
    },
    {
      title: t('profile'),
      href: '/settings/profile',
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
  const [customFields, setCustomFields] = useState<
    CustomFieldsType | undefined
  >(undefined);
  const [initialCustomFields, setInitialCustomFields] = useState<
    CustomFieldsType | undefined
  >(undefined);

  useFetchEntity<CustomFieldsType>({
    queryIdentifiers: ['/api/companies/custom_fields'],
    endpoint: '/api/companies/custom_fields',
    setEntity: setCustomFields,
    setIsLoading,
    setInitialResponse: setInitialCustomFields,
    withoutQueryId: true,
    enableByPermission: hasPermission('admin'),
  });

  useDetectChanges({
    initialEntityValue: initialCustomFields,
    currentEntityValue: customFields,
  });

  const handleSave = async () => {
    if (!customFields) {
      return;
    }

    if (!isFormBusy && !isLoading) {
      if (isEqual(initialCustomFields, customFields)) {
        toast.info('no_custom_fields_changes');
        return;
      }

      setErrors({});

      toast.loading();

      setIsFormBusy(true);

      request('PATCH', '/api/companies/custom_fields', customFields)
        .then(() => {
          toast.success('updated_custom_fields');

          refetch(['custom_fields']);
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
      title: t('custom_fields'),
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
    [customFields, isLoading, isFormBusy, handleSave]
  );

  useSaveAndDiscardActions(
    {
      disabledSaveButton: isFormBusy,
      disabledDiscardButton: isFormBusy,
      onSaveClick: handleSave,
      onDiscardClick: () => setCustomFields(initialCustomFields),
      changesLabel: 'unsaved_custom_fields',
    },
    [customFields, isFormBusy, handleSave]
  );

  const customFieldsCards = useMemo<CustomFieldsCard[]>(
    () => [
      {
        iconName: 'clipboardList',
        title: 'order_custom_fields',
        iconSize: '1.25rem',
        entity: 'order',
      },
      {
        iconName: 'product',
        title: 'product_custom_fields',
        iconSize: '1.4rem',
        entity: 'product',
      },
      {
        iconName: 'fileInvoiceDollar',
        title: 'purchase_order_custom_fields',
        iconSize: '1.2rem',
        entity: 'purchase_order',
      },
      {
        iconName: 'customer',
        title: 'customer_custom_fields',
        iconSize: '1.4rem',
        entity: 'customer',
      },
      {
        iconName: 'truck',
        title: 'supplier_custom_fields',
        iconSize: '1.2rem',
        entity: 'supplier',
      },
    ],
    []
  );

  return (
    <Box className="flex flex-col gap-y-4 w-full pb-20">
      {customFieldsCards.map((card) => (
        <CustomFieldsCard
          key={card.entity}
          customFields={customFields}
          errors={errors}
          isLoading={isLoading}
          isFormBusy={isFormBusy}
          setCustomFields={setCustomFields}
          iconName={card.iconName}
          title={card.title}
          iconSize={card.iconSize}
          entity={card.entity}
        />
      ))}
    </Box>
  );
};

export default CustomFields;
