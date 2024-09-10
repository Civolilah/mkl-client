/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { IconName } from '@components/general/Icon';
import {
  NavBarIconsBox,
  NavBarLogoSection,
  NavItem as NavItemElement,
} from '@components/index';

import { useColors } from '@hooks/index';
import { NavItem } from './Default';

type Props = {
  items: NavItem[];
};

const NavigationBar = (props: Props) => {
  const colors = useColors();

  const { items } = props;

  return (
    <nav
      className="flex flex-col space-y-3 h-screen shadow-lg"
      style={{ backgroundColor: colors.$6 }}
    >
      <NavBarLogoSection />

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
