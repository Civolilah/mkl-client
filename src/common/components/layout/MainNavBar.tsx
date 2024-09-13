/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';

import { NavBarIconsBox, NavItem as NavItemElement } from '@components/index';

import { useColors } from '@hooks/index';

import { NavItem } from './Default';
import { isMiniSideBarAtom } from './NavBarIconsBox';

type Props = {
  items: NavItem[];
};

const NavigationBar = (props: Props) => {
  const colors = useColors();

  const { items } = props;

  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

  return (
    <nav
      className="flex flex-col space-y-3 border-r shadow-md pt-4"
      style={{
        backgroundColor: colors.$6,
        height: 'calc(100vh - 4.35rem)',
        width: isMiniSideBar ? '4.35rem' : '18rem',
        borderColor: colors.$1,
      }}
    >
      <div className="flex flex-col space-y-1 flex-1 px-2.5 overflow-hidden break-all">
        {items
          .filter((item) => item.visible)
          .map((item) => (
            <NavItemElement key={item.key} item={item} />
          ))}
      </div>

      <NavBarIconsBox />
    </nav>
  );
};

export default NavigationBar;
