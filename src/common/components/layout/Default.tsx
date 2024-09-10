/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Poppins } from 'next/font/google';

import classNames from 'classnames';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

import { redirect } from 'src/navigation';

import { Header, MobileNavBar } from '@components/index';

import { useColors } from '@hooks/index';

import MainNavBar from './MainNavBar';
import { IconName } from '@components/general/Icon';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  children: ReactNode;
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

const Default = async ({ children }: Props) => {
  const colors = useColors();

  const session = await getServerSession();

  if (!session) {
    redirect('/login');
    return null;
  }

  const navItems: NavItem[] = [
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
      iconSize: 25.5,
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

  return (
    <div
      className={classNames(
        'flex min-w-screen min-h-screen',
        poppins.className
      )}
      style={{ backgroundColor: colors.$3 }}
    >
      <div className="hidden lg:flex">
        <MainNavBar items={navItems} />
      </div>

      <div className="lg:hidden flex">
        <MobileNavBar items={navItems} />
      </div>

      <div className="flex flex-col flex-1 justify-center items-center">
        <Header />

        <div className="flex flex-1 justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Default;
