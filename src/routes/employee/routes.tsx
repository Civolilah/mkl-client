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

const Employees = lazy(() => import('@pages/employees/Employees'));
const CreateEmployee = lazy(() => import('@pages/employees/create/Create'));

const Routes = (
  <>
    <Route path="/employees" element={<Employees />} />

    <Route path="/employees/new" element={<CreateEmployee />} />
  </>
);

export default Routes;
