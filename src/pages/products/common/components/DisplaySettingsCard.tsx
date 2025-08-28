/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Product, ValidationErrors } from '@interfaces/index';

import { Box } from '@components/index';
import { Card } from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  isLoading?: boolean;
  product: Product | undefined;
  errors: ValidationErrors;
}

const DisplaySettingsCard = ({ isLoading }: Props) => {
  const t = useTranslation();

  return (
    <Card
      className="w-full"
      childrenParentClassName="pb-8"
      title={t('display_settings')}
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">tt</Box>
    </Card>
  );
};

export default DisplaySettingsCard;
