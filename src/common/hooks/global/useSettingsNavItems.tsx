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

import { useEnableInvoicingFeature, useUserType } from '@hooks/index';

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
  const { isEnabledInvoicing } = useEnableInvoicingFeature();
  const { isSupplier, isCustomer, isInventoryManager } = useUserType();

  const navItems: NavItem[] = [
    {
      key: 'profile',
      label: 'profile',
      iconName: 'person',
      href: '/settings/profile',
      visible: true,
      iconSize: '1.29rem',
    },
  ];

  return navItems;
};

export default useSettingsNavItems;
