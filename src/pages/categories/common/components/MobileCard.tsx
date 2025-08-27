/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Category } from '@interfaces/index';

import { Box, TableActionsDropdown, Text } from '@components/index';

import { useColors } from '@hooks/index';

interface Props {
  entity: Category;
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
          editPageLink="/categories/:id/edit"
          resourceType="category"
          deleteEndpoint="/api/categories/:id"
          refresh={refresh}
          resourceName={entity.name}
          resourceQueryIdentifier="categories"
        />
      </Box>
    </Box>
  );
};

export default MobileCard;
