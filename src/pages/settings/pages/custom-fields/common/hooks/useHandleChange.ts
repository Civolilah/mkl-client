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

import { set } from 'lodash';
import { cloneDeep } from 'lodash';

import { CustomFieldsType } from '../../CustomFields';

interface Params {
  setCustomFields: Dispatch<SetStateAction<CustomFieldsType | undefined>>;
}

export const useHandleChange = ({ setCustomFields }: Params) => {
  return (key: string, value: string) => {
    setCustomFields((currentCustomFields) => {
      if (!currentCustomFields) return currentCustomFields;

      const updatedCustomFields = cloneDeep(currentCustomFields);
      set(updatedCustomFields, key, value);

      return updatedCustomFields;
    });
  };
};
