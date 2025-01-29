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

import useHasPermission from './useHasPermission';

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
  iconSize: string;
};

const useNavItems = () => {
  const hasPermission = useHasPermission();

  const navItems: NavItem[] = [
    // {
    //   key: 'dashboard',
    //   label: 'Dashboard',
    //   iconName: 'dashboard',
    //   href: '/dashboard',
    //   visible: true,
    //   iconSize: '1.313rem', // 21px
    // },
    {
      key: 'products',
      label: 'products',
      iconName: 'product',
      href: '/products',
      visible: true,
      iconSize: '1.594rem', // 25.5px
      rightIcon: {
        name: 'add',
        href: '/products/new',
        tooltipText: 'new_product',
        visible: true,
      },
    },
    {
      key: 'import',
      label: 'import',
      iconName: 'import',
      href: '/import',
      visible: true,
      iconSize: '1.5rem',
    },
    {
      key: 'store',
      label: 'store',
      iconName: 'store',
      href: '/store',
      visible: true,
      iconSize: '1.406rem',
    },
    {
      key: 'export',
      label: 'export',
      iconName: 'export',
      href: '/export',
      visible: true,
      iconSize: '1.5rem',
    },
    {
      key: 'suppliers',
      label: 'suppliers',
      iconName: 'truck',
      href: '/suppliers',
      iconSize: '1.25rem',
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
      iconSize: '1.313rem',
      visible:
        hasPermission('create_subsidiary') ||
        hasPermission('view_subsidiary') ||
        hasPermission('edit_subsidiary'),
      rightIcon: {
        name: 'add',
        href: '/subsidiaries/new',
        tooltipText: 'new_subsidiary',
        visible: hasPermission('create_subsidiary'),
      },
    },
    {
      key: 'categories',
      label: 'categories',
      iconName: 'category',
      href: '/categories',
      iconSize: '1.438rem',
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
      iconSize: '1.25rem',
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
      iconSize: '1.5rem',
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
      visible: hasPermission('admin'),
      iconSize: '1.438rem',
      rightIcon: {
        name: 'add',
        href: '/employees/new',
        tooltipText: 'new_employee',
        visible: hasPermission('admin'),
      },
    },
    {
      key: 'statuses',
      label: 'statuses',
      iconName: 'assignment',
      href: '/statuses',
      visible:
        hasPermission('create_status') ||
        hasPermission('view_status') ||
        hasPermission('edit_status'),
      iconSize: '1.406rem',
      rightIcon: {
        name: 'add',
        href: '/statuses/new',
        tooltipText: 'new_status',
        visible: hasPermission('create_status'),
      },
    },
    // {
    //   key: 'company_details',
    //   label: 'company_details',
    //   iconName: 'company',
    //   href: '/company_details',
    //   iconSize: '1.563rem', // 25px
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

  return navItems;
};

export default useNavItems;
