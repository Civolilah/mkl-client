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

import { AISearchAction, Default } from '@components/index';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  const pageLayoutAndActions = useAtomValue(pageLayoutAndActionsAtom);

  if (!pageLayoutAndActions) {
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

      <AISearchAction withoutFooterAction />
    </Default>
  );
};

export default LayoutWrapper;
