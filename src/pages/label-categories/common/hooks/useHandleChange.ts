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

import { LabelCategory } from '@interfaces/index';

type Params = {
  setLabelCategory: Dispatch<SetStateAction<LabelCategory | undefined>>;
};

const useHandleChange = ({ setLabelCategory }: Params) => {
  return (property: keyof LabelCategory, value: string) => {
    setLabelCategory(
      (currentLabelCategory) =>
        currentLabelCategory && {
          ...currentLabelCategory,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
