/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect } from 'react';

import { atom, useSetAtom } from 'jotai';
import { isEqual } from 'lodash';

export const areChangesMadeAtom = atom<boolean>(false);

interface Params<T> {
  initialEntityValue: T;
  currentEntityValue: T;
}

const useHandleEntityChanges = <T>({
  initialEntityValue,
  currentEntityValue,
}: Params<T>) => {
  const setAreChangesMade = useSetAtom(areChangesMadeAtom);

  useEffect(() => {
    setAreChangesMade(!isEqual(initialEntityValue, currentEntityValue));

    return () => {
      setAreChangesMade(false);
    };
  }, []);
};

export default useHandleEntityChanges;
