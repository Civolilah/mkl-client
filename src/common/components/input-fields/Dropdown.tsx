/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dropdown as DropdownBase, MenuProps } from 'antd';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  menu: MenuProps;
};
const Dropdown = (props: Props) => {
  const { children, menu } = props;

  return (
    <DropdownBase menu={menu} trigger={['click']}>
      {children}
    </DropdownBase>
  );
};

export default Dropdown;
