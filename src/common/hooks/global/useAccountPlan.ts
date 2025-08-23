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

const useAccountPlan = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  const isBasicPlan = userCompany?.account.plan === 'basic';
  const isStandardPlan = userCompany?.account.plan === 'standard';
  const isEnterprisePlan = userCompany?.account.plan === 'enterprise';
  const isProfessionalPlan = userCompany?.account.plan === 'professional';

  return {
    isBasicPlan,
    isStandardPlan,
    isEnterprisePlan,
    isProfessionalPlan,
    plan: userCompany?.account.plan,
  };
};

export default useAccountPlan;
