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

import { User } from '@interfaces/index';

type Params = {
  setEmployee: Dispatch<SetStateAction<User | undefined>>;
};

const useHandleChange = ({ setEmployee }: Params) => {
  return (property: keyof User, value: string | string[]) => {
    setEmployee((currentEmployee) => {
      if (!currentEmployee) return currentEmployee;

      const updatedEmployee = cloneDeep(currentEmployee);
      set(updatedEmployee, property, value);

      return updatedEmployee;
    });
  };
};

export default useHandleChange;
