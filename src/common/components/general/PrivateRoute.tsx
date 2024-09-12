/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { atom, useAtomValue } from 'jotai';
import { Outlet } from 'react-router-dom';

import { IUser } from '@interfaces/index';

import { useAuthenticated } from '@hooks/index';

export const userAtom = atom<IUser | null>(null);

const PrivateRoute = () => {
  const authenticated = useAuthenticated();
  const user = useAtomValue(userAtom);

  //   return authenticated ? (
  //     user?.id ? (
  //       <Outlet />
  //     ) : (
  //       <LoadingScreen />
  //     )
  //   ) : (
  //     <Navigate to="/login" />
  //   );

  return <Outlet />;
};

export default PrivateRoute;
