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

import { AccountPlan, userCompanyAtom } from '@components/general/PrivateRoute';

const IMAGE_LIMIT_BY_PLAN: Record<AccountPlan, number> = {
  basic: 5,
  standard: 7,
  professional: 10,
  enterprise: 15,
};

const useImageLimitByPlan = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  const imagesNumberLimit =
    IMAGE_LIMIT_BY_PLAN[userCompanyDetails?.account?.plan as AccountPlan];

  return { imagesNumberLimit };
};

export default useImageLimitByPlan;
