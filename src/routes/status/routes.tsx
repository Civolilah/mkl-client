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

const Statuses = lazy(() => import('@pages/statuses/Statuses'));
const CreateStatus = lazy(() => import('@pages/statuses/create/Create'));

const Routes = (
  <>
    <Route path="/statuses" element={<Statuses />} />

    <Route path="/statuses/new" element={<CreateStatus />} />
  </>
);

export default Routes;
