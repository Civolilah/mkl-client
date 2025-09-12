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

const Settings = lazy(() => import('@pages/settings/Settings'));
const Profile = lazy(() => import('@pages/settings/pages/profile/Profile'));
const Notifications = lazy(
  () => import('@pages/settings/pages/notifications/Notifications')
);
const CustomFields = lazy(
  () => import('@pages/settings/pages/custom-fields/CustomFields')
);
const Product = lazy(() => import('@pages/settings/pages/product/Product'));
const TaxRates = lazy(() => import('@pages/settings/pages/tax-rates/TaxRates'));
const CompanyDetails = lazy(
  () => import('@pages/settings/pages/company-details/CompanyDetails')
);

const Routes = (
  <Route path="/settings" element={<Settings />}>
    <Route path="profile" element={<Profile />} />
    <Route path="company_details" element={<CompanyDetails />} />
    <Route path="tax_rates" element={<TaxRates />} />
    <Route path="product" element={<Product />} />
    <Route path="notifications" element={<Notifications />} />
    <Route path="custom_fields" element={<CustomFields />} />
  </Route>
);

export default Routes;
