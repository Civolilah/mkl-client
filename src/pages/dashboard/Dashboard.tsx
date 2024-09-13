/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  navigate('/products');

  return null;
};

export default Dashboard;
