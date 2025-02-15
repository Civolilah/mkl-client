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

import { Brand } from '@interfaces/index';

type Params = {
  setBrand: Dispatch<SetStateAction<Brand | undefined>>;
};

const useHandleChange = ({ setBrand }: Params) => {
  return (property: keyof Brand, value: string) => {
    setBrand(
      (currentBrand) =>
        currentBrand && {
          ...currentBrand,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
