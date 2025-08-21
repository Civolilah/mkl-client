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

const Employees = lazy(() => import('@pages/employees/Employees'));
const CreateEmployee = lazy(() => import('@pages/employees/create/Create'));
const EditEmployee = lazy(() => import('@pages/employees/edit/Edit'));
const ShowEmployee = lazy(() => import('@pages/employees/show/Show'));

const Routes = (
  <>
    <Route
      path="/employees"
      element={
        <RoutePermission
          permissions={['admin']}
          routeComponent={<Employees />}
        />
      }
    />

    <Route
      path="/employees/new"
      element={
        <RoutePermission
          permissions={['admin']}
          routeComponent={<CreateEmployee />}
        />
      }
    />

    <Route
      path="/employees/:id/show"
      element={
        <RoutePermission
          permissions={['admin']}
          routeComponent={<ShowEmployee />}
        />
      }
    />

    <Route
      path="/employees/:id/edit"
      element={
        <RoutePermission
          permissions={['admin']}
          routeComponent={<EditEmployee />}
        />
      }
    />
  </>
);

export default Routes;
