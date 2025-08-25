/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Status } from '@interfaces/index';

import { Box, Icon, TableActionsDropdown, Text } from '@components/index';

import { useColors } from '@hooks/index';

import ColorColumn from './ColorColumn';

interface Props {
  entity: Status;
  refresh: () => void;
}

const MobileCard = ({ entity, refresh }: Props) => {
  const colors = useColors();

  return (
    <Box
      className="flex flex-col gap-y-3 p-3 border shadow-sm w-full"
      style={{ borderColor: colors.$1 }}
    >
      <Box className="flex justify-between items-center gap-x-4">
        <Box className="flex-1 min-w-0 truncate">
          <Text className="font-medium">{entity.name}</Text>
        </Box>

        <TableActionsDropdown
          resource={entity}
          editPageLink="/statuses/:id/edit"
          resourceType="status"
          deleteEndpoint="/api/statuses/:id"
          refresh={refresh}
          resourceName={entity.name}
          resourceQueryIdentifier="statuses"
        />
      </Box>

      <Box className="flex items-center gap-x-2">
        <Box style={{ width: '1.5rem' }}>
          <Icon
            name="colorPalette"
            size="1.3rem"
            style={{ color: '#3b82f6' }}
          />
        </Box>

        <Text className="truncate text-sm-plus flex-1">
          <Box style={{ minWidth: '9rem' }}>
            <ColorColumn color={entity.color} />
          </Box>
        </Text>
      </Box>
    </Box>
  );
};

export default MobileCard;
