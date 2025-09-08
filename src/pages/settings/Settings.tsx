/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { route } from '@helpers/index';
import { useMediaQuery } from 'react-responsive';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import {
  Box,
  Icon,
  SettingsNavItem,
  StaticTabs,
  Text,
} from '@components/index';

import { useSettingsNavItems, useTranslation } from '@hooks/index';

const Settings = () => {
  const t = useTranslation();

  const navigate = useNavigate();

  const location = useLocation();
  const navItems = useSettingsNavItems();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const [activeTab, setActiveTab] = useState<string>('profile');

  useEffect(() => {
    if (location.pathname === '/settings') {
      navigate(route('/settings/profile'));
    }
  }, [location.pathname]);

  return (
    <Box className="flex h-full items-start justify-start w-full gap-x-5 xl:gap-x-10">
      {isLargeScreen ? (
        <Box className="flex flex-col">
          {navItems.map((item) => (
            <SettingsNavItem key={item.key} item={item} />
          ))}
        </Box>
      ) : (
        <StaticTabs
          tabs={navItems.map((item) => ({
            key: item.key,
            label: (
              <Box className="flex item-center space-x-2 px-5 py-0.5">
                <Box>
                  <Icon name={item.iconName} size={item.iconSize} />
                </Box>

                <Text className="text-sm">{t(item.label)}</Text>
              </Box>
            ),
            children: (
              <Box className="flex-1 flex justify-center items-start">
                <Outlet />
              </Box>
            ),
          }))}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onTabChange={(activeTab) => navigate(route(`/settings/${activeTab}`))}
        />
      )}

      {Boolean(isLargeScreen) && (
        <Box className="flex-1 flex justify-center items-start">
          <Outlet />
        </Box>
      )}
    </Box>
  );
};

export default Settings;
