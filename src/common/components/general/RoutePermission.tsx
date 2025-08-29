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

import { PermissionScreen } from '@components/index';

import useHasPermission, { Permission } from '@hooks/global/useHasPermission';

type Props = {
  permissions: Permission[];
  routeComponent: ReactNode;
};

const RoutePermission = (props: Props) => {
  const { permissions, routeComponent } = props;

  const hasPermission = useHasPermission();

  const doesHavePermissionForRoute = permissions.some((permission) =>
    hasPermission(permission)
  );

  if (!doesHavePermissionForRoute) {
    return <PermissionScreen />;
  }

  return routeComponent;
};

export default RoutePermission;
