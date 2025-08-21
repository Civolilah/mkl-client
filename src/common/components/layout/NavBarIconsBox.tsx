/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useCallback, useEffect, useState } from 'react';

import { request } from '@helpers/index';
import classNames from 'classnames';
import platform from 'platform';
import reactStringReplace from 'react-string-replace';

import { Box, FeedbackModal, Icon, Text, Tooltip } from '@components/index';

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

  const [feedbackModalVisible, setFeedbackModalVisible] =
    useState<boolean>(false);
  const [currentSidebarState, setCurrentSidebarState] =
    useState<boolean>(isMiniSideBar);

  const handleClick = useCallback(() => {
    handleChangeUserCompanyDetails('preference.mini_sidebar', !isMiniSideBar);
  }, [isMiniSideBar]);

  const isMac = useCallback(() => {
    return platform?.os?.family === 'OS X' || platform?.os?.family === 'macOS';
  }, [platform]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === '/') {
        event.preventDefault();
        handleClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMiniSideBar]);

  useEffect(() => {
    if (currentSidebarState !== isMiniSideBar) {
      setCurrentSidebarState(isMiniSideBar);

      request('POST', '/api/users/toggle_sidebar', {
        value: isMiniSideBar,
      });
    }
  }, [isMiniSideBar, currentSidebarState]);

  return (
    <>
      <FeedbackModal
        visible={feedbackModalVisible}
        onClose={() => setFeedbackModalVisible(false)}
      />

      <Box
        className="flex py-3 border-t items-center justify-center relative"
        style={{ borderColor: colors.$1, height: '2.85rem' }}
      >
        <Box
          className="flex space-x-5 items-center justify-center"
          style={{ color: accentColor }}
        >
          {!isMiniSideBar && (
            <Tooltip text={t('contact_us')} withoutClickOpenOnMobile>
              <div className="cursor-pointer">
                <Icon name="email" size="1.375rem" />
              </div>
            </Tooltip>
          )}

          {!isMiniSideBar && (
            <Tooltip text={t('about_us')} withoutClickOpenOnMobile>
              <div className="cursor-pointer">
                <Icon name="information" size="1.425rem" />
              </div>
            </Tooltip>
          )}

          {!isMiniSideBar && (
            <Tooltip
              text={t('feedback_bugs_features')}
              withoutClickOpenOnMobile
            >
              <div
                className="cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  setFeedbackModalVisible(true);
                }}
              >
                <Icon name="feedback" size="1.3rem" />
              </div>
            </Tooltip>
          )}

          <Box
            className={classNames('absolute', {
              'right-2.5': !isMiniSideBar,
              'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2':
                isMiniSideBar,
            })}
          >
            <Tooltip
              text={
                isMiniSideBar
                  ? reactStringReplace(
                      t('maximize_sidebar'),
                      ':command',
                      () => (
                        <Box className="inline-flex items-center gap-x-1 whitespace-nowrap align-middle">
                          {isMac() ? (
                            <>
                              <Icon name="command" size="0.9rem" />
                              <Text className="text-xs font-medium">/</Text>
                            </>
                          ) : (
                            <Text className="text-xs font-medium">Ctrl /</Text>
                          )}
                        </Box>
                      )
                    )
                  : reactStringReplace(
                      t('minimize_sidebar'),
                      ':command',
                      () => (
                        <Box className="inline-flex items-center gap-x-1 whitespace-nowrap align-middle">
                          {isMac() ? (
                            <>
                              <Icon name="command" size="0.9rem" />
                              <Text className="text-xs font-medium">/</Text>
                            </>
                          ) : (
                            <Text className="text-xs font-medium">Ctrl /</Text>
                          )}
                        </Box>
                      )
                    )
              }
              trigger={['hover']}
              withoutClickOpenOnMobile
            >
              <div className="cursor-pointer">
                {isMiniSideBar ? (
                  <Icon
                    name="arrowForward"
                    size="1.8rem"
                    onClick={handleClick}
                  />
                ) : (
                  <Icon name="arrowBack" size="1.8rem" onClick={handleClick} />
                )}
              </div>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default NavBarIconsBox;
