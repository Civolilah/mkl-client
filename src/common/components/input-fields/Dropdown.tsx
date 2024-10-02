/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import { Dropdown as DropdownBase, MenuProps } from 'antd';

type Props = {
  children: ReactNode;
  menu: MenuProps;
};
const Dropdown = (props: Props) => {
  const { children, menu } = props;

  return (
    <DropdownBase
      menu={{
        ...menu,
        items: menu.items?.map(
          (item) =>
            item && {
              ...item,
              style: { ...item.style, borderRadius: 0 },
            }
        ),
      }}
      trigger={['click']}
    >
      {children}
    </DropdownBase>
  );
};

export default Dropdown;
