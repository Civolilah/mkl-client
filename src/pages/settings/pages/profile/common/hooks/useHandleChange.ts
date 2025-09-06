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

import { ProfileType } from '../../Profile';

interface Params {
  setProfile: Dispatch<SetStateAction<ProfileType | undefined>>;
}

const useHandleChange = ({ setProfile }: Params) => {
  return (property: keyof ProfileType, value: string | number | boolean) => {
    setProfile((currentProfile) => {
      if (!currentProfile) return currentProfile;

      const updatedProfile = cloneDeep(currentProfile);
      set(updatedProfile, property, value);

      return updatedProfile;
    });
  };
};

export default useHandleChange;
