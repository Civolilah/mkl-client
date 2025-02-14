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

const Suppliers = lazy(() => import('@pages/suppliers/Suppliers'));
const CreateSupplier = lazy(() => import('@pages/suppliers/create/Create'));
const EditSupplier = lazy(() => import('@pages/suppliers/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/suppliers"
      element={
        <RoutePermission
          permissions={['create_supplier', 'edit_supplier', 'view_supplier']}
          routeComponent={<Suppliers />}
        />
      }
    />

    <Route
      path="/suppliers/new"
      element={
        <RoutePermission
          permissions={['create_supplier']}
          routeComponent={<CreateSupplier />}
        />
      }
    />

    <Route
      path="/suppliers/:id/edit"
      element={
        <RoutePermission
          permissions={['create_supplier', 'edit_supplier', 'view_supplier']}
          routeComponent={<EditSupplier />}
        />
      }
    />
  </>
);

export default Routes;
