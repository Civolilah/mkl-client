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
import { Header } from '@components/index';

import { useColors } from '@hooks/index';

import MainNavBar from './MainNavBar';

export type BreadcrumbItem = {
  title: ReactNode;
  href?: string;
};

type Props = {
  children: ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
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
  // },
  {
    key: 'products',
    label: 'products',
    iconName: 'product',
    href: '/products',
    visible: true,
    iconSize: 27,
    rightIcon: {
      name: 'add',
      href: '/products/new',
      tooltipText: 'new_product',
      visible: true,
    },
  },
  {
    key: 'sold_products',
    label: 'sold_products',
    iconName: 'soldProducts',
    href: '/sold_products',
    visible: true,
    iconSize: 22,
  },
  {
    key: 'suppliers',
    label: 'suppliers',
    iconName: 'truck',
    href: '/suppliers',
    iconSize: 24,
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
    iconSize: 23,
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
    iconSize: 25,
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
    iconSize: 20.5,
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
    iconSize: 22.75,
    rightIcon: {
      name: 'add',
      href: '/statuses/new',
      tooltipText: 'new_status',
      visible: true,
    },
  },
  {
    key: 'profile',
    label: 'profile',
    iconName: 'person',
    href: '/profile',
    iconSize: 26,
    visible: true,
  },
  // {
  //   key: 'reports',
  //   label: 'Reports',
  //   iconName: 'barChart',
  //   href: '/reports',
  //   visible: true,
  // },
  // {
  //   key: 'biling',
  //   label: 'biling',
  //   iconName: 'attachMoney',
  //   href: '/biling',
  //   visible: true,
  // },
];

const Default = (props: Props) => {
  const { title, children, breadcrumbs } = props;

  const colors = useColors();
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const navigate = useNavigate();

  return (
    <div
      className={classNames('flex min-w-screen min-h-screen')}
      style={{ backgroundColor: colors.$3 }}
    >
      <div className="flex flex-col flex-1 justify-start items-center">
        <Header title={title} />

        <div className="flex w-full h-full">
          <div className="hidden lg:flex lg:justify-start">
            <MainNavBar items={navItems} />
          </div>

          <div className="flex flex-col flex-1 justify-center items-center p-4 md:p-6">
            {breadcrumbs && (
              <div className="flex w-full justify-start">
                <div className="flex items-center space-x-2">
                  <div
                    className="flex items-center space-x-2 cursor-pointer"
                    onClick={() => navigate('/')}
                  >
                    <Icon
                      name="home"
                      size={isMiddleScreen ? 25 : 22}
                      style={{ color: '#6aa3ff' }}
                    />

                    <div>
                      <Icon
                        name="arrowForward"
                        size={isMiddleScreen ? 13 : 11}
                        style={{ color: colors.$12 }}
                      />
                    </div>
                  </div>

                  {breadcrumbs.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2"
                      style={{ fontSize: isMiddleScreen ? 16 : 14 }}
                    >
                      <div
                        className={classNames({
                          'cursor-pointer hover:underline':
                            index !== breadcrumbs.length - 1,
                        })}
                        style={{
                          color:
                            index !== breadcrumbs.length - 1
                              ? colors.$11
                              : colors.$13,
                        }}
                      >
                        {item.title}
                      </div>

                      {index !== breadcrumbs.length - 1 && (
                        <div>
                          <Icon
                            name="arrowForward"
                            size={isMiddleScreen ? 13 : 11}
                            style={{ color: colors.$12 }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-1 w-full justify-center items-center pt-2 md:pt-4">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Default;
