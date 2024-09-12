/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Navigate } from 'react-router-dom';

import { useAuthenticated } from '@hooks/index';

const IndexPage = () => {
  const authenticated = useAuthenticated();

  return authenticated ? <Navigate to="/products" /> : <Navigate to="/login" />;
};

export default IndexPage;
