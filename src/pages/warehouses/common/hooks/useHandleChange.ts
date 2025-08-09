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

import { Warehouse } from '@interfaces/index';

type Params = {
  setWarehouse: Dispatch<SetStateAction<Warehouse | undefined>>;
};

const useHandleChange = ({ setWarehouse }: Params) => {
  return (property: keyof Warehouse, value: string) => {
    setWarehouse(
      (currentWarehouse) =>
        currentWarehouse && {
          ...currentWarehouse,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
