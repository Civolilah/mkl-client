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

const useCompanyPlan = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  const plan = userCompanyDetails?.account?.plan;

  return { companyPlan: plan };
};

export default useCompanyPlan;
