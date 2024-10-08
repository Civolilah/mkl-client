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

const Subsidiaries = lazy(() => import('@pages/subsidiaries/Subsidiaries'));
const CreateSubsidiary = lazy(
  () => import('@pages/subsidiaries/create/Create')
);
const EditSubsidiary = lazy(() => import('@pages/subsidiaries/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/subsidiaries"
      element={
        <RoutePermission
          permissions={[
            'create_subsidiary',
            'edit_subsidiary',
            'view_subsidiary',
          ]}
          routeComponent={<Subsidiaries />}
        />
      }
    />

    <Route
      path="/subsidiaries/new"
      element={
        <RoutePermission
          permissions={['create_subsidiary']}
          routeComponent={<CreateSubsidiary />}
        />
      }
    />

    <Route
      path="/subsidiaries/:id/edit"
      element={
        <RoutePermission
          permissions={[
            'create_subsidiary',
            'edit_subsidiary',
            'view_subsidiary',
          ]}
          routeComponent={<EditSubsidiary />}
        />
      }
    />
  </>
);

export default Routes;
