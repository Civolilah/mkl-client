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

import { Profile } from './useTabs';

interface Params {
  setProfile: Dispatch<SetStateAction<Profile | undefined>>;
}

const useHandleChange = ({ setProfile }: Params) => {
  return (property: keyof Profile, value: string) => {
    setProfile((currentProfile) => {
      if (!currentProfile) return currentProfile;

      const updatedProfile = cloneDeep(currentProfile);
      set(updatedProfile, property, value);

      return updatedProfile;
    });
  };
};

export default useHandleChange;
