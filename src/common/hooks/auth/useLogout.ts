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

import { pageLayoutAndActionsAtom } from '@hooks/global/usePageLayoutAndActions';

const useLogout = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const setUserCompanyDetails = useSetAtom(userCompanyAtom);
  const setPageLayoutAndActions = useSetAtom(pageLayoutAndActionsAtom);

  const navigate = useNavigate();

  return async () => {
    toast.loading();

    request('POST', '/api/users/logout').then(() => {
      toast.dismiss();

      setPageLayoutAndActions(undefined);

      localStorage.removeItem('MKL-TOKEN');
      localStorage.removeItem('DEFAULT-MKL-COMPANY');

      setUserCompanyDetails(null);

      queryClient.invalidateQueries();

      navigate('/login');
    });
  };
};

export default useLogout;
