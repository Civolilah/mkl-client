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

import { LoadingScreen, PermissionScreen } from '@components/index';

const Unauthorized = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <PermissionScreen unauthorizedAction />
    </Suspense>
  );
};

export default Unauthorized;
