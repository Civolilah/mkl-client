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

import { useAtomValue } from 'jotai';

import { Icon, Image, Link } from '@components/index';

import { isMiniSideBarAtom } from './NavBarIconsBox';
import logo from '../../../../public/images/logo.png';
import { useColors } from '@hooks/index';

type Props = {
  mobileSideBar?: boolean;
};

const NavBarLogoSection = (props: Props) => {
  const { mobileSideBar } = props;

  const colors = useColors();
  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

  return (
    <div
      className="flex items-center py-4 pl-6 border-b"
      style={{ height: '4.35rem', borderColor: colors.$1 }}
    >
      {(!isMiniSideBar || mobileSideBar) && (
        <Link to="/" disableHoverColor>
          <Image
            className="cursor-pointer"
            src={logo.src}
            width={120}
            height={35}
            alt="The MKL Store Logo"
            preview={false}
          />
        </Link>
      )}
    </div>
  );
};

export default NavBarLogoSection;
