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

import { Customer } from '@interfaces/index';

import { useFetchEntity, useHasPermission } from '@hooks/index';

const useFindCustomer = () => {
  const hasPermission = useHasPermission();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/customers', 'selector'],
    endpoint: '/api/customers?selector=true',
    setEntities: setCustomers,
    setIsLoading: setIsLoadingCustomers,
    listQuery: true,
    enableByPermission:
      hasPermission('view_customer') ||
      hasPermission('create_customer') ||
      hasPermission('edit_customer'),
  });

  const findCustomerById = (customerId: string) => {
    const customer = customers.find((customer) => customer.id === customerId);

    return customer;
  };

  return {
    findCustomerById,
    isLoadingCustomers,
  };
};

export default useFindCustomer;
