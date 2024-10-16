/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import {
  Box,
  NavBarIconsBox,
  NavItem as NavItemElement,
} from '@components/index';

import { useColors, useIsMiniSidebar, useNavItems } from '@hooks/index';

const NavigationBar = () => {
  const colors = useColors();
  const navItems = useNavItems();

  const isMiniSideBar = useIsMiniSidebar();

  return (
    <nav
      className="flex flex-col space-y-3 border-r shadow-md pt-2 w-full"
      style={{
        backgroundColor: colors.$6,
        height: 'calc(100vh - 4.35rem)',
        width: isMiniSideBar ? '4.35rem' : '17.5rem',
        borderColor: colors.$1,
      }}
    >
      <Box className="flex flex-col space-y-0.5 flex-1 px-2 overflow-hidden break-all">
        {navItems
          .filter((item) => item.visible)
          .map((item) => (
            <NavItemElement key={item.key} item={item} />
          ))}
      </Box>

      <NavBarIconsBox />
    </nav>
  );
};

export default NavigationBar;
