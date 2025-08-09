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
  iconSize?: string;
};

const useNavItems = () => {
  const hasPermission = useHasPermission();

  const navItems: NavItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      iconName: 'dashboard',
      href: '/dashboard',
      visible: hasPermission('view_dashboard'),
      iconSize: '1.129rem',
    },
    {
      key: 'products',
      label: 'products',
      iconName: 'product',
      href: '/products',
      visible:
        hasPermission('create_product') ||
        hasPermission('view_product') ||
        hasPermission('edit_product'),
      iconSize: '1.29rem',
      rightIcon: {
        name: 'add',
        href: '/products/new',
        tooltipText: 'new_product',
        visible: hasPermission('create_product'),
      },
    },
    {
      key: 'import',
      label: 'import',
      iconName: 'import',
      href: '/import',
      visible: hasPermission('import_products'),
      iconSize: '1.236rem',
    },
    {
      key: 'store',
      label: 'store',
      iconName: 'store',
      href: '/store',
      visible: hasPermission('view_store'),
      iconSize: '1.129rem',
    },
    {
      key: 'export',
      label: 'export',
      iconName: 'export',
      href: '/export',
      visible: hasPermission('export_products'),
      iconSize: '1.236rem',
    },
    {
      key: 'warehouses',
      label: 'warehouses',
      iconName: 'warehouse',
      href: '/warehouses',
      iconSize: '1.1rem',
      visible:
        hasPermission('create_warehouse') ||
        hasPermission('view_warehouse') ||
        hasPermission('edit_warehouse'),
      rightIcon: {
        name: 'add',
        href: '/warehouses/new',
        tooltipText: 'new_warehouse',
        visible: hasPermission('create_warehouse'),
      },
    },
    {
      key: 'brands',
      label: 'brands',
      iconName: 'brand',
      href: '/brands',
      iconSize: '1.183rem',
      visible:
        hasPermission('create_brand') ||
        hasPermission('view_brand') ||
        hasPermission('edit_brand'),
      rightIcon: {
        name: 'add',
        href: '/brands/new',
        tooltipText: 'new_brand',
        visible: hasPermission('create_brand'),
      },
    },
    {
      key: 'suppliers',
      label: 'suppliers',
      iconName: 'truck',
      href: '/suppliers',
      iconSize: '1.075rem',
      visible:
        hasPermission('create_supplier') ||
        hasPermission('view_supplier') ||
        hasPermission('edit_supplier'),
      rightIcon: {
        name: 'add',
        href: '/suppliers/new',
        tooltipText: 'new_supplier',
        visible: hasPermission('create_supplier'),
      },
    },
    {
      key: 'subsidiaries',
      label: 'subsidiaries',
      iconName: 'subsidiary',
      href: '/subsidiaries',
      iconSize: '1.021rem',
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
      iconSize: '1.129rem',
      visible:
        hasPermission('create_category') ||
        hasPermission('view_category') ||
        hasPermission('edit_category'),
      rightIcon: {
        name: 'add',
        href: '/categories/new',
        tooltipText: 'new_category',
        visible: hasPermission('create_category'),
      },
    },
    {
      key: 'labels',
      label: 'labels',
      iconName: 'tag',
      href: '/labels',
      visible:
        hasPermission('create_label') ||
        hasPermission('view_label') ||
        hasPermission('edit_label'),
      iconSize: '0.968rem',
      rightIcon: {
        name: 'add',
        href: '/labels/new',
        tooltipText: 'new_label',
        visible: hasPermission('create_label'),
      },
    },
    {
      key: 'label_categories',
      label: 'label_categories',
      iconName: 'tags',
      href: '/label_categories',
      visible:
        hasPermission('create_label_category') ||
        hasPermission('view_label_category') ||
        hasPermission('edit_label_category'),
      iconSize: '1.129rem',
      rightIcon: {
        name: 'add',
        href: '/label_categories/new',
        tooltipText: 'new_label_category',
        visible: hasPermission('create_label_category'),
      },
    },
    {
      key: 'employees',
      label: 'employees',
      iconName: 'employees',
      href: '/employees',
      visible: hasPermission('admin'),
      iconSize: '1.129rem',
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
      iconSize: '1.129rem',
      rightIcon: {
        name: 'add',
        href: '/statuses/new',
        tooltipText: 'new_status',
        visible: hasPermission('create_status'),
      },
    },
    // {
    //   key: 'e_store',
    //   label: 'e_store',
    //   iconName: 'shopCart',
    //   href: '/e_store',
    //   iconSize: '1.29rem',
    //   visible: hasPermission('admin'),
    // },
    {
      key: 'settings',
      label: 'settings',
      iconName: 'settings',
      href: '/settings',
      iconSize: '1.263rem',
      visible: true,
    },

    // {
    //   key: 'reports',
    //   label: 'Reports',
    //   iconName: 'barChart',
    //   href: '/reports',
    //   iconSize: '1.344rem',
    //   visible: true,
    // },
  ];

  return navItems;
};

export default useNavItems;
