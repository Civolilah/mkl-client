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

const TaxRates = lazy(() => import('@pages/tax-rates/TaxRates'));
const CreateTaxRate = lazy(() => import('@pages/tax-rates/create/Create'));
const EditTaxRate = lazy(() => import('@pages/tax-rates/edit/Edit'));

const Routes = (
  <>
    <Route
      path="/tax_rates"
      element={
        <RoutePermission
          permissions={['create_tax_rate', 'edit_tax_rate', 'view_tax_rate']}
          routeComponent={<TaxRates />}
        />
      }
    />

    <Route
      path="/tax_rates/new"
      element={
        <RoutePermission
          permissions={['create_tax_rate']}
          routeComponent={<CreateTaxRate />}
        />
      }
    />

    <Route
      path="/tax_rates/:id/edit"
      element={
        <RoutePermission
          permissions={['create_tax_rate', 'edit_tax_rate', 'view_tax_rate']}
          routeComponent={<EditTaxRate />}
        />
      }
    />
  </>
);

export default Routes;
