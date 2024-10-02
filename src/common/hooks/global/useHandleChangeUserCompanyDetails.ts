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

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useHandleChangeUserCompanyDetails = () => {
  const [userCompanyDetails, setUserCompanyDetails] = useAtom(userCompanyAtom);

  return (propertyKey: string, value: boolean | string | number) => {
    const updatedUserCompanyDetails = cloneDeep(userCompanyDetails);

    if (updatedUserCompanyDetails) {
      set(updatedUserCompanyDetails, propertyKey, value);

      setUserCompanyDetails(updatedUserCompanyDetails);
    }
  };
};

export default useHandleChangeUserCompanyDetails;
