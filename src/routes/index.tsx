/**
 * Invoice Ninja (https://invoiceninja.com).
 *
 * @link https://github.com/invoiceninja/invoiceninja source repository
 *
 * @copyright Copyright (c) 2022. Invoice Ninja LLC (https://invoiceninja.com)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { lazy } from 'react';

import { Route, Routes } from 'react-router';

import Index from '@pages/index';

import { PrivateRoute } from '@components/index';

import authenticationRoutes from './authentication/routes';
import productRoutes from './product/routes';

const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('@pages/not-found/NotFound'));

export const routes = (
  <Routes>
    <Route path="/" element={<Index />} />

    {authenticationRoutes}

    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />

      {productRoutes}
    </Route>

    <Route path="*" element={<NotFound />} />
  </Routes>
);
