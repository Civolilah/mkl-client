/* eslint-disable indent */
/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect } from 'react';

import { endpoint as endpointHelper, request } from '@helpers/index';
import { cloneDeep } from 'lodash';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useCompanyPlan } from '@hooks/index';

type Params<T> = {
  queryIdentifiers: string[];
  endpoint: string;
  setEntity?: Dispatch<SetStateAction<T | undefined>>;
  setEntities?: Dispatch<SetStateAction<T[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setInitialResponse?: Dispatch<SetStateAction<T | undefined>>;
  listQuery?: boolean;
  formatRecords?: (data: T[]) => T[];
  enableByPermission: boolean;
};

const useFetchEntity = <T>({
  queryIdentifiers,
  endpoint,
  setEntity,
  setIsLoading,
  setInitialResponse,
  setEntities,
  listQuery,
  formatRecords,
  enableByPermission,
}: Params<T>) => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { companyPlan } = useCompanyPlan();

  const {
    data: entityResponse,
    isLoading,
    refetch,
  } = useQuery(
    listQuery ? queryIdentifiers : [...queryIdentifiers, id],
    ({ signal }) =>
      request(
        'GET',
        listQuery
          ? endpoint
          : endpointHelper(`${endpoint}/:id`, {
              id: id as string,
            }),
        {},
        { signal }
      ).then((response) => response.data),
    {
      enabled: (Boolean(id) || listQuery) && enableByPermission,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const handleRefresh = async () => {
    setIsLoading(true);

    const response = await refetch();

    setEntity?.(
      formatRecords
        ? formatRecords(cloneDeep(response.data))
        : cloneDeep(response.data)
    );
    setEntities?.(
      formatRecords
        ? formatRecords(cloneDeep(response.data))
        : cloneDeep(response.data)
    );

    setInitialResponse?.(
      formatRecords
        ? formatRecords(cloneDeep(response.data))
        : cloneDeep(response.data)
    );

    setIsLoading(false);
  };

  useEffect(() => {
    if (!id && !listQuery) {
      window.dispatchEvent(new CustomEvent('navigate_not_found_page'));
      return;
    }

    setIsLoading(isLoading);

    if (entityResponse) {
      setEntity?.(
        cloneDeep(
          formatRecords ? formatRecords(entityResponse) : entityResponse
        )
      );
      setEntities?.(
        cloneDeep(
          formatRecords ? formatRecords(entityResponse) : entityResponse
        )
      );

      setInitialResponse?.(
        cloneDeep(
          formatRecords ? formatRecords(entityResponse) : entityResponse
        )
      );
    }
  }, [entityResponse, isLoading]);

  useEffect(() => {
    if (companyPlan !== 'basic') {
      queryClient.invalidateQueries(queryIdentifiers);
    }
  }, []);

  return { refresh: handleRefresh };
};

export default useFetchEntity;
