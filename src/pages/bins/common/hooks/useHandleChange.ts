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

import { Bin } from '@interfaces/index';

interface Params {
  setBin: Dispatch<SetStateAction<Bin | undefined>>;
}

const useHandleChange = ({ setBin }: Params) => {
  return (property: keyof Bin, value: string) => {
    setBin((currentBin) => {
      if (!currentBin) return currentBin;

      const updatedBin = cloneDeep(currentBin);
      set(updatedBin, property, value);

      return updatedBin;
    });
  };
};

export default useHandleChange;
