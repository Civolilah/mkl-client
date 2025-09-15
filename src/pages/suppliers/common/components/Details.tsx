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

import { CustomFieldsType } from '@pages/settings/pages/custom-fields/CustomFields';

import {
  Box,
  Card,
  CurrenciesSelector,
  CustomField,
  Icon,
  LanguagesSelector,
  Link,
  Spinner,
  Text,
  TextField,
} from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { SupplierProps } from '../hooks/useTabs';

const Details = ({
  supplier,
  isLoading,
  errors,
  setSupplier,
}: SupplierProps) => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const handleChange = useHandleChange({ setSupplier });

  const [isLoadingCustomFields, setIsLoadingCustomFields] =
    useState<boolean>(false);
  const [customFields, setCustomFields] = useState<
    CustomFieldsType | undefined
  >(undefined);

  useFetchEntity<CustomFieldsType>({
    queryIdentifiers: ['/api/companies/custom_fields'],
    endpoint: '/api/companies/custom_fields',
    setEntity: setCustomFields,
    setIsLoading: setIsLoadingCustomFields,
    withoutQueryId: true,
    enableByPermission: hasPermission('admin'),
  });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="truck" size="1.15rem" />
          </Box>

          <Text>{t('details')}</Text>
        </Box>
      }
      className="w-full"
      childrenParentClassName="pb-8"
      isLoading={isLoading}
      heightAuto
    >
      <Box className="flex flex-col gap-4">
        <TextField
          required
          label={t('name')}
          placeHolder={t('supplier_name_placeholder')}
          value={supplier?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('number')}
            placeHolder={t('number_placeholder')}
            value={supplier?.number || ''}
            onValueChange={(value) => handleChange('number', value)}
            changeOnBlur
            errorMessage={errors?.number && t(errors.number)}
          />

          <TextField
            label={t('id_number')}
            placeHolder={t('id_number_placeholder')}
            value={supplier?.id_number || ''}
            onValueChange={(value) => handleChange('id_number', value)}
            changeOnBlur
            errorMessage={errors?.id_number && t(errors.id_number)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('vat_number')}
            placeHolder={t('vat_number_placeholder')}
            value={supplier?.vat_number || ''}
            onValueChange={(value) => handleChange('vat_number', value)}
            changeOnBlur
            errorMessage={errors?.vat_number && t(errors.vat_number)}
          />

          <TextField
            label={t('routing_id')}
            placeHolder={t('routing_id_placeholder')}
            value={supplier?.routing_id || ''}
            onValueChange={(value) => handleChange('routing_id', value)}
            changeOnBlur
            errorMessage={errors?.routing_id && t(errors.routing_id)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('website')}
            placeHolder={t('website_placeholder')}
            value={supplier?.website || ''}
            onValueChange={(value) => handleChange('website', value)}
            changeOnBlur
            errorMessage={errors?.website && t(errors.website)}
          />

          <TextField
            label={t('phone')}
            placeHolder={t('phone_placeholder')}
            value={supplier?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            changeOnBlur
            errorMessage={errors?.phone && t(errors.phone)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <CurrenciesSelector
            label={t('currency')}
            placeholder={t('select_currency')}
            value={supplier?.currency_id || ''}
            onChange={(value) => handleChange('currency_id', value)}
            onClear={() => handleChange('currency_id', '')}
            errorMessage={errors?.currency_id && t(errors.currency_id)}
          />

          <LanguagesSelector
            label={t('language')}
            placeholder={t('select_language')}
            value={supplier?.language || ''}
            onChange={(value) => handleChange('language', value)}
            onClear={() => handleChange('language', '')}
            errorMessage={errors?.language && t(errors.language)}
          />
        </Box>

        {isLoadingCustomFields ? (
          <Box className="flex justify-center w-full py-10">
            <Spinner />
          </Box>
        ) : (
          <>
            {customFields?.supplier_custom_fields.some(({ label }) => label) ? (
              <Box className="flex flex-col gap-y-4">
                <CustomField
                  entity="supplier"
                  field="custom_field1"
                  value={supplier?.custom_field1 || ''}
                  onValueChange={(value) =>
                    handleChange('custom_field1', value)
                  }
                  customFields={customFields}
                />

                <CustomField
                  entity="supplier"
                  field="custom_field2"
                  value={supplier?.custom_field2 || ''}
                  onValueChange={(value) =>
                    handleChange('custom_field2', value)
                  }
                  customFields={customFields}
                />

                <CustomField
                  entity="supplier"
                  field="custom_field3"
                  value={supplier?.custom_field3 || ''}
                  onValueChange={(value) =>
                    handleChange('custom_field3', value)
                  }
                  customFields={customFields}
                />

                <CustomField
                  entity="supplier"
                  field="custom_field4"
                  value={supplier?.custom_field4 || ''}
                  onValueChange={(value) =>
                    handleChange('custom_field4', value)
                  }
                  customFields={customFields}
                />
              </Box>
            ) : (
              <Box className="flex space-x-6">
                <Text>{t('custom_fields')}</Text>

                <Link to="/settings/custom_fields">
                  {t('add_custom_fields')}
                </Link>
              </Box>
            )}
          </>
        )}
      </Box>
    </Card>
  );
};

export default Details;
