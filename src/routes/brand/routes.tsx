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

const Brands = lazy(() => import('@pages/brands/Brands'));
const CreateBrand = lazy(() => import('@pages/brands/create/Create'));
const EditBrand = lazy(() => import('@pages/brands/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/brands"
      element={
        <RoutePermission
          permissions={['create_brand', 'edit_brand', 'view_brand']}
          routeComponent={<Brands />}
        />
      }
    />

    <Route
      path="/brands/new"
      element={
        <RoutePermission
          permissions={['create_brand']}
          routeComponent={<CreateBrand />}
        />
      }
    />

    <Route
      path="/brands/:id/edit"
      element={
        <RoutePermission
          permissions={['create_brand', 'edit_brand', 'view_brand']}
          routeComponent={<EditBrand />}
        />
      }
    />
  </>
);

export default Routes;
