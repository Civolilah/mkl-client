/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect } from 'react';

import { route } from '@helpers/index';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Box, SettingsNavItem } from '@components/index';

import { useSettingsNavItems } from '@hooks/index';

const Settings = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const navItems = useSettingsNavItems();

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate(route('/settings/profile'));
    }
  }, [location.pathname]);

  return (
    <Box className="flex h-full items-start justify-start w-full md:gap-x-10">
      <Box className="flex flex-col">
        {navItems.map((item) => (
          <SettingsNavItem key={item.key} item={item} />
        ))}
      </Box>

      <Box className="flex-1 flex justify-center items-start">
        <Outlet />
      </Box>
    </Box>
  );
};

export default Settings;
