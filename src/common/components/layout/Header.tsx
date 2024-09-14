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
  MobileNavBar,
  NavBarLogoSection,
  PersonIcon,
  Text,
} from '@components/index';

import { useColors } from '@hooks/index';

import { navItems } from './Default';
import LanguageSwitcher from './LanguageSwitcher';

type Props = {
  title?: string;
};

const Header = (props: Props) => {
  const { title } = props;

  const colors = useColors();

  return (
    <div
      className="flex items-center justify-center w-full border-b shadow-sm py-4"
      style={{
        height: '4.35rem',
        borderColor: colors.$1,
        backgroundColor: colors.$6,
      }}
    >
      <div className="hidden lg:flex">
        <NavBarLogoSection />
      </div>

      <div className="flex lg:hidden">
        <MobileNavBar items={navItems} />
      </div>

      <div className="flex w-full justify-between items-center px-6">
        <Text className="text-lg md:text-xl whitespace-nowrap">{title}</Text>

        <div className="flex w-full justify-end">
          <div className="flex items-center space-x-9">
            <div className="hidden md:flex">
              <LanguageSwitcher />
            </div>

            <div className="cursor-pointer">
              <PersonIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
