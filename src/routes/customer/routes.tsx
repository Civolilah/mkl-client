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
  </>
);

export default Routes;
