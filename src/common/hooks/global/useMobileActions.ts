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

import { IconName } from '@components/general/Icon';

interface MobileAction {
  iconName: IconName;
  iconSize?: string;
  onClick: () => void;
  visible: boolean;
  disabled: boolean;
}

export const mobileActionsAtom = atom<MobileAction[]>([]);

const useMobileActions = (
  params: MobileAction[],
  dependencies: unknown[] = []
) => {
  const setMobileActions = useSetAtom(mobileActionsAtom);

  useEffect(() => {
    if (params) {
      setMobileActions(params);
    }
  }, dependencies);

  useEffect(() => {
    return () => {
      setMobileActions([]);
    };
  }, []);
};

export default useMobileActions;
