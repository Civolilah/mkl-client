/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import Title from 'antd/es/typography/Title';
import { ReactNode } from 'react';

type Props = {
  level?: 1 | 2 | 3 | 4 | 5;
  children: ReactNode;
};
const Heading = (props: Props) => {
  const { level = 2, children } = props;

  return <Title level={level}>{children}</Title>;
};

export default Heading;
