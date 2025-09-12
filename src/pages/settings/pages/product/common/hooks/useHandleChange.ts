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

import { ProductSettingsType } from '../../Product';

interface Params {
  setProductSettings: Dispatch<SetStateAction<ProductSettingsType | undefined>>;
}

const useHandleChange = ({ setProductSettings }: Params) => {
  return (property: string, value: string | number | boolean) => {
    setProductSettings((currentProductSettings) => {
      if (!currentProductSettings) return currentProductSettings;

      const updatedProductSettings = cloneDeep(currentProductSettings);
      set(updatedProductSettings, property, value);

      return updatedProductSettings;
    });
  };
};

export default useHandleChange;
