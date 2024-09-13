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
import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import Icon from '@components/general/Icon';
import {
  NavBarIconsBox,
  NavBarLogoSection,
  NavItem as NavItemElement,
} from '@components/index';

import { useColors } from '@hooks/index';

import { NavItem } from './Default';
import { isMiniSideBarAtom } from './NavBarIconsBox';

type Props = {
  items: NavItem[];
};

const MobileNavBar = (props: Props) => {
  const { items } = props;

  const colors = useColors();

  const [open, setOpen] = useState<boolean>(false);
  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

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
          height: '4.35rem',
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
        width={isMiniSideBar ? '4.35rem' : 290}
        rootStyle={{ padding: 0 }}
        styles={{ body: { padding: 0 } }}
      >
        <div className="h-full" style={{ backgroundColor: colors.$6 }}>
          <nav className="flex flex-col space-y-3 h-full">
            <NavBarLogoSection mobileSideBar handleCloseSideBar={onClose} />

            <div
              className={classNames(
                'flex flex-col space-y-1 flex-1 overflow-hidden break-all',
                {
                  'px-1.5': isMiniSideBar,
                  'px-2.5': !isMiniSideBar,
                }
              )}
            >
              {items
                .filter((item) => item.visible)
                .map((item) => (
                  <NavItemElement key={item.key} item={item} mobileSideBar />
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
