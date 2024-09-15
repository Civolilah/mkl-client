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

import { Outlet } from 'react-router-dom';

import { useAuthenticated } from '@hooks/index';

const PublicRoute = () => {
  const authenticated = useAuthenticated();

  // return authenticated ? <Navigate to="/dashboard" /> : <Outlet />;

  return <Outlet />;
};

export default PublicRoute;
