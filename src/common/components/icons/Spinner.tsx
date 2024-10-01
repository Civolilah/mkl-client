/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Spin } from 'antd';

type Props = {
  size?: 'small' | 'large' | 'default';
};

const Spinner = (props?: Props) => {
  const { size = 'default' } = props || {};

  return <Spin size={size} />;
};

export default Spinner;
