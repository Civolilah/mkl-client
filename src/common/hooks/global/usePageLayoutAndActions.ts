/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect } from 'react';

import { atom, useSetAtom } from 'jotai';

import { BreadcrumbItem } from '@components/layout/Default';

interface PageSaveButtonProps {
  isLoading: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  disabledWithLoadingIcon?: boolean;
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
  saveButton?: PageSaveButtonProps;
  breadcrumbs?: PageBreadcrumbsProps;
  addResourceButton?: AddResourceButtonProps;
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
