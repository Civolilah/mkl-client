/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { TaxRate } from '@interfaces/index';

import { Box, TableActionsDropdown, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

interface Props {
  entity: TaxRate;
  refresh: () => void;
}

const MobileCard = ({ entity, refresh }: Props) => {
  const t = useTranslation();

  const colors = useColors();

  return (
    <Box
      className="flex flex-col gap-y-3 p-3 border shadow-sm w-full"
      style={{ borderColor: colors.$1, backgroundColor: colors.$2 }}
    >
      <Box className="flex justify-between items-start gap-x-4">
        <Box className="flex flex-col gap-y-1 min-w-0">
          <Text className="font-medium truncate">{entity.name}</Text>

          <Text>
            {entity.rate} {t('percent_symbol')}
          </Text>
        </Box>

        <TableActionsDropdown
          resource={entity}
          editPageLink="/tax_rates/:id/edit"
          resourceType="tax_rate"
          deleteEndpoint="/api/tax_rates/:id"
          refresh={refresh}
          resourceName={entity.name}
          resourceQueryIdentifier="tax_rates"
        />
      </Box>
    </Box>
  );
};

export default MobileCard;
