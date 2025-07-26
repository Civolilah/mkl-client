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

import { CompanyPlan, userCompanyAtom } from '@components/general/PrivateRoute';

const IMAGE_LIMIT_BY_PLAN: Record<CompanyPlan, number> = {
  free: 5,
  basic: 5,
  pro: 7,
  advanced: 10,
  enterprise: 15,
};

const useImageLimitByPlan = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  const imagesNumberLimit =
    IMAGE_LIMIT_BY_PLAN[userCompanyDetails?.company?.plan as CompanyPlan];

  return { imagesNumberLimit };
};

export default useImageLimitByPlan;
