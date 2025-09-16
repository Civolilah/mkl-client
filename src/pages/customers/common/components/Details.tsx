/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';
import { customFieldsAtom } from 'src/App';

import {
  Box,
  Card,
  CurrenciesSelector,
  CustomField,
  Icon,
  LanguagesSelector,
  Link,
  Text,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { CustomerProps } from './CustomerForm';
import useHandleChange from '../hooks/useHandleChange';

const Details = ({
  customer,
  isLoading,
  errors,
  setCustomer,
}: CustomerProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setCustomer });

  const customFields = useAtomValue(customFieldsAtom);

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="people" size="1.35rem" />
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
          placeHolder={t('customer_name_placeholder')}
          value={customer?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          errorMessage={errors?.name && t(errors.name)}
        />
        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('number')}
            placeHolder={t('number_placeholder')}
            value={customer?.number || ''}
            onValueChange={(value) => handleChange('number', value)}
            errorMessage={errors?.number && t(errors.number)}
          />

          <TextField
            label={t('id_number')}
            placeHolder={t('id_number_placeholder')}
            value={customer?.id_number || ''}
            onValueChange={(value) => handleChange('id_number', value)}
            errorMessage={errors?.id_number && t(errors.id_number)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('vat_number')}
            placeHolder={t('vat_number_placeholder')}
            value={customer?.vat_number || ''}
            onValueChange={(value) => handleChange('vat_number', value)}
            errorMessage={errors?.vat_number && t(errors.vat_number)}
          />

          <TextField
            label={t('routing_id')}
            placeHolder={t('routing_id_placeholder')}
            value={customer?.routing_id || ''}
            onValueChange={(value) => handleChange('routing_id', value)}
            errorMessage={errors?.routing_id && t(errors.routing_id)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <TextField
            label={t('website')}
            placeHolder={t('website_placeholder')}
            value={customer?.website || ''}
            onValueChange={(value) => handleChange('website', value)}
            errorMessage={errors?.website && t(errors.website)}
          />

          <TextField
            label={t('phone')}
            placeHolder={t('phone_placeholder')}
            value={customer?.phone || ''}
            onValueChange={(value) => handleChange('phone', value)}
            errorMessage={errors?.phone && t(errors.phone)}
          />
        </Box>

        <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
          <CurrenciesSelector
            label={t('currency')}
            placeholder={t('select_currency')}
            value={customer?.currency_id || ''}
            onChange={(value) => handleChange('currency_id', value)}
            onClear={() => handleChange('currency_id', '')}
            errorMessage={errors?.currency_id && t(errors.currency_id)}
          />

          <LanguagesSelector
            label={t('language')}
            placeholder={t('select_language')}
            value={customer?.language || ''}
            onChange={(value) => handleChange('language', value)}
            onClear={() => handleChange('language', '')}
            errorMessage={errors?.language && t(errors.language)}
          />
        </Box>

        <>
          {customFields?.customer_custom_fields.some(({ label }) => label) ? (
            <Box className="flex flex-col gap-y-4">
              <CustomField
                entity="customer"
                field="custom_field1"
                value={customer?.custom_field1 || ''}
                onValueChange={(value) => handleChange('custom_field1', value)}
                customFields={customFields}
              />

              <CustomField
                entity="customer"
                field="custom_field2"
                value={customer?.custom_field2 || ''}
                onValueChange={(value) => handleChange('custom_field2', value)}
                customFields={customFields}
              />

              <CustomField
                entity="customer"
                field="custom_field3"
                value={customer?.custom_field3 || ''}
                onValueChange={(value) => handleChange('custom_field3', value)}
                customFields={customFields}
              />

              <CustomField
                entity="customer"
                field="custom_field4"
                value={customer?.custom_field4 || ''}
                onValueChange={(value) => handleChange('custom_field4', value)}
                customFields={customFields}
              />
            </Box>
          ) : (
            <Box className="flex space-x-6">
              <Text>{t('custom_fields')}</Text>

              <Link to="/settings/custom_fields?entity=customer">
                {t('add_custom_fields')}
              </Link>
            </Box>
          )}
        </>
      </Box>
    </Card>
  );
};

export default Details;
