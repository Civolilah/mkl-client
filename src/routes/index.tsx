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

import { PrivateRoute } from '@components/index';

import authenticationRoutes from './authentication/routes';
import binRoutes from './bin/routes';
import brandRoutes from './brand/routes';
import categoryRoutes from './category/routes';
import customerRoutes from './customer/routes';
import employeeRoutes from './employee/routes';
import labelRoutes from './label/routes';
import labelCategoryRoutes from './label-category/routes';
import productRoutes from './product/routes';
import settingsRoutes from './settings/routes';
import statusRoutes from './status/routes';
import subsidiaryRoutes from './subsidiary/routes';
import supplierRoutes from './supplier/routes';
import taxRateRoutes from './tax-rate/routes';
import warehouseRoutes from './warehouse/routes';

const IndexPage = lazy(() => import('@pages/index'));
const Dashboard = lazy(() => import('@pages/dashboard/Dashboard'));
const NotFound = lazy(() => import('@pages/not-found/NotFound'));
const Unauthorized = lazy(() => import('@pages/unauthorized/Unauthorized'));

export const routes = (
  <Routes>
    <Route path="/" element={<IndexPage />} />

    {authenticationRoutes}

    <Route element={<PrivateRoute />}>
      <Route path="/dashboard" element={<Dashboard />} />

      {productRoutes}

      {warehouseRoutes}

      {brandRoutes}

      {supplierRoutes}

      {subsidiaryRoutes}

      {customerRoutes}

      {categoryRoutes}

      {labelRoutes}

      {labelCategoryRoutes}

      {employeeRoutes}

      {taxRateRoutes}

      {binRoutes}

      {statusRoutes}

      {settingsRoutes}
    </Route>

    <Route path="unauthorized" element={<Unauthorized />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);
