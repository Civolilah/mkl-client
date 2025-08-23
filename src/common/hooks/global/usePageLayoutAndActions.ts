/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode, useEffect } from 'react';

import { ItemType } from 'antd/es/menu/interface';
import { atom, useSetAtom } from 'jotai';

import { IconName } from '@components/general/Icon';
import { BreadcrumbItem } from '@components/layout/Default';

interface PageButtonActionProps {
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  disabledWithLoadingIcon?: boolean;
  label?: string;
  iconName?: IconName;
  iconColor?: string;
  displayPermissionTooltip?: boolean;
  tooltipPermissionMessage?: string;
}

interface PageActionsProps {
  list?: ItemType[];
}

interface PageBreadcrumbsProps {
  breadcrumbs: BreadcrumbItem[];
}

interface AddResourceButtonProps {
  label: string;
  onClick: () => void;
}

interface Params {
  title?: string;
  buttonAction?: PageButtonActionProps;
  breadcrumbs?: PageBreadcrumbsProps;
  addResourceButton?: AddResourceButtonProps;
  actions?: PageActionsProps;
  footer?: ReactNode;
}

export const pageLayoutAndActionsAtom = atom<Params | undefined>(undefined);

const usePageLayoutAndActions = (
  params: Params,
  dependencies: unknown[] = []
) => {
  const setPageLayoutAndActions = useSetAtom(pageLayoutAndActionsAtom);

  useEffect(() => {
    if (params) {
      setPageLayoutAndActions(params);
    }
  }, dependencies);
};

export default usePageLayoutAndActions;
