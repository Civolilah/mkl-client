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

import { Supplier as SupplierType } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindSupplier = () => {
  const hasPermission = useHasPermission();

  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/suppliers', 'selector'],
    endpoint: '/api/suppliers?selector=true',
    setEntities: setSuppliers,
    setIsLoading: setIsLoadingSuppliers,
    listQuery: true,
    enableByPermission:
      hasPermission('view_supplier') ||
      hasPermission('create_supplier') ||
      hasPermission('edit_supplier'),
  });

  const findSupplierById = (supplierId: string) => {
    const supplier = suppliers.find((supplier) => supplier.id === supplierId);

    return supplier;
  };

  return {
    findSupplierById,
    isLoadingSuppliers,
  };
};

export default useFindSupplier;
