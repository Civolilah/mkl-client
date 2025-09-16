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

const Customers = lazy(() => import('@pages/customers/Customers'));
const CreateCustomer = lazy(() => import('@pages/customers/create/Create'));
const EditCustomer = lazy(() => import('@pages/customers/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/customers"
      element={
        <RoutePermission
          permissions={['create_customer', 'edit_customer', 'view_customer']}
          routeComponent={<Customers />}
        />
      }
    />

    <Route
      path="/customers/new"
      element={
        <RoutePermission
          permissions={['create_customer']}
          routeComponent={<CreateCustomer />}
        />
      }
    />

    <Route
      path="/customers/:id/edit"
      element={
        <RoutePermission
          permissions={['create_customer', 'edit_customer', 'view_customer']}
          routeComponent={<EditCustomer />}
        />
      }
    />
  </>
);

export default Routes;
