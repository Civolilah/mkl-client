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

const Statuses = lazy(() => import('@pages/statuses/Statuses'));
const CreateStatus = lazy(() => import('@pages/statuses/create/Create'));
const EditStatus = lazy(() => import('@pages/statuses/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/statuses"
      element={
        <RoutePermission
          permissions={['create_status', 'edit_status', 'view_status']}
          routeComponent={<Statuses />}
        />
      }
    />

    <Route
      path="/statuses/new"
      element={
        <RoutePermission
          permissions={['create_status']}
          routeComponent={<CreateStatus />}
        />
      }
    />

    <Route
      path="/statuses/:id/edit"
      element={
        <RoutePermission
          permissions={['create_status', 'edit_status', 'view_status']}
          routeComponent={<EditStatus />}
        />
      }
    />
  </>
);

export default Routes;
