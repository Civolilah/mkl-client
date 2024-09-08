/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import { IconName } from '@components/general/Icon';
import { Icon, Link } from '@components/index';

type NavItem = {
  key: string;
  label: string;
  iconName: IconName;
  href: string;
  enabled: boolean;
};

const NavigationBar = () => {
  const navItems: NavItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      iconName: 'dashboard',
      href: '/dashboard',
      enabled: true,
    },
    {
      key: 'sales',
      label: 'Sales',
      iconName: 'shoppingCart',
      href: '/sales',
      enabled: true,
    },
    {
      key: 'purchase',
      label: 'Purchase',
      iconName: 'shoppingBasket',
      href: '/purchase',
      enabled: true,
    },
    {
      key: 'inventory',
      label: 'Inventory',
      iconName: 'inventory',
      href: '/inventory',
      enabled: true,
    },
    {
      key: 'suppliers',
      label: 'Suppliers',
      iconName: 'group',
      href: '/suppliers',
      enabled: true,
    },
    {
      key: 'clients',
      label: 'Clients',
      iconName: 'people',
      href: '/clients',
      enabled: true,
    },
    {
      key: 'teams',
      label: 'Teams',
      iconName: 'groups',
      href: '/teams',
      enabled: true,
    },
    {
      key: 'tasks',
      label: 'Tasks',
      iconName: 'assignment',
      href: '/tasks',
      enabled: true,
    },
    {
      key: 'reports',
      label: 'Reports',
      iconName: 'barChart',
      href: '/reports',
      enabled: true,
    },
    {
      key: 'priceList',
      label: 'Daily Price List',
      iconName: 'attachMoney',
      href: '/price-list',
      enabled: true,
    },
  ];

  return (
    <nav className="flex flex-col bg-white h-screen w-72 shadow-lg">
      <div className="p-4">App Logo</div>
      <div className="flex-1 overflow-y-auto">
        User component
        <ul>
          {navItems
            .filter((item) => item.enabled)
            .map((item) => (
              <li key={item.key} className="mb-2">
                <Link
                  to={item.href}
                  className="flex items-center p-2 mx-2 rounded hover:bg-blue-100"
                >
                  <Icon name={item.iconName} />

                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="p-4 border-t flex items-center">
        Image
        <span>Abedin Halilovic</span>
      </div>
    </nav>
  );
};

export default NavigationBar;
