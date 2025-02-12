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

import { Category } from '@interfaces/index';

type Params = {
  setCategory: Dispatch<SetStateAction<Category | undefined>>;
};

const useHandleChange = ({ setCategory }: Params) => {
  return (property: keyof Category, value: string) => {
    setCategory(
      (currentCategory) =>
        currentCategory && {
          ...currentCategory,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
