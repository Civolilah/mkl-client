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

import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/general/Icon';
import {
  Box,
  Button,
  EntityActions,
  Header,
  Text,
  Tooltip,
} from '@components/index';

import {
  useAccentColor,
  useColors,
  useIsMiniSidebar,
  useTranslation,
} from '@hooks/index';

import MainNavBar from './MainNavBar';

export type BreadcrumbItem = {
  title: ReactNode;
  href?: string;
};

type Props = {
  children: ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
  onSaveClick?: () => void;
  onCancelClick?: () => void;
  disabledSaveButton?: boolean;
  disabledSaveButtonWithLoadingIcon?: boolean;
  disabledCancelButton?: boolean;
  disabledCancelButtonWithLoadingIcon?: boolean;
  footer?: ReactNode;
  actions?: ItemType[];
  tooltipPermissionMessage?: string;
  displayPermissionTooltip?: boolean;
};

const Default = (props: Props) => {
  const t = useTranslation();

  const {
    title,
    children,
    breadcrumbs = [],
    onSaveClick,
    onCancelClick,
    disabledSaveButton = false,
    disabledSaveButtonWithLoadingIcon = false,
    disabledCancelButton = false,
    disabledCancelButtonWithLoadingIcon = false,
    footer,
    actions = [],
    tooltipPermissionMessage,
    displayPermissionTooltip = false,
  } = props;

  const colors = useColors();
  const accentColor = useAccentColor();

  const isMiniSideBar = useIsMiniSidebar();

  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const navigate = useNavigate();

  return (
    <Box className="h-full w-full" style={{ backgroundColor: colors.$3 }}>
      <Box className="flex flex-col justify-start items-center w-full h-full">
        <Header title={title} />

        <Box className="flex w-full" style={{ height: 'calc(100% - 3.5rem)' }}>
          <Box className="hidden lg:flex lg:justify-start">
            <MainNavBar />
          </Box>

          <Box
            className="flex flex-col justify-center items-center flex-1"
            style={{
              width: isLargeScreen
                ? `calc(100% - ${isMiniSideBar ? '4.35rem' : '15rem'})`
                : '100%',
            }}
          >
            {Boolean(breadcrumbs.length || onCancelClick || onSaveClick) && (
              <Box
                className="flex items-center justify-end sm:justify-between w-full px-2 md:px-6 py-2 border-b shadow-sm space-x-2"
                style={{
                  borderColor: colors.$1,
                  backgroundColor: colors.$6,
                  height: '3.25rem',
                }}
              >
                <Box className="flex-1 hidden sm:flex">
                  {Boolean(breadcrumbs.length) && (
                    <Box className="flex justify-start w-full">
                      <Box className="flex items-center space-x-1 md:space-x-2">
                        <Box
                          className="flex items-center space-x-1 md:space-x-2 cursor-pointer"
                          onClick={() => navigate('/')}
                        >
                          <Icon
                            name="home"
                            size={isMiddleScreen ? '1.15rem' : '1rem'}
                            style={{ color: accentColor }}
                          />

                          <Box>
                            <Icon
                              name="arrowForward"
                              size={isMiddleScreen ? '1.2rem' : '1rem'}
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
                              className={classNames('text-xs-plus', {
                                'cursor-pointer hover:underline':
                                  index !== breadcrumbs.length - 1,
                              })}
                              onClick={() => {
                                if (
                                  item.href &&
                                  index !== breadcrumbs.length - 1
                                ) {
                                  navigate(item.href);
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
                                  size={isMiddleScreen ? '1.2rem' : '1rem'}
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

                {(onSaveClick || onCancelClick) && (
                  <Box
                    className="flex items-center space-x-2 md:space-x-4"
                    style={{
                      height: '2.25rem',
                      borderColor: colors.$1,
                      backgroundColor: colors.$6,
                    }}
                  >
                    {onCancelClick && (
                      <Button
                        className="h-full"
                        type="default"
                        onClick={onCancelClick}
                        icon={<Icon name="close" size="1rem" />}
                        disabled={disabledCancelButton}
                        disabledWithLoadingIcon={
                          disabledCancelButtonWithLoadingIcon
                        }
                      >
                        {t('cancel')}
                      </Button>
                    )}

                    {onSaveClick && (
                      <>
                        {tooltipPermissionMessage &&
                        displayPermissionTooltip ? (
                          <Tooltip text={tooltipPermissionMessage}>
                            <div>
                              <Button
                                type="primary"
                                onClick={onSaveClick}
                                icon={<Icon name="save" size="1rem" />}
                                disabled={disabledSaveButton}
                                disabledWithLoadingIcon={
                                  disabledSaveButtonWithLoadingIcon
                                }
                              >
                                {t('save')}
                              </Button>
                            </div>
                          </Tooltip>
                        ) : (
                          <Button
                            type="primary"
                            onClick={onSaveClick}
                            icon={<Icon name="save" size="1rem" />}
                            disabled={disabledSaveButton}
                            disabledWithLoadingIcon={
                              disabledSaveButtonWithLoadingIcon
                            }
                          >
                            {t('save')}
                          </Button>
                        )}
                      </>
                    )}

                    {Boolean(actions.length) && (
                      <>
                        {displayPermissionTooltip &&
                        tooltipPermissionMessage ? (
                          <Tooltip text={tooltipPermissionMessage}>
                            <div>
                              <EntityActions
                                actions={actions}
                                disabled={disabledSaveButton}
                              />
                            </div>
                          </Tooltip>
                        ) : (
                          <EntityActions
                            actions={actions}
                            disabled={disabledSaveButton}
                          />
                        )}
                      </>
                    )}
                  </Box>
                )}
              </Box>
            )}

            <Box className="flex w-full overflow-y-auto flex-1">
              <Box
                className="flex items-center justify-center w-full pt-4 px-2 md:px-6 md:pt-6 md:pb-12"
                style={{ minHeight: 'min-content' }}
              >
                {children}
              </Box>
            </Box>

            {footer && (
              <Box
                className="flex w-full items-center border-t shadow-lg px-2 md:px-6"
                style={{
                  borderColor: colors.$1,
                  backgroundColor: colors.$6,
                  height: '2.85rem',
                }}
              >
                {footer}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
