/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import {
  Box,
  Card,
  CurrenciesSelector,
  LanguagesSelector,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { SupplierProps } from '../hooks/useTabs';

const Details = ({
  supplier,
  isLoading,
  errors,
  setSupplier,
}: SupplierProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setSupplier });

  return (
    <Card
      title={t('details')}
      className="w-full"
      childrenParentClassName="pb-8"
      isLoading={isLoading}
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
          value={supplier?.language_id || ''}
          onChange={(value) => handleChange('language_id', value)}
          onClear={() => handleChange('language_id', '')}
        />
      </Box>
    </Card>
  );
};

export default Details;
