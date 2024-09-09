/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { IconName } from '@components/general/Icon';
import { Image, NavItem as NavItemElement } from '@components/index';

import { useColors } from '@hooks/index';

import logoSrc from '../../../../public/images/logo.png';

type RightIcon = {
  name: IconName;
  href: string;
  tooltipText: string;
};

export type NavItem = {
  key: string;
  label: string;
  iconName: IconName;
  href: string;
  enabled: boolean;
  rightIcon?: RightIcon;
};

const NavigationBar = () => {
  const colors = useColors();

  const navItems: NavItem[] = [
    // {
    //   key: 'dashboard',
    //   label: 'Dashboard',
    //   iconName: 'dashboard',
    //   href: '/dashboard',
    //   enabled: true,
    // },
    {
      key: 'products',
      label: 'products',
      iconName: 'openBox',
      href: '/products',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/products/new',
        tooltipText: 'new_product',
      },
    },
    {
      key: 'suppliers',
      label: 'suppliers',
      iconName: 'truck',
      href: '/suppliers',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/suppliers/new',
        tooltipText: 'new_supplier',
      },
    },
    {
      key: 'categories',
      label: 'categories',
      iconName: 'category',
      href: '/categories',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/categories/new',
        tooltipText: 'new_category',
      },
    },
    {
      key: 'labels',
      label: 'labels',
      iconName: 'tag',
      href: '/labels',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/labels/new',
        tooltipText: 'new_label',
      },
    },
    {
      key: 'label_categories',
      label: 'label_categories',
      iconName: 'tags',
      href: '/label_categories',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/label_categories/new',
        tooltipText: 'new_label_category',
      },
    },
    {
      key: 'employees',
      label: 'employees',
      iconName: 'employees',
      href: '/employees',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/employees/new',
        tooltipText: 'new_employee',
      },
    },
    {
      key: 'statuses',
      label: 'statuses',
      iconName: 'assignment',
      href: '/statuses',
      enabled: true,
      rightIcon: {
        name: 'add',
        href: '/statuses/new',
        tooltipText: 'new_status',
      },
    },
    {
      key: 'profile',
      label: 'profile',
      iconName: 'person',
      href: '/profile',
      enabled: true,
    },
    // {
    //   key: 'reports',
    //   label: 'Reports',
    //   iconName: 'barChart',
    //   href: '/reports',
    //   enabled: true,
    // },
    // {
    //   key: 'biling',
    //   label: 'biling',
    //   iconName: 'attachMoney',
    //   href: '/biling',
    //   enabled: true,
    // },
  ];

  return (
    <nav
      className="flex flex-col space-y-7 h-screen shadow-lg"
      style={{ backgroundColor: colors.$6 }}
    >
      <div className="flex items-center py-4 pl-6">
        <Image
          src={logoSrc.src}
          width={120}
          height={35}
          alt="The MKL Logo"
          preview={false}
        />
      </div>

      <div className="flex flex-col space-y-1 flex-1 px-4 overflow-hidden break-all">
        {navItems
          .filter((item) => item.enabled)
          .map((item) => (
            <NavItemElement key={item.key} item={item} />
          ))}
      </div>

      <div
        className="py-3 border-t flex items-center justify-center"
        style={{
          fontFamily: 'Arial, sans-serif',
          color: '#666',
        }}
      >
        Icons
      </div>
    </nav>
  );
};

export default NavigationBar;
