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

import classNames from 'classnames';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Icon, Tooltip } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

export const isMiniSideBarAtom = atomWithStorage('MKL-MINI-SIDE-BAR', false);

const NavBarIconsBox = () => {
  const t = useTranslation({ section: 'NavigationMenu' });
  const colors = useColors();

  const [isMiniSideBar, setIsMiniSideBar] = useAtom(isMiniSideBarAtom);

  return (
    <div className="flex py-3 border-t items-center justify-center relative">
      <div
        className="flex space-x-5 items-center justify-center"
        style={{ color: colors.$10 }}
      >
        {!isMiniSideBar && (
          <Tooltip text={t('contact_us')}>
            <div className="cursor-pointer">
              <Icon name="email" size={26.5} />
            </div>
          </Tooltip>
        )}

        {!isMiniSideBar && (
          <Tooltip text={t('about_us')}>
            <div className="cursor-pointer">
              <Icon name="information" size={27.5} />
            </div>
          </Tooltip>
        )}

        <div
          className={classNames({
            'absolute right-4': !isMiniSideBar,
            'flex justify-center': isMiniSideBar,
          })}
        >
          {isMiniSideBar ? (
            <Tooltip text={t('maximize_sidebar')}>
              <div className="cursor-pointer">
                <Icon
                  name="arrowForward"
                  size={23}
                  onClick={() => setIsMiniSideBar(false)}
                />
              </div>
            </Tooltip>
          ) : (
            <Tooltip text={t('minimize_sidebar')}>
              <div className="cursor-pointer">
                <Icon
                  name="arrowBack"
                  size={23}
                  onClick={() => setIsMiniSideBar(true)}
                />
              </div>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBarIconsBox;
