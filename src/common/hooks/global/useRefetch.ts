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

type RefetchEntity =
  | 'brands'
  | 'labels'
  | 'label_categories'
  | 'products'
  | 'categories'
  | 'statuses'
  | 'subsidiaries'
  | 'employees';

type Endpoint =
  | '/api/brands'
  | '/api/labels'
  | '/api/label_categories'
  | '/api/products'
  | '/api/categories'
  | '/api/statuses'
  | '/api/subsidiaries'
  | '/api/employees';

type RefetchObject = {
  mainEndpoint: Endpoint;
  dependencies: Endpoint[];
};

const REFETCH_DEPENDENCIES: Record<RefetchEntity, RefetchObject> = {
  brands: {
    mainEndpoint: '/api/brands',
    dependencies: [],
  },
  labels: {
    mainEndpoint: '/api/labels',
    dependencies: [],
  },
  label_categories: {
    mainEndpoint: '/api/label_categories',
    dependencies: [],
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
    dependencies: ['/api/products', '/api/employees'],
  },
  employees: {
    mainEndpoint: '/api/employees',
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
