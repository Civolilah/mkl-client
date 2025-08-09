/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { lazy } from 'react';

import { Route } from 'react-router-dom';

import { RoutePermission } from '@components/index';

const Warehouses = lazy(() => import('@pages/warehouses/Warehouses'));
const CreateWarehouse = lazy(() => import('@pages/warehouses/create/Create'));
const EditWarehouse = lazy(() => import('@pages/warehouses/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/warehouses"
      element={
        <RoutePermission
          permissions={['create_warehouse', 'edit_warehouse', 'view_warehouse']}
          routeComponent={<Warehouses />}
        />
      }
    />

    <Route
      path="/warehouses/new"
      element={
        <RoutePermission
          permissions={['create_warehouse']}
          routeComponent={<CreateWarehouse />}
        />
      }
    />

    <Route
      path="/warehouses/:id/edit"
      element={
        <RoutePermission
          permissions={['create_warehouse', 'edit_warehouse', 'view_warehouse']}
          routeComponent={<EditWarehouse />}
        />
      }
    />
  </>
);

export default Routes;
