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

const ProductDefaultTaxesCard = ({ taxRates, isLoading }: TaxRatesProps) => {
  const t = useTranslation();

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
      ProductDefaultTaxesCard
    </Card>
  );
};

export default ProductDefaultTaxesCard;
