/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { Dropdown as DropdownBase, MenuProps } from 'antd';

type Props = {
  children: ReactNode;
  menu: MenuProps;
  style?: CSSProperties;
  disabled?: boolean;
};

const Dropdown = (props: Props) => {
  const { children, menu, style, disabled = false } = props;

  return (
    <DropdownBase
      menu={{
        ...menu,
        items: menu.items?.map(
          (item) =>
            item && {
              ...item,
              style: {
                ...item.style,
                padding: 0,
                borderRadius: 0,
              },
            }
        ),

        style: {
          borderRadius: 0,
          minWidth: 'fit-content',
          ...style,
        },
      }}
      trigger={['click']}
      disabled={disabled}
    >
      <div>{children}</div>
    </DropdownBase>
  );
};

export default Dropdown;
