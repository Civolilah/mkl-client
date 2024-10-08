/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Route } from 'react-router-dom';

import { Login, Logout, Register } from '@pages/authentication';

import { PrivateRoute, PublicRoute } from '@components/index';

const Routes = (
  <>
    <Route element={<PublicRoute />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>

    <Route element={<PrivateRoute />}>
      <Route path="/logout" element={<Logout />} />
    </Route>
  </>
);

export default Routes;
