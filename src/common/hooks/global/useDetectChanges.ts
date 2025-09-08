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

import { useAtom, useSetAtom } from 'jotai';
import { isEqual } from 'lodash';

import { areChangesMadeAtom } from './useHandleEntityChanges';
import { isMobileDiscardBoxOpenAtom } from './usePreventAction';

interface Params<T> {
  initialEntityValue: T;
  currentEntityValue: T;
}

const useDetectChanges = <T>({
  initialEntityValue,
  currentEntityValue,
}: Params<T>) => {
  const [areChangesMade, setAreChangesMade] = useAtom(areChangesMadeAtom);
  const setIsMobileDiscardBoxOpen = useSetAtom(isMobileDiscardBoxOpenAtom);

  useEffect(() => {
    if (initialEntityValue && currentEntityValue) {
      setAreChangesMade(!isEqual(initialEntityValue, currentEntityValue));
    }
  }, [initialEntityValue, currentEntityValue]);

  useEffect(() => {
    if (!areChangesMade) {
      setIsMobileDiscardBoxOpen(false);
    }
  }, [areChangesMade]);

  useEffect(() => {
    return () => {
      setAreChangesMade(false);
    };
  }, []);
};

export default useDetectChanges;
