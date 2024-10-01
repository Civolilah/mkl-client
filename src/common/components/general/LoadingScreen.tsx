/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import Spinner from '@components/icons/Spinner';

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Spinner size="large" />
    </div>
  );
};

export default LoadingScreen;
