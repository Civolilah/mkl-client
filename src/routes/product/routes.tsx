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

const Products = lazy(() => import('@pages/products/Products'));
const CreateProduct = lazy(() => import('@pages/products/create/Create'));
const EditProduct = lazy(() => import('@pages/products/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/products"
      element={
        <RoutePermission
          permissions={['create_product', 'edit_product', 'view_product']}
          routeComponent={<Products />}
        />
      }
    />

    <Route
      path="/products/new"
      element={
        <RoutePermission
          permissions={['create_product']}
          routeComponent={<CreateProduct />}
        />
      }
    />

    <Route
      path="/products/:id/edit"
      element={
        <RoutePermission
          permissions={['create_product', 'edit_product', 'view_product']}
          routeComponent={<EditProduct />}
        />
      }
    />
  </>
);

export default Routes;
