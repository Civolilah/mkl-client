/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@constants/index';
import { route } from '@helpers/index';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

import Icon, { IconName } from '@components/general/Icon';
import {
  Box,
  Button,
  EntityActions,
  FooterAction,
  Header,
  ScanAction,
  Text,
} from '@components/index';

import { mobileActionsAtom } from '@hooks/global/useMobileActions';
import {
  useAccentColor,
  useColors,
  useHasPermission,
  usePreventAction,
  useTranslation,
} from '@hooks/index';

import AISearchAction, { isMobileAiPopoverOpenAtom } from './AISearchAction';
import MainNavBar from './MainNavBar';

export interface BreadcrumbItem {
  title: ReactNode;
  href?: string;
}

interface Props {
  children: ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  disabledSaveButton?: boolean;
  saveButtonLabel?: string;
  saveButtonIcon?: IconName;
  saveButtonIconColor?: string;
  disabledSaveButtonWithLoadingIcon?: boolean;
  disabledCancelButton?: boolean;
  disabledCancelButtonWithLoadingIcon?: boolean;
  footer?: ReactNode;
  actions?: ItemType[];
}

const Default = ({
  title,
  children,
  breadcrumbs = [],
  disabledSaveButton = false,
  footer,
  actions = [],
  onSaveClick,
  saveButtonLabel,
  saveButtonIcon,
  saveButtonIconColor,
}: Props) => {
  const t = useTranslation();

  const navigate = useNavigate();
  const hasPermission = useHasPermission();
  const preventAction = usePreventAction();

  const colors = useColors();
  const location = useLocation();
  const accentColor = useAccentColor();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const mobileActions = useAtomValue(mobileActionsAtom);
  const isMobileAiPopoverOpen = useAtomValue(isMobileAiPopoverOpenAtom);

  return (
    <>
      {Boolean(mobileActions.length) &&
        isSmallScreen &&
        !isMobileAiPopoverOpen && (
          <Box
            className={classNames(
              'fixed flex flex-col justify-center items-center z-50 gap-y-4',
              {
                'bottom-[4.75rem] right-[1.75rem]':
                  location.pathname.split('/')[3],
                'bottom-[7.5rem] right-[1.5rem]':
                  !location.pathname.split('/')[3],
              }
            )}
          >
            {mobileActions
              .filter((action) => action.visible)
              .map((action, index) => (
                <Box
                  key={index}
                  className={classNames('rounded-full p-3', {
                    'opacity-75 pointer-events-none': action.disabled,
                  })}
                  style={{
                    backgroundColor: accentColor,
                  }}
                  onClick={(event) => {
                    event.stopPropagation();

                    if (!action.disabled) {
                      action.onClick();
                    }
                  }}
                >
                  <Box>
                    <Icon
                      name={action.iconName}
                      size={action.iconSize}
                      style={{ color: 'white' }}
                    />
                  </Box>
                </Box>
              ))}
          </Box>
        )}

      <Box className="h-full w-full" style={{ backgroundColor: colors.$3 }}>
        <Box className="flex flex-col justify-start items-center w-full h-full">
          <Header title={title} />

          <Box
            className="flex w-full"
            style={{ height: `calc(100% - ${HEADER_HEIGHT})` }}
          >
            <Box className="hidden lg:flex lg:justify-start">
              <MainNavBar />
            </Box>

            <Box
              className="flex flex-col justify-center items-center flex-1"
              style={{
                width: isLargeScreen ? `calc(100% - ${SIDEBAR_WIDTH})` : '100%',
              }}
            >
              <Box
                id="scrollable-content-box"
                className="flex flex-col w-full overflow-y-auto flex-1"
              >
                {Boolean(
                  breadcrumbs.length || actions.length || onSaveClick
                ) && (
                  <Box
                    className={classNames(
                      'flex items-center justify-end sm:justify-between w-full px-2 lg:px-6 space-x-2',
                      {
                        'pt-4 lg:pt-5': !actions.length,
                        'pt-4 lg:pt-3': actions.length,
                      }
                    )}
                  >
                    {isLargeScreen && (
                      <Box className="flex-1 hidden sm:flex">
                        {Boolean(breadcrumbs.length) && (
                          <Box className="flex justify-start w-full">
                            <Box className="flex items-center space-x-1 md:space-x-2">
                              <Box
                                className="flex items-center space-x-1 md:space-x-2 cursor-pointer"
                                onClick={() => {
                                  preventAction({
                                    action: () => {
                                      navigate(route('/'));
                                    },
                                  });
                                }}
                              >
                                <Icon
                                  name="home"
                                  size={isMiddleScreen ? '1.3rem' : '1.1rem'}
                                  style={{ color: accentColor }}
                                />

                                <Box>
                                  <Icon
                                    name="arrowForward"
                                    size={isMiddleScreen ? '1.3rem' : '1.1rem'}
                                    style={{ color: colors.$12 }}
                                  />
                                </Box>
                              </Box>

                              {breadcrumbs.map((item, index) => (
                                <Box
                                  key={index}
                                  className="flex items-center space-x-1 md:space-x-2"
                                >
                                  <Text
                                    className={classNames('text-xs-mid', {
                                      'cursor-pointer hover:underline':
                                        index !== breadcrumbs.length - 1,
                                    })}
                                    onClick={() => {
                                      if (
                                        item.href &&
                                        index !== breadcrumbs.length - 1
                                      ) {
                                        preventAction({
                                          action: () => {
                                            navigate(
                                              route(item.href as string)
                                            );
                                          },
                                        });
                                      }
                                    }}
                                    style={{
                                      color:
                                        index !== breadcrumbs.length - 1
                                          ? colors.$11
                                          : colors.$13,
                                    }}
                                  >
                                    {item.title}
                                  </Text>

                                  {index !== breadcrumbs.length - 1 && (
                                    <Box>
                                      <Icon
                                        name="arrowForward"
                                        size={
                                          isMiddleScreen ? '1.3rem' : '1.1rem'
                                        }
                                        style={{ color: colors.$12 }}
                                      />
                                    </Box>
                                  )}
                                </Box>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                    )}

                    {onSaveClick && (
                      <Box className="flex items-center">
                        <Button
                          type="primary"
                          size={isLargeScreen ? 'large' : 'middle'}
                          icon={
                            <Box>
                              <Icon
                                name={saveButtonIcon || 'save'}
                                size="1.2rem"
                                style={{ color: saveButtonIconColor }}
                              />
                            </Box>
                          }
                          onClick={onSaveClick}
                        >
                          {t(saveButtonLabel || 'save')}
                        </Button>
                      </Box>
                    )}

                    {Boolean(actions.length) && (
                      <Box className="flex items-center">
                        <EntityActions
                          actions={actions}
                          disabled={disabledSaveButton}
                        />
                      </Box>
                    )}
                  </Box>
                )}

                <Box
                  className="flex items-center justify-center w-full pt-4 px-2 lg:px-6 lg:pt-6"
                  style={{
                    ...(isSmallScreen
                      ? { height: '100%' }
                      : { minHeight: 'min-content' }),
                  }}
                >
                  {children}
                </Box>
              </Box>

              {footer && isLargeScreen && (
                <Box
                  className="flex w-full items-center border-t shadow-sm lg:px-6 mt-3"
                  style={{
                    borderColor: colors.$1,
                    backgroundColor: colors.$6,
                    height: isLargeScreen ? '2.85rem' : '3.5rem',
                  }}
                >
                  {footer}
                </Box>
              )}

              {!isLargeScreen && (
                <Box
                  className="flex w-full items-center border-t shadow-sm lg:px-6 mt-3"
                  style={{
                    borderColor: colors.$1,
                    backgroundColor: colors.$6,
                    height: isLargeScreen ? '2.85rem' : '3.5rem',
                  }}
                >
                  <Box className="flex w-full items-center justify-end h-full">
                    <FooterAction
                      text="dashboard"
                      onClick={() => {
                        navigate(route('/dashboard'));
                      }}
                      iconName="dashboard"
                      visible={hasPermission('view_dashboard')}
                    />

                    <FooterAction
                      text="orders"
                      onClick={() => {
                        navigate(route('/orders'));
                      }}
                      iconName="clipboardList"
                      visible={
                        hasPermission('create_order') ||
                        hasPermission('view_order') ||
                        hasPermission('edit_order')
                      }
                    />

                    <FooterAction
                      text="notifications"
                      iconName="notifications"
                    />

                    <ScanAction />

                    <AISearchAction />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Default;
