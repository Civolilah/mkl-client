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

const Labels = lazy(() => import('@pages/labels/Labels'));
const CreateLabel = lazy(() => import('@pages/labels/create/Create'));
const EditLabel = lazy(() => import('@pages/labels/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/labels"
      element={
        <RoutePermission
          permissions={['create_label', 'edit_label', 'view_label']}
          routeComponent={<Labels />}
        />
      }
    />

    <Route
      path="/labels/new"
      element={
        <RoutePermission
          permissions={['create_label']}
          routeComponent={<CreateLabel />}
        />
      }
    />

    <Route
      path="/labels/:id/edit"
      element={
        <RoutePermission
          permissions={['create_label', 'edit_label', 'view_label']}
          routeComponent={<EditLabel />}
        />
      }
    />
  </>
);

export default Routes;
