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

import { Drawer } from 'antd';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';

import Icon from '@components/general/Icon';
import {
  NavBarIconsBox,
  NavBarLogoSection,
  NavItem as NavItemElement,
} from '@components/index';

import { NavItem } from '@hooks/global/useNavItems';
import { useColors, useIsMiniSidebar } from '@hooks/index';

type Props = {
  items: NavItem[];
};

const MobileNavBar = (props: Props) => {
  const { items } = props;

  const colors = useColors();

  const [open, setOpen] = useState<boolean>(false);

  const isMiniSideBar = useIsMiniSidebar();

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
      <div
        className="flex items-center justify-center py-4 px-4 cursor-pointer border-r"
        style={{
          height: '3.45rem',
          borderColor: colors.$1,
          backgroundColor: colors.$6,
        }}
        onClick={showDrawer}
      >
        <div className="mt-0.5">
          <Icon name="menu" size={isMiddleScreen ? 30 : 27} />
        </div>
      </div>

      <Drawer
        placement="left"
        open={open}
        closable={false}
        onClose={onClose}
        width={isMiniSideBar ? '4.35rem' : '75%'}
        rootStyle={{ padding: 0 }}
        styles={{ body: { padding: 0 } }}
      >
        <div className="h-full" style={{ backgroundColor: colors.$6 }}>
          <nav className="flex flex-col space-y-3 h-full">
            <NavBarLogoSection mobileSideBar />

            <div
              className={classNames(
                'flex flex-col flex-1 overflow-y-auto break-all',
                {
                  'px-1.5': isMiniSideBar,
                  'px-2.5': !isMiniSideBar,
                }
              )}
            >
              {items
                .filter((item) => item.visible)
                .map((item) => (
                  <NavItemElement key={item.key} item={item} />
                ))}
            </div>

            <NavBarIconsBox />
          </nav>
        </div>
      </Drawer>
    </>
  );
};

export default MobileNavBar;
