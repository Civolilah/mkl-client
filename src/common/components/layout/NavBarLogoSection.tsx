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

import { Icon } from '@components/index';

import { useColors, useIsMiniSidebar } from '@hooks/index';

type Props = {
  mobileSideBar?: boolean;
  handleCloseSideBar?: () => void;
};

const NavBarLogoSection = (props: Props) => {
  const { mobileSideBar, handleCloseSideBar } = props;

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
        width: isMiniSideBar ? (mobileSideBar ? '4.35rem' : '4rem') : '15rem',
      }}
    >
      <div className="flex w-full justify-between items-center">
        {(!isMiniSideBar || (mobileSideBar && !isMiniSideBar)) && (
          <div className="h-full" onClick={() => {}}>
            <img
              className="cursor-pointer"
              src="/images/logo.png"
              width="full"
              height="full"
              alt="The MKL Store Logo"
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}

        {mobileSideBar && handleCloseSideBar && (
          <div
            className={classNames(
              'flex justify-center items-center cursor-pointer mt-1',
              {
                'w-full': isMiniSideBar,
              }
            )}
            onClick={handleCloseSideBar}
          >
            <Icon name="close" size="1.3rem" style={{ color: colors.$10 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarLogoSection;
