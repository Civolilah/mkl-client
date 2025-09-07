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

const Routes = (
  <Route path="/settings" element={<Settings />}>
    <Route path="profile" element={<Profile />} />
    <Route path="notifications" element={<Notifications />} />
  </Route>
);

export default Routes;
