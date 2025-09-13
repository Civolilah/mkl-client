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

import { TaxRate } from '@interfaces/index';

type Params = {
  setTaxRate: Dispatch<SetStateAction<TaxRate | undefined>>;
};

const useHandleChange = ({ setTaxRate }: Params) => {
  return (property: keyof TaxRate, value: string | number) => {
    setTaxRate((currentTaxRate) => {
      if (!currentTaxRate) return currentTaxRate;

      const updatedTaxRate = cloneDeep(currentTaxRate);
      set(updatedTaxRate, property, value);

      return updatedTaxRate;
    });
  };
};

export default useHandleChange;
