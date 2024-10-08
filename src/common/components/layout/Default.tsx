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

import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import Icon from '@components/general/Icon';
import { Box, Button, Header, Text } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

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
  } = props;

  const colors = useColors();
  const accentColor = useAccentColor();

  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const navigate = useNavigate();

  return (
    <Box
      className={classNames('flex min-w-screen min-h-screen')}
      style={{ backgroundColor: colors.$3 }}
    >
      <Box className="flex flex-col flex-1 justify-start items-center">
        <Header title={title} />

        <Box className="flex w-full h-full">
          <Box className="hidden lg:flex lg:justify-start">
            <MainNavBar />
          </Box>

          <Box className="flex flex-col flex-1 justify-center items-center">
            {Boolean(breadcrumbs.length || onCancelClick || onSaveClick) && (
              <Box
                className="flex items-center justify-end sm:justify-between w-full px-2 md:px-6 py-2 border-b shadow-sm space-x-2"
                style={{
                  borderColor: colors.$1,
                  backgroundColor: colors.$6,
                  height: '57px',
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
                            size={isMiddleScreen ? '1.5rem' : '1.438rem'}
                            style={{ color: accentColor }}
                          />

                          <Box>
                            <Icon
                              name="arrowForward"
                              size={isMiddleScreen ? '0.8125rem' : '0.75rem'}
                              style={{ color: colors.$12 }}
                            />
                          </Box>
                        </Box>

                        {breadcrumbs.map((item, index) => (
                          <Box
                            key={index}
                            className="flex items-center space-x-1 md:space-x-2"
                            style={{
                              fontSize: isMiddleScreen
                                ? '0.953rem'
                                : '0.891rem',
                            }}
                          >
                            <Text
                              className={classNames({
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
                                  size={isMiddleScreen ? '0.813rem' : '0.75rem'}
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
                    className="flex space-x-2 md:space-x-4"
                    style={{
                      height: '2.5rem',
                      borderColor: colors.$1,
                      backgroundColor: colors.$6,
                    }}
                  >
                    {onCancelClick && (
                      <Button
                        className="h-full"
                        type="default"
                        onClick={onCancelClick}
                        icon={<Icon name="close" />}
                        disabled={disabledCancelButton}
                        disabledWithLoadingIcon={
                          disabledCancelButtonWithLoadingIcon
                        }
                      >
                        {t('cancel')}
                      </Button>
                    )}

                    {onSaveClick && (
                      <Button
                        className="h-full"
                        type="primary"
                        onClick={onSaveClick}
                        icon={<Icon name="save" />}
                        disabled={disabledSaveButton}
                        disabledWithLoadingIcon={
                          disabledSaveButtonWithLoadingIcon
                        }
                      >
                        {t('save')}
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            )}

            <Box className="flex flex-1 w-full justify-center items-center p-2 md:p-6">
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Default;
