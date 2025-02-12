/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';

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
        height: 'calc(100vh - 3.5rem)',
        width: isMiniSideBar ? '4rem' : '15rem',
        borderColor: colors.$1,
      }}
    >
      <Box
        className={classNames(
          'flex flex-col flex-1 overflow-y-auto break-all',
          {
            'px-2': !isMiniSideBar,
            'px-1': isMiniSideBar,
          }
        )}
      >
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
