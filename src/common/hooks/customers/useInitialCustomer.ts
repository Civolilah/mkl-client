/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { INITIAL_CUSTOMER } from '@constants/index';
import { useAtomValue } from 'jotai';
import { cloneDeep } from 'lodash';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useInitialCustomer = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  return {
    INITIAL_CUSTOMER: cloneDeep({
      ...INITIAL_CUSTOMER,
      currency_id: userCompany?.company.currency_id,
      country_id: userCompany?.company.country_id,
    }),
  };
};

export default useInitialCustomer;
