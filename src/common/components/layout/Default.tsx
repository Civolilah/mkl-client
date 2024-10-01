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

import Icon, { IconName } from '@components/general/Icon';
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
};

type RightIcon = {
  name: IconName;
  href: string;
  tooltipText: string;
  visible: boolean;
};

export type NavItem = {
  key: string;
  label: string;
  iconName: IconName;
  href: string;
  visible: boolean;
  rightIcon?: RightIcon;
  iconSize: number;
};

export const navItems: NavItem[] = [
  // {
  //   key: 'dashboard',
  //   label: 'Dashboard',
  //   iconName: 'dashboard',
  //   href: '/dashboard',
  //   visible: true,
  //   iconSize: 21,
  // },
  {
    key: 'products',
    label: 'products',
    iconName: 'product',
    href: '/products',
    visible: true,
    iconSize: 25.5,
    rightIcon: {
      name: 'add',
      href: '/products/new',
      tooltipText: 'new_product',
      visible: true,
    },
  },
  {
    key: 'imported_products',
    label: 'imported_products',
    iconName: 'import',
    href: '/imported_products',
    visible: true,
    iconSize: 24,
  },
  {
    key: 'marked_products',
    label: 'status_marked_products',
    iconName: 'status_marked',
    href: '/marked_products',
    visible: true,
    iconSize: 22,
  },
  {
    key: 'delivered_products',
    label: 'delivered_products',
    iconName: 'deliveredProducts',
    href: '/delivered_products',
    visible: true,
    iconSize: 22.5,
  },
  {
    key: 'suppliers',
    label: 'suppliers',
    iconName: 'truck',
    href: '/suppliers',
    iconSize: 23,
    visible: true,
    rightIcon: {
      name: 'add',
      href: '/suppliers/new',
      tooltipText: 'new_supplier',
      visible: true,
    },
  },
  {
    key: 'subsidiaries',
    label: 'subsidiaries',
    iconName: 'subsidiary',
    href: '/subsidiaries',
    iconSize: 21,
    visible: true,
    rightIcon: {
      name: 'add',
      href: '/subsidiaries/new',
      tooltipText: 'new_subsidiary',
      visible: true,
    },
  },
  {
    key: 'categories',
    label: 'categories',
    iconName: 'category',
    href: '/categories',
    iconSize: 23,
    visible: true,
    rightIcon: {
      name: 'add',
      href: '/categories/new',
      tooltipText: 'new_category',
      visible: true,
    },
  },
  {
    key: 'labels',
    label: 'labels',
    iconName: 'tag',
    href: '/labels',
    visible: true,
    iconSize: 20,
    rightIcon: {
      name: 'add',
      href: '/labels/new',
      tooltipText: 'new_label',
      visible: true,
    },
  },
  {
    key: 'label_categories',
    label: 'label_categories',
    iconName: 'tags',
    href: '/label_categories',
    visible: true,
    iconSize: 24,
    rightIcon: {
      name: 'add',
      href: '/label_categories/new',
      tooltipText: 'new_label_category',
      visible: true,
    },
  },
  {
    key: 'employees',
    label: 'employees',
    iconName: 'employees',
    href: '/employees',
    visible: true,
    iconSize: 23,
    rightIcon: {
      name: 'add',
      href: '/employees/new',
      tooltipText: 'new_employee',
      visible: true,
    },
  },
  {
    key: 'statuses',
    label: 'statuses',
    iconName: 'assignment',
    href: '/statuses',
    visible: true,
    iconSize: 22.5,
    rightIcon: {
      name: 'add',
      href: '/statuses/new',
      tooltipText: 'new_status',
      visible: true,
    },
  },
  // {
  //   key: 'company_details',
  //   label: 'company_details',
  //   iconName: 'company',
  //   href: '/company_details',
  //   iconSize: 25,
  //   visible: true,
  // },
  // {
  //   key: 'reports',
  //   label: 'Reports',
  //   iconName: 'barChart',
  //   href: '/reports',
  //   visible: true,
  // },
];

const Default = (props: Props) => {
  const t = useTranslation();

  const { title, children, breadcrumbs, onSaveClick, onCancelClick } = props;

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
            <Box
              className="flex items-center justify-end sm:justify-between w-full px-2 md:px-6 py-2 border-b shadow-sm space-x-2"
              style={{
                borderColor: colors.$1,
                backgroundColor: colors.$6,
              }}
            >
              <Box className="flex-1 hidden sm:flex">
                {breadcrumbs && (
                  <Box className="flex justify-start w-full">
                    <Box className="flex items-center space-x-1 md:space-x-2">
                      <Box
                        className="flex items-center space-x-1 md:space-x-2 cursor-pointer"
                        onClick={() => navigate('/')}
                      >
                        <Icon
                          name="home"
                          size={isMiddleScreen ? 24 : 23}
                          style={{ color: accentColor }}
                        />

                        <Box>
                          <Icon
                            name="arrowForward"
                            size={isMiddleScreen ? 13 : 12}
                            style={{ color: colors.$12 }}
                          />
                        </Box>
                      </Box>

                      {breadcrumbs.map((item, index) => (
                        <Box
                          key={index}
                          className="flex items-center space-x-1 md:space-x-2"
                          style={{ fontSize: isMiddleScreen ? 15.25 : 14.25 }}
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
                              letterSpacing: 0.8,
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
                                size={isMiddleScreen ? 13 : 12}
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
                      style={{
                        padding: isMiddleScreen ? '0.75rem' : '0.5rem',
                      }}
                    >
                      <Box className="flex items-center space-x-1 md:space-x-2">
                        <Box>
                          <Icon name="close" size={isMiddleScreen ? 20 : 18} />
                        </Box>

                        <Text
                          style={{ fontSize: isMiddleScreen ? '15px' : '13px' }}
                        >
                          {t('cancel')}
                        </Text>
                      </Box>
                    </Button>
                  )}

                  {onSaveClick && (
                    <Button
                      className="h-full"
                      type="primary"
                      onClick={onSaveClick}
                      style={{
                        padding: isMiddleScreen ? '0.75rem' : '0.5rem',
                      }}
                    >
                      <Box className="flex items-center space-x-1 md:space-x-2">
                        <Box>
                          <Icon name="save" size={isMiddleScreen ? 20 : 18} />
                        </Box>

                        <Text
                          style={{ fontSize: isMiddleScreen ? '15px' : '13px' }}
                        >
                          {t('save')}
                        </Text>
                      </Box>
                    </Button>
                  )}
                </Box>
              )}
            </Box>

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
