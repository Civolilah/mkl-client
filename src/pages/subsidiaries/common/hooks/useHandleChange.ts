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

import { Subsidiary } from '@interfaces/index';

type Params = {
  setSubsidiary: Dispatch<SetStateAction<Subsidiary | undefined>>;
};

const useHandleChange = ({ setSubsidiary }: Params) => {
  return (property: keyof Subsidiary, value: string) => {
    setSubsidiary(
      (currentSubsidiary) =>
        currentSubsidiary && {
          ...currentSubsidiary,
          [property]: value,
        }
    );
  };
};

export default useHandleChange;
