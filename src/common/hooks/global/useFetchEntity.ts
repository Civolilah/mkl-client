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

import { endpoint, request } from '@helpers/index';
import { cloneDeep } from 'lodash';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { Subsidiary } from '@interfaces/index';

type Entity = Subsidiary;

type Params = {
  queryKey: string;
  setEntity?: Dispatch<SetStateAction<Entity | undefined>>;
  setEntities?: Dispatch<SetStateAction<Entity[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setInitialResponse?: Dispatch<SetStateAction<Entity | undefined>>;
  listQuery?: boolean;
};

const useFetchEntity = (params: Params) => {
  const {
    queryKey,
    setEntity,
    setIsLoading,
    setInitialResponse,
    setEntities,
    listQuery,
  } = params;

  const { id } = useParams();
  const queryClient = useQueryClient();

  const controller = new AbortController();

  const {
    data: entityResponse,
    isLoading,
    refetch,
  } = useQuery(
    listQuery ? [queryKey] : [queryKey, id],
    () =>
      request(
        'GET',
        listQuery
          ? queryKey
          : endpoint(`${queryKey}/:id`, {
              id: id as string,
            }),
        {},
        { signal: controller.signal }
      ).then((response) => response.data),
    {
      enabled: Boolean(id) || listQuery,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  const handleRefresh = async () => {
    setIsLoading(true);

    const response = await refetch();

    setEntity?.(cloneDeep(response.data));
    setEntities?.(cloneDeep(response.data));

    setInitialResponse?.(cloneDeep(response.data));

    setIsLoading(false);
  };

  useEffect(() => {
    if (!id && !listQuery) {
      window.dispatchEvent(new CustomEvent('navigate_not_found_page'));
      return;
    }

    setIsLoading(isLoading);

    if (entityResponse) {
      setEntity?.(cloneDeep(entityResponse));
      setEntities?.(cloneDeep(entityResponse));

      setInitialResponse?.(cloneDeep(entityResponse));
    }

    return () => {
      controller.abort();
    };
  }, [entityResponse, isLoading]);

  useEffect(() => {
    queryClient.invalidateQueries(queryKey);
  }, []);

  return { refresh: handleRefresh };
};

export default useFetchEntity;
