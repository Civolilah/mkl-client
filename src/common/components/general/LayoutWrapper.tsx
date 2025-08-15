/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import { useAtomValue } from 'jotai';
import { useLocation } from 'react-router-dom';

import { Default } from '@components/index';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';

interface Props {
  children: ReactNode;
}

const LAYOUT_WRAPPER_COVERED_ROUTES = ['/employees/new'];

const LayoutWrapper = ({ children }: Props) => {
  const location = useLocation();

  const pageLayoutAndActions = useAtomValue(pageLayoutAndActionsAtom);

  if (
    !pageLayoutAndActions ||
    !LAYOUT_WRAPPER_COVERED_ROUTES.includes(location.pathname)
  ) {
    return <>{children}</>;
  }

  return (
    <Default
      title={pageLayoutAndActions.title}
      breadcrumbs={pageLayoutAndActions.breadcrumbs?.breadcrumbs || []}
      onSaveClick={pageLayoutAndActions.saveButton?.onClick}
      disabledSaveButton={pageLayoutAndActions.saveButton?.isDisabled}
      disabledSaveButtonWithLoadingIcon={
        pageLayoutAndActions.saveButton?.disabledWithLoadingIcon
      }
    >
      {children}
    </Default>
  );
};

export default LayoutWrapper;
