/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Card, Icon, Text } from '@components/index';

import { useTranslation } from '@hooks/index';

import { TaxRatesProps } from './TaxRatesCard';

const InvoiceDefaultTaxesCard = ({ taxRates, isLoading }: TaxRatesProps) => {
  const t = useTranslation();

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="clipboardList" size="1.25rem" />
          </Box>

          <Text>{t('default_order_taxes')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
    >
      InvoiceDefaultTaxesCard
    </Card>
  );
};

export default InvoiceDefaultTaxesCard;
