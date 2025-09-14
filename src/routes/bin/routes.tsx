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

const Bins = lazy(() => import('@pages/bins/Bins'));
const CreateBin = lazy(() => import('@pages/bins/create/Create'));
const EditBin = lazy(() => import('@pages/bins/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/bins"
      element={
        <RoutePermission
          permissions={['create_bin', 'edit_bin', 'view_bin']}
          routeComponent={<Bins />}
        />
      }
    />

    <Route
      path="/bins/new"
      element={
        <RoutePermission
          permissions={['create_bin']}
          routeComponent={<CreateBin />}
        />
      }
    />

    <Route
      path="/bins/:id/edit"
      element={
        <RoutePermission
          permissions={['create_bin', 'edit_bin', 'view_bin']}
          routeComponent={<EditBin />}
        />
      }
    />
  </>
);

export default Routes;
