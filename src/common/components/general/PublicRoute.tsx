/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticated } from '@hooks/index';

import LoadingScreen from './LoadingScreen';

const PublicRoute = () => {
  const authenticated = useAuthenticated();

  const [isUserAuthenticated, setIsUserAuthenticated] = useState<
    boolean | null
  >(null);

  useEffect(() => {
    (async () => {
      const isAuthenticated = await authenticated();

      setIsUserAuthenticated(isAuthenticated);
    })();
  }, []);

  if (isUserAuthenticated === null) {
    return <LoadingScreen />;
  }

  return isUserAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoute;
