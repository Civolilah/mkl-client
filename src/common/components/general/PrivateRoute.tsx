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

import { Suspense, useEffect, useState } from 'react';

import { atom } from 'jotai';
import { Navigate, Outlet } from 'react-router-dom';

import { Languages } from '@components/layout/LanguageSwitcher';

import { useAuthenticated } from '@hooks/index';

import LoadingScreen from './LoadingScreen';

type UserCompanyDetails = {
  first_name: string;
  last_name: string;
  email: string;
  created_at: number;
  is_director: boolean;
  is_owner: boolean;
  permissions: string[];
  preference: {
    language: Languages;
    mini_side_bar: boolean | null;
    time_zone: string | null;
    comma_as_decimal_separator: boolean | null;
    color_theme: string | null;
    accent_color: string | null;
    hover_accent_color: string | null;
    email_notification: boolean | null;
  };
  company: {
    name: string;
  };
};

export const userCompanyAtom = atom<UserCompanyDetails | null>(null);

const PrivateRoute = () => {
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

  if (isUserAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  );
};

export default PrivateRoute;
