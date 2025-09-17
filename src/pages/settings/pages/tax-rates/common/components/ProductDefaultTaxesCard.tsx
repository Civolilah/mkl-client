/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Card, Icon, TaxRatesSelector, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import { TaxRatesProps } from './TaxRatesCard';
import useHandleChange from '../hooks/useHandleChange';

const ProductDefaultTaxesCard = ({
  taxRates,
  isLoading,
  setTaxRates,
}: TaxRatesProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setTaxRates });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="product" size="1.5rem" />
          </Box>

          <Text>{t('default_product_taxes')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
    >
      <Box className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
        <TaxRatesSelector
          label={t('tax_rate_1')}
          placeholder={t('select_tax_rate')}
          value={
            taxRates?.default_product_tax1_id
              ? [taxRates?.default_product_tax1_id]
              : []
          }
          onChange={(value) =>
            handleChange('default_product_tax1_id', value as string)
          }
          onCreatedTaxRate={(taxRateId) =>
            handleChange('default_product_tax1_id', taxRateId)
          }
          withActionButton
        />

        <TaxRatesSelector
          label={t('tax_rate_2')}
          placeholder={t('select_tax_rate')}
          value={
            taxRates?.default_product_tax2_id
              ? [taxRates?.default_product_tax2_id]
              : []
          }
          onChange={(value) =>
            handleChange('default_product_tax2_id', value as string)
          }
          onCreatedTaxRate={(taxRateId) =>
            handleChange('default_product_tax2_id', taxRateId)
          }
          withActionButton
        />

        <TaxRatesSelector
          label={t('tax_rate_3')}
          placeholder={t('select_tax_rate')}
          value={
            taxRates?.default_product_tax3_id
              ? [taxRates?.default_product_tax3_id]
              : []
          }
          onChange={(value) =>
            handleChange('default_product_tax3_id', value as string)
          }
          onCreatedTaxRate={(taxRateId) =>
            handleChange('default_product_tax3_id', taxRateId)
          }
          withActionButton
        />
      </Box>
    </Card>
  );
};

export default ProductDefaultTaxesCard;
