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

import { Supplier } from '@interfaces/index';

type Params = {
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
};

const useHandleChange = ({ setSupplier }: Params) => {
  return (property: string, value: string | boolean) => {
    setSupplier((currentSupplier) => {
      if (!currentSupplier) return currentSupplier;

      const updatedSupplier = cloneDeep(currentSupplier);
      set(updatedSupplier, property, value);

      return updatedSupplier;
    });
  };
};

export default useHandleChange;
