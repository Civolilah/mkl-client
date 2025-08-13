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

import { useColors, useIsMiniSidebar } from '@hooks/index';

type Props = {
  mobileSideBar?: boolean;
  handleCloseSideBar?: () => void;
};

const NavBarLogoSection = (props: Props) => {
  const { mobileSideBar } = props;

  const colors = useColors();

  const isMiniSideBar = useIsMiniSidebar();

  return (
    <div
      className={classNames('flex items-center py-2', {
        'border-r': !mobileSideBar,
        'border-b': mobileSideBar,
        'px-2': !mobileSideBar,
        'px-4': mobileSideBar,
      })}
      style={{
        height: '3.5rem',
        borderColor: colors.$1,
        width: isMiniSideBar
          ? mobileSideBar
            ? '4.35rem'
            : '4rem'
          : mobileSideBar
            ? '100%'
            : '15rem',
      }}
    >
      <div className="flex w-full justify-between items-center">
        {(!isMiniSideBar || (mobileSideBar && !isMiniSideBar)) && (
          <div className="h-full" onClick={() => {}}>
            <img
              className="cursor-pointer"
              src="/images/mkl.png"
              width="full"
              height="full"
              alt="The MKL Store Logo"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarLogoSection;
