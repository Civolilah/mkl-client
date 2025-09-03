/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Outlet } from 'react-router-dom';

import { Box, SettingsNavItem } from '@components/index';

import { useSettingsNavItems } from '@hooks/index';

const Settings = () => {
  const navItems = useSettingsNavItems();

  return (
    <Box className="flex h-full items-start justify-start w-full">
      <Box className="flex flex-col space-y-1">
        {navItems.map((item) => (
          <SettingsNavItem key={item.key} item={item} />
        ))}
      </Box>

      <Box className="flex-1">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Settings;
