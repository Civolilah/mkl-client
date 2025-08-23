/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode, useMemo } from 'react';

import { useAtomValue } from 'jotai';
import { useLocation } from 'react-router-dom';

import { Default } from '@components/index';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';

interface Props {
  children: ReactNode;
}

const LAYOUT_WRAPPER_COVERED_ROUTES = [
  '/employees',
  '/employees/new',
  '/employees/:id/edit',
  '/employees/:id/show',
  '/subsidiaries',
  '/subsidiaries/new',
  '/subsidiaries/:id/edit',
];

const LayoutWrapper = ({ children }: Props) => {
  const location = useLocation();

  const pageLayoutAndActions = useAtomValue(pageLayoutAndActionsAtom);

  const updatedLayoutWrapperCoveredRoutes = useMemo(() => {
    return LAYOUT_WRAPPER_COVERED_ROUTES.map((route) => {
      if (route.includes(':id')) {
        const idFromPath = location.pathname.split('/')[2];

        return route.replace(':id', idFromPath);
      }

      return route;
    });
  }, [location]);

  if (
    !pageLayoutAndActions ||
    !updatedLayoutWrapperCoveredRoutes.includes(location.pathname)
  ) {
    return <>{children}</>;
  }

  return (
    <Default
      title={pageLayoutAndActions.title}
      breadcrumbs={pageLayoutAndActions.breadcrumbs?.breadcrumbs || []}
      onSaveClick={pageLayoutAndActions.buttonAction?.onClick}
      disabledSaveButton={pageLayoutAndActions.buttonAction?.isDisabled}
      disabledSaveButtonWithLoadingIcon={
        pageLayoutAndActions.buttonAction?.disabledWithLoadingIcon
      }
      actions={pageLayoutAndActions.actions?.list || []}
      footer={pageLayoutAndActions.footer}
      saveButtonLabel={pageLayoutAndActions.buttonAction?.label}
      saveButtonIcon={pageLayoutAndActions.buttonAction?.iconName}
      saveButtonIconColor={pageLayoutAndActions.buttonAction?.iconColor}
      displayPermissionTooltip={
        pageLayoutAndActions.buttonAction?.displayPermissionTooltip
      }
      tooltipPermissionMessage={
        pageLayoutAndActions.buttonAction?.tooltipPermissionMessage
      }
    >
      {children}
    </Default>
  );
};

export default LayoutWrapper;
