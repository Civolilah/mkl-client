/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtom } from 'jotai';
import { cloneDeep, set } from 'lodash';

import {
  userCompanyAtom,
  UserCompanyDetails,
} from '@components/general/PrivateRoute';

const useChangeUserCompanyProperty = () => {
  const [currentUserCompanyDetails, setCurrentUserCompanyDetails] =
    useAtom(userCompanyAtom);

  return (property: keyof UserCompanyDetails, value: unknown) => {
    const updatedUserCompany = cloneDeep(currentUserCompanyDetails);

    if (updatedUserCompany) {
      set(updatedUserCompany, property, value);

      setCurrentUserCompanyDetails(updatedUserCompany);
    }
  };
};

export default useChangeUserCompanyProperty;
