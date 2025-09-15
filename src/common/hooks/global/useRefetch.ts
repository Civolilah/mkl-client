/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useQueryClient } from 'react-query';

export type RefetchEntity =
  | 'brands'
  | 'labels'
  | 'label_categories'
  | 'products'
  | 'categories'
  | 'statuses'
  | 'subsidiaries'
  | 'users'
  | 'suppliers'
  | 'warehouses'
  | 'companies'
  | 'profile'
  | 'notifications'
  | 'custom_fields'
  | 'product_settings'
  | 'tax_rates'
  | 'bins'
  | 'company_details';

type Endpoint =
  | '/api/brands'
  | '/api/labels'
  | '/api/label_categories'
  | '/api/products'
  | '/api/categories'
  | '/api/statuses'
  | '/api/subsidiaries'
  | '/api/users'
  | '/api/suppliers'
  | '/api/warehouses'
  | '/api/companies'
  | '/api/users/profile'
  | '/api/users/notifications'
  | '/api/companies/custom_fields'
  | '/api/companies/product_settings'
  | '/api/companies/tax_rates'
  | '/api/bins'
  | '/api/companies/details';

type RefetchObject = {
  mainEndpoint: Endpoint;
  dependencies: Endpoint[];
};

const REFETCH_DEPENDENCIES: Record<RefetchEntity, RefetchObject> = {
  brands: {
    mainEndpoint: '/api/brands',
    dependencies: ['/api/products'],
  },
  labels: {
    mainEndpoint: '/api/labels',
    dependencies: ['/api/label_categories', '/api/products'],
  },
  label_categories: {
    mainEndpoint: '/api/label_categories',
    dependencies: ['/api/labels', '/api/products'],
  },
  products: {
    mainEndpoint: '/api/products',
    dependencies: [],
  },
  categories: {
    mainEndpoint: '/api/categories',
    dependencies: [],
  },
  statuses: {
    mainEndpoint: '/api/statuses',
    dependencies: ['/api/products'],
  },
  subsidiaries: {
    mainEndpoint: '/api/subsidiaries',
    dependencies: ['/api/products'],
  },
  users: {
    mainEndpoint: '/api/users',
    dependencies: ['/api/subsidiaries'],
  },
  suppliers: {
    mainEndpoint: '/api/suppliers',
    dependencies: ['/api/products'],
  },
  warehouses: {
    mainEndpoint: '/api/warehouses',
    dependencies: ['/api/products'],
  },
  companies: {
    mainEndpoint: '/api/companies',
    dependencies: [],
  },
  profile: {
    mainEndpoint: '/api/users/profile',
    dependencies: [],
  },
  notifications: {
    mainEndpoint: '/api/users/notifications',
    dependencies: [],
  },
  custom_fields: {
    mainEndpoint: '/api/companies/custom_fields',
    dependencies: [],
  },
  product_settings: {
    mainEndpoint: '/api/companies/product_settings',
    dependencies: [],
  },
  tax_rates: {
    mainEndpoint: '/api/companies/tax_rates',
    dependencies: [],
  },
  bins: {
    mainEndpoint: '/api/bins',
    dependencies: [],
  },
  company_details: {
    mainEndpoint: '/api/companies/details',
    dependencies: [],
  },
};

const useRefetch = () => {
  const queryClient = useQueryClient();

  return (refetchEntity: RefetchEntity[]) => {
    refetchEntity.forEach((entity) => {
      const { mainEndpoint, dependencies } = REFETCH_DEPENDENCIES[entity];
      queryClient.invalidateQueries([mainEndpoint]);

      dependencies.forEach((dependency) => {
        queryClient.invalidateQueries([dependency]);
      });
    });
  };
};

export default useRefetch;
