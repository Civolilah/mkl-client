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

import { Label } from '@interfaces/index';

type Params = {
  setLabel: Dispatch<SetStateAction<Label | undefined>>;
};

const useHandleChange = ({ setLabel }: Params) => {
  return (property: keyof Label, value: string) => {
    setLabel(
      (currentLabel) =>
        currentLabel && {
          ...currentLabel,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
