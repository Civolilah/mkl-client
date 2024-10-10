/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Suspense } from 'react';

import { Default, LoadingScreen, PermissionScreen } from '@components/index';

const Unauthorized = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Default>
        <PermissionScreen unauthorizedAction />
      </Default>
    </Suspense>
  );
};

export default Unauthorized;
