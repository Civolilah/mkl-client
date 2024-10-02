/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { request, useToast } from '@helpers/index';
import { useSetAtom } from 'jotai';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { userCompanyAtom } from '@components/general/PrivateRoute';

const useLogout = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const setUserCompanyDetails = useSetAtom(userCompanyAtom);

  const navigate = useNavigate();

  return async () => {
    toast.loading();

    request('POST', '/api/users/logout').then(() => {
      toast.dismiss();

      localStorage.removeItem('MKL-TOKEN');

      setUserCompanyDetails(null);

      queryClient.invalidateQueries();

      navigate('/login');
    });
  };
};

export default useLogout;
