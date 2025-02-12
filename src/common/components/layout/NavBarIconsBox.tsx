/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { request } from '@helpers/index';
import classNames from 'classnames';

import { Box, Icon, Tooltip } from '@components/index';

import {
  useAccentColor,
  useColors,
  useHandleChangeUserCompanyDetails,
  useIsMiniSidebar,
  useTranslation,
} from '@hooks/index';

const NavBarIconsBox = () => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

  const isMiniSideBar = useIsMiniSidebar();

  const handleChangeUserCompanyDetails = useHandleChangeUserCompanyDetails();

  const handleClick = () => {
    request('POST', '/api/users/toggle_sidebar', {
      value: !isMiniSideBar,
    }).then((response) =>
      handleChangeUserCompanyDetails(
        'preference.mini_side_bar',
        response.data.value
      )
    );
  };

  return (
    <Box
      className="flex py-3 border-t items-center justify-center relative"
      style={{ borderColor: colors.$1, height: '2.85rem' }}
    >
      <Box
        className="flex space-x-5 items-center justify-center"
        style={{ color: accentColor }}
      >
        {!isMiniSideBar && (
          <Tooltip text={t('contact_us')}>
            <div className="cursor-pointer">
              <Icon name="email" size="1.375rem" />
            </div>
          </Tooltip>
        )}

        {!isMiniSideBar && (
          <Tooltip text={t('about_us')}>
            <div className="cursor-pointer">
              <Icon name="information" size="1.425rem" />
            </div>
          </Tooltip>
        )}

        <Box
          className={classNames('absolute', {
            'right-2.5': !isMiniSideBar,
            'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2': isMiniSideBar,
          })}
        >
          <Tooltip
            text={isMiniSideBar ? t('maximize_sidebar') : t('minimize_sidebar')}
            trigger={['hover', 'click']}
          >
            <div className="cursor-pointer">
              {isMiniSideBar ? (
                <Icon name="arrowForward" size="1.8rem" onClick={handleClick} />
              ) : (
                <Icon name="arrowBack" size="1.8rem" onClick={handleClick} />
              )}
            </div>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBarIconsBox;
