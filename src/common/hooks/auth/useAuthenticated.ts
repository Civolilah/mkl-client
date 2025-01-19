/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { request } from '@helpers/index';
import { useAtom } from 'jotai';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useAuthenticated = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [userCompanyDetails, setUserCompanyDetails] = useAtom(userCompanyAtom);

  const token = localStorage.getItem('MKL-TOKEN');

  return async () => {
    if (userCompanyDetails) {
      return true;
    }

    if (!token) {
      return false;
    }

    let isAuthenticated = false;

    const response = await queryClient.fetchQuery(
      `/api/v1/refresh-${token}`,
      () =>
        request('POST', '/api/users/authorize')
          .then((response) => response.data.data)
          .catch(() => null),
      { staleTime: Infinity }
    );

    if (response) {
      setUserCompanyDetails(response);

      isAuthenticated = true;
    } else {
      localStorage.removeItem('MKL-TOKEN');

      isAuthenticated = false;

      navigate('/login');
    }

    return isAuthenticated;
  };
};

export default useAuthenticated;
