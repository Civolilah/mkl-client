/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Subsidiary } from '@interfaces/index';

import { Box, Icon, TableActionsDropdown, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

interface Props {
  entity: Subsidiary;
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
      <Box className="flex justify-between items-center gap-x-4">
        <Box className="flex-1 min-w-0 truncate">
          <Text className="font-medium">{entity.name}</Text>
        </Box>

        <TableActionsDropdown
          resource={entity}
          editPageLink="/subsidiaries/:id/edit"
          resourceType="subsidiary"
          deleteEndpoint="/api/subsidiaries/:id"
          refresh={refresh}
          resourceName={entity.name}
          resourceQueryIdentifier="subsidiaries"
        />
      </Box>

      <Box className="flex flex-col gap-y-2">
        <Box className="flex items-center gap-x-2">
          <Box style={{ width: '1.5rem' }}>
            <Icon
              name="locationDot"
              size="1.3rem"
              style={{ color: '#3b82f6' }}
            />
          </Box>

          <Text className="truncate text-sm-plus flex-1">
            {entity.address || entity.city
              ? `${entity.address || ''}${
                  entity.city ? `, ${entity.city}` : ''
                }`
              : t('no_entry')}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileCard;
