/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import Icon, { IconName } from '@components/general/Icon';
import {
  NavBarIconsBox,
  NavBarLogoSection,
  NavItem as NavItemElement,
} from '@components/index';

import { useColors } from '@hooks/index';
import { Button, Drawer, Space } from 'antd';
import { useState } from 'react';
import { NavItem } from './Default';

type Props = {
  items: NavItem[];
};

const MobileNavBar = (props: Props) => {
  const colors = useColors();

  const { items } = props;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className="flex items-center justify-center py-4 px-4 border-b cursor-pointer"
        style={{
          height: '4.35rem',
          borderColor: colors.$1,
          backgroundColor: colors.$6,
        }}
        onClick={showDrawer}
      >
        <Icon name="menu" size={30} />
      </div>

      <Drawer
        className="p-0"
        placement="left"
        open={open}
        closable={false}
        width={290}
        drawerRender={(node) => (
          <div className="h-full" style={{ backgroundColor: colors.$6 }}>
            <nav className="flex flex-col space-y-3 h-full">
              <NavBarLogoSection mobileSideBar />

              <div className="flex flex-col space-y-1 flex-1 px-2.5 overflow-hidden break-all">
                {items
                  .filter((item) => item.visible)
                  .map((item) => (
                    <NavItemElement key={item.key} item={item} />
                  ))}
              </div>

              <NavBarIconsBox />
            </nav>
          </div>
        )}
      />
    </>
  );
};

export default MobileNavBar;
