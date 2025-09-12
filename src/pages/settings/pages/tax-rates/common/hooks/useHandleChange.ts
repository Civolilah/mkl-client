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

import { TaxRatesType } from '../../TaxRates';

export interface Params {
  setTaxRates: Dispatch<SetStateAction<TaxRatesType | undefined>>;
}

const useHandleChange = ({ setTaxRates }: Params) => {
  return (property: keyof TaxRatesType, value: string | number | boolean) => {
    setTaxRates((currentTaxRates) => {
      if (!currentTaxRates) return currentTaxRates;

      const updatedTaxRates = cloneDeep(currentTaxRates);
      set(updatedTaxRates, property, value);

      return updatedTaxRates;
    });
  };
};

export default useHandleChange;
