/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { t } from 'i18next';

import { IconName } from '@components/general/Icon';

import {
  useEnableInvoicingFeature,
  useUserType,
  useHasPermission,
} from '@hooks/index';

type RightIcon = {
  name: IconName;
  href: string;
  tooltipText: string;
  visible: boolean;
};

export type NavGroup = 'inventory' | 'locations' | 'partners' | 'taxonomy';

export type NavItem = {
  key: string;
  label: string;
  iconName: IconName;
  href: string;
  visible: boolean;
  rightIcon?: RightIcon;
  iconSize?: string;
  group?: NavGroup;
};

const useNavItems = () => {
  const hasPermission = useHasPermission();

  const { isEnabledInvoicing } = useEnableInvoicingFeature();
  const { isSupplier, isCustomer, isInventoryManager } = useUserType();

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
      key: 'orders',
      label: 'orders',
      iconName: 'clipboardList',
      href: '/orders',
      visible:
        (hasPermission('create_order') ||
          hasPermission('view_order') ||
          hasPermission('edit_order') ||
          isCustomer) &&
        isEnabledInvoicing,
      iconSize: '1.1rem',
      rightIcon: {
        name: 'add',
        href: '/orders/new',
        tooltipText: 'new_order',
        visible: hasPermission('create_order'),
      },
    },
    {
      key: 'products',
      label: 'products',
      iconName: 'product',
      href: '/products',
      visible:
        hasPermission('create_product') ||
        hasPermission('view_product') ||
        hasPermission('edit_product') ||
        isCustomer,
      iconSize: '1.29rem',
      rightIcon: {
        name: 'add',
        href: '/products/new',
        tooltipText: 'new_product',
        visible: hasPermission('create_product'),
      },
      group: 'inventory',
    },
    {
      key: 'purchase_orders',
      label: 'purchase_orders',
      iconName: 'fileInvoiceDollar',
      href: '/purchase_orders',
      visible:
        (hasPermission('create_purchase_order') ||
          hasPermission('view_purchase_order') ||
          hasPermission('edit_purchase_order') ||
          isSupplier) &&
        isEnabledInvoicing,
      iconSize: '1.129rem',
      rightIcon: {
        name: 'add',
        href: '/purchase_orders/new',
        tooltipText: 'new_purchase_order',
        visible: hasPermission('create_purchase_order'),
      },
      group: 'inventory',
    },
    {
      key: 'import_export',
      label: 'import_export',
      iconName: 'importExport',
      href: '/import',
      visible:
        (hasPermission('import_products') ||
          hasPermission('export_products')) &&
        isInventoryManager,
      iconSize: '1.4rem',
      group: 'inventory',
      rightIcon: {
        name: 'add',
        href: '/import_export/new',
        tooltipText: 'new_import_export',
        visible:
          hasPermission('import_products') || hasPermission('export_products'),
      },
    },
    {
      key: 'statuses',
      label: 'statuses',
      iconName: 'assignment',
      href: '/statuses',
      visible:
        (hasPermission('create_status') ||
          hasPermission('view_status') ||
          hasPermission('edit_status')) &&
        isInventoryManager,
      iconSize: '1.2rem',
      rightIcon: {
        name: 'add',
        href: '/statuses/new',
        tooltipText: 'new_status',
        visible: hasPermission('create_status'),
      },
      group: 'inventory',
    },
    {
      key: 'transfers',
      label: 'transfers',
      iconName: 'arrowsRightLeft',
      href: '/transfers',
      visible:
        (hasPermission('create_transfer') ||
          hasPermission('view_transfer') ||
          hasPermission('edit_transfer')) &&
        isInventoryManager,
      iconSize: '1.2rem',
      group: 'inventory',
      rightIcon: {
        name: 'add',
        href: '/transfers/new',
        tooltipText: 'new_transfer',
        visible: hasPermission('create_transfer'),
      },
    },
    {
      key: 'brands',
      label: 'brands',
      iconName: 'brand',
      href: '/brands',
      iconSize: '1.183rem',
      visible:
        (hasPermission('create_brand') ||
          hasPermission('view_brand') ||
          hasPermission('edit_brand')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/brands/new',
        tooltipText: 'new_brand',
        visible: hasPermission('create_brand'),
      },
      group: 'taxonomy',
    },
    {
      key: 'categories',
      label: 'categories',
      iconName: 'category',
      href: '/categories',
      iconSize: '1.129rem',
      visible:
        (hasPermission('create_category') ||
          hasPermission('view_category') ||
          hasPermission('edit_category')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/categories/new',
        tooltipText: 'new_category',
        visible: hasPermission('create_category'),
      },
      group: 'taxonomy',
    },
    {
      key: 'labels',
      label: 'labels',
      iconName: 'tag',
      href: '/labels',
      visible:
        (hasPermission('create_label') ||
          hasPermission('view_label') ||
          hasPermission('edit_label')) &&
        isInventoryManager,
      iconSize: '0.968rem',
      rightIcon: {
        name: 'add',
        href: '/labels/new',
        tooltipText: 'new_label',
        visible: hasPermission('create_label'),
      },
      group: 'taxonomy',
    },
    {
      key: 'label_categories',
      label: 'label_categories',
      iconName: 'tags',
      href: '/label_categories',
      visible:
        (hasPermission('create_label_category') ||
          hasPermission('view_label_category') ||
          hasPermission('edit_label_category')) &&
        isInventoryManager,
      iconSize: '1.129rem',
      rightIcon: {
        name: 'add',
        href: '/label_categories/new',
        tooltipText: 'new_label_category',
        visible: hasPermission('create_label_category'),
      },
      group: 'taxonomy',
    },

    {
      key: 'customers',
      label: 'customers',
      iconName: 'customer',
      href: '/customers',
      iconSize: '1.3rem',
      visible:
        (hasPermission('create_customer') ||
          hasPermission('view_customer') ||
          hasPermission('edit_customer')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/customers/new',
        tooltipText: 'new_customer',
        visible: hasPermission('create_customer'),
      },
      group: 'partners',
    },
    {
      key: 'suppliers',
      label: 'suppliers',
      iconName: 'truck',
      href: '/suppliers',
      iconSize: '1.075rem',
      visible:
        (hasPermission('create_supplier') ||
          hasPermission('view_supplier') ||
          hasPermission('edit_supplier')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/suppliers/new',
        tooltipText: 'new_supplier',
        visible: hasPermission('create_supplier'),
      },
      group: 'partners',
    },
    {
      key: 'subsidiaries',
      label: 'subsidiaries',
      iconName: 'subsidiary',
      href: '/subsidiaries',
      iconSize: '1.021rem',
      visible:
        (hasPermission('create_subsidiary') ||
          hasPermission('view_subsidiary') ||
          hasPermission('edit_subsidiary')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/subsidiaries/new',
        tooltipText: 'new_subsidiary',
        visible: hasPermission('create_subsidiary'),
      },
      group: 'locations',
    },
    {
      key: 'warehouses',
      label: 'warehouses',
      iconName: 'warehouse',
      href: '/warehouses',
      iconSize: '1rem',
      visible:
        (hasPermission('create_warehouse') ||
          hasPermission('view_warehouse') ||
          hasPermission('edit_warehouse')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/warehouses/new',
        tooltipText: 'new_warehouse',
        visible: hasPermission('create_warehouse'),
      },
      group: 'locations',
    },
    {
      key: 'bins',
      label: 'bins',
      iconName: 'boxAlignTopRightFilled',
      href: '/bins',
      iconSize: '1.25rem',
      visible:
        (hasPermission('create_bin') ||
          hasPermission('view_bin') ||
          hasPermission('edit_bin')) &&
        isInventoryManager,
      rightIcon: {
        name: 'add',
        href: '/bins/new',
        tooltipText: 'new_bin',
        visible: hasPermission('create_bin'),
      },
      group: 'locations',
    },
    {
      key: 'tax_rates',
      label: 'tax_rates',
      iconName: 'percentage',
      href: '/tax_rates',
      visible: isInventoryManager,
      iconSize: '1.1rem',
      rightIcon: {
        name: 'add',
        href: '/tax_rates/new',
        tooltipText: 'new_tax_rate',
        visible: hasPermission('create_tax_rate'),
      },
    },
    {
      key: 'employees',
      label: 'employees',
      iconName: 'employees',
      href: '/employees',
      visible: hasPermission('admin') && isInventoryManager,
      iconSize: '1.129rem',
      rightIcon: {
        name: 'add',
        href: '/employees/new',
        tooltipText: 'new_employee',
        visible: hasPermission('admin'),
      },
    },
    {
      key: 'reports',
      label: t('reports'),
      iconName: 'barChart',
      href: '/reports',
      iconSize: '1.344rem',
      visible: hasPermission('admin') && isInventoryManager,
    },
    {
      key: 'settings',
      label: 'settings',
      iconName: 'settings',
      href: '/settings/profile',
      iconSize: '1.263rem',
      visible: true,
    },
  ];

  return navItems;
};

export default useNavItems;
