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

import { Drawer } from 'antd';
import { atom, useAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import Icon from '@components/general/Icon';
import {
  Box,
  NavBarLogoSection,
  NavItem as NavItemElement,
} from '@components/index';

import { NavItem } from '@hooks/global/useNavItems';
import { useColors } from '@hooks/index';

interface Props {
  items: NavItem[];
}

export const menuDrawerOpenedAtom = atom<boolean>(false);

const MobileNavBar = ({ items }: Props) => {
  const colors = useColors();

  const [open, setOpen] = useAtom(menuDrawerOpenedAtom);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isMiddleScreen && open) {
      onClose();
    }
  }, [isMiddleScreen]);

  return (
    <>
      <Box
        className="flex items-center justify-center py-4 px-4 cursor-pointer border-r"
        style={{
          height: '3.45rem',
          borderColor: colors.$1,
          backgroundColor: colors.$6,
        }}
        onClick={showDrawer}
      >
        <Box className="mt-0.5">
          <Icon name="menu" size={isMiddleScreen ? 30 : 27} />
        </Box>
      </Box>

      <Drawer
        placement="left"
        open={open}
        closable={false}
        onClose={onClose}
        width={isSmallScreen ? '75%' : '17.5rem'}
        rootStyle={{ padding: 0 }}
        styles={{ body: { padding: 0 } }}
      >
        <Box className="h-full" style={{ backgroundColor: colors.$6 }}>
          <nav className="flex flex-col space-y-1 h-full">
            <NavBarLogoSection mobileSideBar />

            <Box className="flex flex-col flex-1 overflow-y-auto break-all px-1.5">
              {items
                .filter((item) => item.visible && item.key !== 'settings')
                .map((item) => (
                  <NavItemElement key={item.key} item={item} />
                ))}
            </Box>

            <Box className="px-1.5 pb-1.5">
              <NavItemElement item={items[items.length - 1]} />
            </Box>
          </nav>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
