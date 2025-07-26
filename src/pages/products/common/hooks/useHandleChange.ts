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

import { Product } from '@interfaces/index';

type Params = {
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

const useHandleChange = ({ setProduct }: Params) => {
  return (
    property: keyof Product,
    value: string | number | boolean | Product['inventory_by_group'] | string[]
  ) => {
    setProduct((currentProduct) => {
      if (!currentProduct) return currentProduct;

      const updatedProduct = cloneDeep(currentProduct);
      set(updatedProduct, property, value);

      return updatedProduct;
    });
  };
};

export default useHandleChange;
