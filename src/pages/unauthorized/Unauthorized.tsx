/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Suspense, useEffect } from 'react';

import { useSetAtom } from 'jotai';

import { Default, LoadingScreen, PermissionScreen } from '@components/index';

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';

const Unauthorized = () => {
  const setPageLayoutAndActions = useSetAtom(pageLayoutAndActionsAtom);

  useEffect(() => {
    setPageLayoutAndActions(undefined);
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Default>
        <PermissionScreen unauthorizedAction />
      </Default>
    </Suspense>
  );
};

export default Unauthorized;
