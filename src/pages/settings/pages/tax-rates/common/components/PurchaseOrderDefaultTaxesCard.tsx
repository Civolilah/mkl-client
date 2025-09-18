/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';

import { Box, Card, Icon, TaxRatesSelector, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { TaxRatesProps } from './TaxRatesCard';
import useHandleChange from '../hooks/useHandleChange';

const PurchaseOrderDefaultTaxesCard = ({
  taxRates,
  isLoading,
  isFetching,
  initialResponse,
  setTaxRates,
  isFormBusy,
}: TaxRatesProps) => {
  const t = useTranslation();

  const colors = useColors();

  const handleChange = useHandleChange({ setTaxRates });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="fileInvoiceDollar" size="1.15rem" />
          </Box>

          <Text>{t('default_purchase_order_taxes')}</Text>
        </Box>
      }
      className="w-full"
      childrenParentClassName={classNames({
        'pb-0': Number(taxRates?.number_of_purchase_order_taxes || '0') === 0,
        'pb-6': Number(taxRates?.number_of_purchase_order_taxes || '0') > 0,
      })}
      isLoading={isLoading && !initialResponse}
    >
      {Number(taxRates?.number_of_purchase_order_taxes || '0') > 0 ? (
        <Box className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
          <TaxRatesSelector
            label={t('tax_rate_1')}
            placeholder={t('select_tax_rate')}
            value={
              taxRates?.default_purchase_order_tax1_id
                ? [taxRates?.default_purchase_order_tax1_id]
                : []
            }
            onChange={(value) =>
              handleChange('default_purchase_order_tax1_id', value as string)
            }
            onCreatedTaxRate={(taxRateId) =>
              handleChange('default_purchase_order_tax1_id', taxRateId)
            }
            withActionButton
            disabled={isFormBusy || isLoading || isFetching}
          />

          {Number(taxRates?.number_of_purchase_order_taxes || '0') > 1 && (
            <TaxRatesSelector
              label={t('tax_rate_2')}
              placeholder={t('select_tax_rate')}
              value={
                taxRates?.default_purchase_order_tax2_id
                  ? [taxRates?.default_purchase_order_tax2_id]
                  : []
              }
              onChange={(value) =>
                handleChange('default_purchase_order_tax2_id', value as string)
              }
              onCreatedTaxRate={(taxRateId) =>
                handleChange('default_purchase_order_tax2_id', taxRateId)
              }
              withActionButton
              disabled={isFormBusy || isLoading || isFetching}
            />
          )}

          {Number(taxRates?.number_of_purchase_order_taxes || '0') > 2 && (
            <TaxRatesSelector
              label={t('tax_rate_3')}
              placeholder={t('select_tax_rate')}
              value={
                taxRates?.default_purchase_order_tax3_id
                  ? [taxRates?.default_purchase_order_tax3_id]
                  : []
              }
              onChange={(value) =>
                handleChange('default_purchase_order_tax3_id', value as string)
              }
              onCreatedTaxRate={(taxRateId) =>
                handleChange('default_purchase_order_tax3_id', taxRateId)
              }
              withActionButton
              disabled={isFormBusy || isLoading || isFetching}
            />
          )}
        </Box>
      ) : (
        <Box className="flex flex-col justify-center items-center pt-2">
          <Text className="font-medium">
            {t('no_purchase_order_taxes_enabled')}
          </Text>

          <Text className="text-xs" style={{ color: colors.$16 }}>
            {t('no_purchase_order_taxes_enabled_helper')}
          </Text>
        </Box>
      )}
    </Card>
  );
};

export default PurchaseOrderDefaultTaxesCard;
