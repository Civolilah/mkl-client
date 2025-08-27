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

import { Supplier } from '@interfaces/index';

type Params = {
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
};

const useHandleChange = ({ setSupplier }: Params) => {
  return (property: keyof Supplier, value: string | boolean) => {
    setSupplier(
      (currentSupplier) =>
        currentSupplier && {
          ...currentSupplier,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
