/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { Warehouse as WarehouseType } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindWarehouse = () => {
  const hasPermission = useHasPermission();

  const [warehouses, setWarehouses] = useState<WarehouseType[]>([]);
  const [isLoadingWarehouses, setIsLoadingWarehouses] =
    useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/warehouses', 'selector'],
    endpoint: '/api/warehouses?selector=true',
    setEntities: setWarehouses,
    setIsLoading: setIsLoadingWarehouses,
    listQuery: true,
    enableByPermission:
      hasPermission('view_warehouse') ||
      hasPermission('create_warehouse') ||
      hasPermission('edit_warehouse'),
  });

  const findWarehouseById = (warehouseId: string) => {
    const warehouse = warehouses.find(
      (warehouse) => warehouse.id === warehouseId
    );

    return warehouse;
  };

  return {
    findWarehouseById,
    isLoadingWarehouses,
  };
};

export default useFindWarehouse;
