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

const LabelCategories = lazy(
  () => import('@pages/label-categories/LabelCategories')
);
const CreateLabelCategory = lazy(
  () => import('@pages/label-categories/create/Create')
);
const EditLabelCategory = lazy(
  () => import('@pages/label-categories/edit/Edit')
);

const Routes = (
  <>
    <Route
      path="/label_categories"
      element={
        <RoutePermission
          permissions={[
            'create_label_category',
            'edit_label_category',
            'view_label_category',
          ]}
          routeComponent={<LabelCategories />}
        />
      }
    />

    <Route
      path="/label_categories/new"
      element={
        <RoutePermission
          permissions={['create_label_category']}
          routeComponent={<CreateLabelCategory />}
        />
      }
    />

    <Route
      path="/label_categories/:id/edit"
      element={
        <RoutePermission
          permissions={[
            'create_label_category',
            'edit_label_category',
            'view_label_category',
          ]}
          routeComponent={<EditLabelCategory />}
        />
      }
    />
  </>
);

export default Routes;
