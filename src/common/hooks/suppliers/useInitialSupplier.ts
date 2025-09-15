/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { INITIAL_SUPPLIER } from '@constants/index';
import { useAtomValue } from 'jotai';
import { cloneDeep } from 'lodash';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useInitialSupplier = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  return {
    INITIAL_SUPPLIER: cloneDeep({
      ...INITIAL_SUPPLIER,
      currency_id: userCompany?.company.currency_id,
      country_id: userCompany?.company.country_id,
    }),
  };
};

export default useInitialSupplier;
