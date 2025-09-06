/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { atom, useAtomValue, useSetAtom } from 'jotai';

import { areChangesMadeAtom } from './useHandleEntityChanges';

interface Params {
  action: () => void;
}

interface PreventedAction {
  action: () => void;
}

export const preventedActionAtom = atom<PreventedAction | null>(null);

const usePreventAction = () => {
  const areChangesMade = useAtomValue(areChangesMadeAtom);
  const setPreventedAction = useSetAtom(preventedActionAtom);

  return ({ action }: Params) => {
    if (areChangesMade) {
      setPreventedAction({ action });

      const discardSaveBox = document.getElementById('discardSaveBox');

      if (discardSaveBox) {
        discardSaveBox.classList.remove('animate-box-shake');

        setTimeout(() => {
          discardSaveBox.classList.add('animate-box-shake');
        }, 50);
      }

      return;
    }

    action();
  };
};

export default usePreventAction;
