/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useIsMiniSidebar = (): boolean => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  return Boolean(userCompanyDetails?.preference.mini_side_bar) || false;
};

export default useIsMiniSidebar;
