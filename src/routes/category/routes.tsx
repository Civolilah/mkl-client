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

const Categories = lazy(() => import('@pages/categories/Categories'));
const CreateCategory = lazy(() => import('@pages/categories/create/Create'));
const EditCategory = lazy(() => import('@pages/categories/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/categories"
      element={
        <RoutePermission
          permissions={['create_category', 'edit_category', 'view_category']}
          routeComponent={<Categories />}
        />
      }
    />

    <Route
      path="/categories/new"
      element={
        <RoutePermission
          permissions={['create_category']}
          routeComponent={<CreateCategory />}
        />
      }
    />

    <Route
      path="/categories/:id/edit"
      element={
        <RoutePermission
          permissions={['create_category', 'edit_category', 'view_category']}
          routeComponent={<EditCategory />}
        />
      }
    />
  </>
);

export default Routes;
