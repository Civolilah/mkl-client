/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { User } from '@interfaces/index';

import {
  Box,
  CopyToClipboard,
  Icon,
  TableActionsDropdown,
  Text,
} from '@components/index';

import { useAccentColor, useColors } from '@hooks/index';

interface Props {
  entity: User;
  refresh: () => void;
}

const MobileCard = ({ entity, refresh }: Props) => {
  const colors = useColors();

  const accentColor = useAccentColor();

  return (
    <Box
      className="flex flex-col gap-y-3 p-3 border shadow-sm w-full"
      style={{ borderColor: colors.$1, backgroundColor: colors.$2 }}
    >
      <Box className="flex justify-between items-center gap-x-4">
        <Box className="flex-1 min-w-0 truncate">
          <Text className="font-medium">
            {entity.first_name} {entity.last_name}
          </Text>
        </Box>

        <TableActionsDropdown
          resource={entity}
          editPageLink="/employees/:id/edit"
          resourceType="employee"
          deleteEndpoint="/api/users/:id/delete_employee"
          refresh={refresh}
          resourceName={`${
            entity.first_name || entity.last_name
              ? (entity.first_name || '') +
                (entity.last_name ? ' ' + entity.last_name : '')
              : entity.email
          }`}
          resourceQueryIdentifier="users"
        />
      </Box>

      <Box className="flex flex-col gap-y-2">
        <Box className="flex items-center gap-x-2">
          <Box style={{ width: '1.5rem' }}>
            <Icon name="email" size="1.3rem" style={{ color: accentColor }} />
          </Box>

          <CopyToClipboard text={entity.email} withoutClickOpenOnMobile>
            <Text className="truncate text-sm-plus flex-1">{entity.email}</Text>
          </CopyToClipboard>
        </Box>

        {entity.phone && (
          <Box className="flex items-center gap-x-2">
            <Box style={{ width: '1.5rem' }}>
              <Icon name="phone" size="1rem" style={{ color: accentColor }} />
            </Box>
            <CopyToClipboard text={entity.phone} withoutClickOpenOnMobile>
              <Text className="text-sm-plus truncate flex-1">
                {entity.phone}
              </Text>
            </CopyToClipboard>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MobileCard;
