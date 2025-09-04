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

import { useHasPermission, useUserType } from '@hooks/index';

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
  iconSize?: string;
};

const useSettingsNavItems = () => {
  const hasPermission = useHasPermission();

  const { isInventoryManager } = useUserType();

  const navItems: NavItem[] = [
    {
      key: 'profile',
      label: 'profile',
      iconName: 'person',
      href: '/settings/profile',
      visible: true,
      iconSize: '1.2rem',
    },
    {
      key: 'company_details',
      label: 'company_details',
      iconName: 'company',
      href: '/settings/company_details',
      visible: hasPermission('owner'),
      iconSize: '1.2rem',
    },
    {
      key: 'payment_methods',
      label: 'payment_methods',
      iconName: 'payments',
      href: '/settings/payment_methods',
      visible: hasPermission('owner'),
      iconSize: '1.24rem',
    },
    {
      key: 'tax_rates',
      label: 'tax_rates',
      iconName: 'percentage',
      href: '/settings/tax_rates',
      visible: isInventoryManager,
      iconSize: '1.18rem',
    },
    {
      key: 'product',
      label: 'product',
      iconName: 'product',
      href: '/settings/product',
      visible: true,
      iconSize: '1.3rem',
    },
    {
      key: 'custom_fields',
      label: 'custom_fields',
      iconName: 'outlineViewColumn',
      href: '/settings/custom_fields',
      visible: isInventoryManager,
      iconSize: '1.3rem',
    },
    {
      key: 'notifications',
      label: 'notifications',
      iconName: 'notifications',
      href: '/settings/notifications',
      visible: true,
      iconSize: '1.325rem',
    },
    {
      key: 'billing',
      label: 'billing',
      iconName: 'creditCard',
      href: '/settings/billing',
      visible: hasPermission('owner'),
      iconSize: '1.2rem',
    },
  ];

  return navItems;
};

export default useSettingsNavItems;
