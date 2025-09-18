/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  LabelElement,
  NumberTaxRatesSelector,
  Text,
  Toggle,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { TaxRatesType } from '../../TaxRates';
import useHandleChange from '../hooks/useHandleChange';

export interface TaxRatesProps {
  taxRates: TaxRatesType | undefined;
  isLoading: boolean;
  isFetching: boolean;
  errors: ValidationErrors;
  isFormBusy: boolean;
  initialResponse: TaxRatesType | undefined;
  setTaxRates: Dispatch<SetStateAction<TaxRatesType | undefined>>;
}

const TaxRatesCard = ({
  taxRates,
  isLoading,
  isFetching,
  isFormBusy,
  errors,
  initialResponse,
  setTaxRates,
}: TaxRatesProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setTaxRates });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="percentage" size="1.25rem" />
          </Box>

          <Text>{t('tax_rates')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading && !initialResponse}
    >
      <Box className="flex flex-col gap-y-4">
        <LabelElement
          label={t('number_of_order_taxes')}
          helpLabel={t('number_of_order_taxes_help')}
          withoutOptionalText
          twoGridColumns
        >
          <NumberTaxRatesSelector
            value={taxRates?.number_of_order_taxes?.toString() || '0'}
            onValueChange={(value) =>
              handleChange('number_of_order_taxes', value)
            }
            withoutOptionalText
            disabled={isFormBusy || isLoading || isFetching}
            errorMessage={
              errors.number_of_order_taxes && t(errors.number_of_order_taxes)
            }
          />
        </LabelElement>

        <LabelElement
          label={t('number_of_product_taxes')}
          helpLabel={t('number_of_product_taxes_help')}
          withoutOptionalText
          twoGridColumns
        >
          <NumberTaxRatesSelector
            value={taxRates?.number_of_product_taxes?.toString() || '0'}
            onValueChange={(value) =>
              handleChange('number_of_product_taxes', value)
            }
            withoutOptionalText
            disabled={isFormBusy || isLoading || isFetching}
            errorMessage={
              errors.number_of_product_taxes &&
              t(errors.number_of_product_taxes)
            }
          />
        </LabelElement>

        <LabelElement
          label={t('number_of_purchase_order_taxes')}
          helpLabel={t('number_of_purchase_order_taxes_help')}
          withoutOptionalText
          twoGridColumns
        >
          <NumberTaxRatesSelector
            value={taxRates?.number_of_purchase_order_taxes?.toString() || '0'}
            onValueChange={(value) =>
              handleChange('number_of_purchase_order_taxes', value)
            }
            withoutOptionalText
            disabled={isFormBusy || isLoading || isFetching}
            errorMessage={
              errors.number_of_purchase_order_taxes &&
              t(errors.number_of_purchase_order_taxes)
            }
          />
        </LabelElement>

        <LabelElement
          label={t('inclusive_tax')}
          helpLabel={
            taxRates?.inclusive_taxes
              ? t('exclusive_tax_help')
              : t('inclusive_tax_help')
          }
          withoutOptionalText
          twoGridColumns
        >
          <Toggle
            checked={Boolean(taxRates?.inclusive_taxes)}
            onChange={(value) => handleChange('inclusive_taxes', value)}
            disabled={isFormBusy || isLoading || isFetching}
          />
        </LabelElement>
      </Box>
    </Card>
  );
};

export default TaxRatesCard;
