/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Supplier } from '@interfaces/index';

import { Box, Icon, TableActionsDropdown, Text } from '@components/index';

import { useColors } from '@hooks/index';

interface Props {
  entity: Supplier;
  refresh: () => void;
}

const MobileCard = ({ entity, refresh }: Props) => {
  const colors = useColors();

  return (
    <Box
      className="flex flex-col gap-y-3 p-3 border shadow-sm w-full"
      style={{ borderColor: colors.$1, backgroundColor: colors.$2 }}
    >
      <Box className="flex justify-between items-center gap-x-4">
        <Box className="flex-1 min-w-0 truncate">
          <Text className="font-medium">{entity.name}</Text>
        </Box>

        <TableActionsDropdown
          resource={entity}
          editPageLink="/suppliers/:id/edit"
          resourceType="supplier"
          deleteEndpoint="/api/suppliers/:id"
          refresh={refresh}
          resourceName={entity.name}
          resourceQueryIdentifier="suppliers"
        />
      </Box>

      <Box className="flex items-center gap-x-2">
        <Box style={{ width: '1.5rem' }}>
          <Icon name="tags" size="1.25rem" />
        </Box>

        <Text className="truncate text-sm-plus flex-1">
          <Box>{entity.currency_id}</Box>
        </Text>
      </Box>
    </Box>
  );
};

export default MobileCard;
