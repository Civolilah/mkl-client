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
import { useAtomValue } from 'jotai';

import { Icon } from '@components/index';

import { useColors } from '@hooks/index';

import { isMiniSideBarAtom } from './NavBarIconsBox';

type Props = {
  mobileSideBar?: boolean;
  handleCloseSideBar?: () => void;
};

const NavBarLogoSection = (props: Props) => {
  const { mobileSideBar, handleCloseSideBar } = props;

  const colors = useColors();
  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

  return (
    <div
      className={classNames('flex items-center py-4', {
        'border-r': !mobileSideBar,
        'border-b': mobileSideBar,
        'px-4 md:px-6': !mobileSideBar,
        'px-3': mobileSideBar,
      })}
      style={{
        height: '4.35rem',
        borderColor: colors.$1,
        width: isMiniSideBar ? '4.35rem' : '19rem',
      }}
    >
      <div className="flex w-full justify-between items-center">
        {(!isMiniSideBar || (mobileSideBar && !isMiniSideBar)) && (
          <div className="h-full" onClick={() => {}}>
            <img
              className="cursor-pointer"
              src="/images/logo.png"
              width={120}
              height={32}
              alt="The MKL Store Logo"
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
            <Icon name="close" size={30} style={{ color: colors.$10 }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBarLogoSection;
