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

import { Status } from '@interfaces/index';

type Params = {
  setStatus: Dispatch<SetStateAction<Status | undefined>>;
};

export const useHandleChange = ({ setStatus }: Params) => {
  return (key: keyof Status, value: string) => {
    setStatus(
      (currentStatus) => currentStatus && { ...currentStatus, [key]: value }
    );
  };
};
