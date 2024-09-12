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

const Products = lazy(() => import('@pages/products/Products'));

const Routes = (
  <>
    <Route path="/products" element={<Products />} />
  </>
);

export default Routes;
