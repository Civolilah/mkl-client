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

import { useSetAtom } from 'jotai';
import { isEqual } from 'lodash';

import { areChangesMadeAtom } from './useHandleEntityChanges';

interface Params<T> {
  initialEntityValue: T;
  currentEntityValue: T;
}

const useDetectChanges = <T>({
  initialEntityValue,
  currentEntityValue,
}: Params<T>) => {
  const setAreChangesMade = useSetAtom(areChangesMadeAtom);

  useEffect(() => {
    if (initialEntityValue && currentEntityValue) {
      setAreChangesMade(!isEqual(initialEntityValue, currentEntityValue));
    }

    return () => {
      setAreChangesMade(false);
    };
  }, [initialEntityValue, currentEntityValue]);
};

export default useDetectChanges;
