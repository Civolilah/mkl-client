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

const useUserType = () => {
  const userCompany = useAtomValue(userCompanyAtom);

  const isSupplier = userCompany?.user_type === 'supplier';
  const isCustomer = userCompany?.user_type === 'customer';
  const isInventoryManager = userCompany?.user_type === 'inventory_manager';

  return {
    isSupplier,
    isCustomer,
    isInventoryManager,
  };
};

export default useUserType;
