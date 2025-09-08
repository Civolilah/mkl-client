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
import { useMediaQuery } from 'react-responsive';

import { areChangesMadeAtom } from './useHandleEntityChanges';

interface Params {
  action: () => void;
}

interface PreventedAction {
  action: () => void;
}

export const isMobileDiscardBoxOpenAtom = atom<boolean>(false);
export const preventedActionAtom = atom<PreventedAction | null>(null);

const usePreventAction = () => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const areChangesMade = useAtomValue(areChangesMadeAtom);

  const setPreventedAction = useSetAtom(preventedActionAtom);
  const setIsMobileDiscardBoxOpen = useSetAtom(isMobileDiscardBoxOpenAtom);

  return ({ action }: Params) => {
    if (areChangesMade) {
      setPreventedAction({ action });
      setIsMobileDiscardBoxOpen(true);

      const discardSaveBox = document.getElementById('discardSaveBox');

      if (discardSaveBox) {
        discardSaveBox.classList.remove(
          isLargeScreen ? 'animate-box-shake' : 'animate-box-shake-mobile'
        );

        setTimeout(() => {
          discardSaveBox.classList.add(
            isLargeScreen ? 'animate-box-shake' : 'animate-box-shake-mobile'
          );
        }, 50);
      }

      return;
    }

    action();
  };
};

export default usePreventAction;
