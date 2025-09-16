/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Box, Card } from '@components/index';

import { useTranslation } from '@hooks/index';

import { SupplierProps } from '../hooks/useTabs';

const CustomFields = ({ isLoading }: SupplierProps) => {
  const t = useTranslation();

  return (
    <Card
      title={t('custom_fields')}
      className="w-full"
      childrenParentClassName="pb-8"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">Custom fields</Box>
    </Card>
  );
};

export default CustomFields;
