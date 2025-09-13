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

interface Params {
  disabledSaveButton: boolean;
  disabledDiscardButton: boolean;
  onSaveClick: () => void;
  onDiscardClick: () => void;
  saveButtonLabel?: string;
  discardButtonLabel?: string;
  disabledSaveButtonWithLoadingIcon?: boolean;
  disabledDiscardButtonWithLoadingIcon?: boolean;
  changesLabel?: string;
  visibleBox?: boolean;
  disabledWithLoadingIcon?: boolean;
  hideBox?: boolean;
}

export const saveAndDiscardActionsAtom = atom<Params | undefined>(undefined);

const useSaveAndDiscardActions = (
  params: Params,
  dependencies: unknown[] = []
) => {
  const setSaveAndDiscardActions = useSetAtom(saveAndDiscardActionsAtom);

  useEffect(() => {
    setSaveAndDiscardActions(params);
  }, dependencies);

  useEffect(() => {
    return () => {
      setSaveAndDiscardActions(undefined);
    };
  }, []);
};

export default useSaveAndDiscardActions;
