/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { cloneDeep, set } from 'lodash';

import { Customer } from '@interfaces/index';

interface Params {
  setCustomer: Dispatch<SetStateAction<Customer | undefined>>;
}

const useHandleChange = ({ setCustomer }: Params) => {
  return (property: string, value: string | boolean) => {
    setCustomer((currentCustomer) => {
      if (!currentCustomer) return currentCustomer;

      const updatedCustomer = cloneDeep(currentCustomer);
      set(updatedCustomer, property, value);

      return updatedCustomer;
    });
  };
};

export default useHandleChange;
