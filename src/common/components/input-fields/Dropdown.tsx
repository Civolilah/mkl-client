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

interface Props {
  children: ReactNode;
  menu: MenuProps;
  style?: CSSProperties;
  disabled?: boolean;
  className?: string;
}

const Dropdown = ({
  children,
  menu,
  style,
  disabled = false,
  className,
}: Props) => {
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
                borderRadius: '0.25rem',
                pointerEvents: item.key?.toString().startsWith('divider')
                  ? 'none'
                  : 'auto',
              },
            }
        ),

        style: {
          borderRadius: '0.5rem',
          minWidth: 'fit-content',
          ...style,
        },
      }}
      trigger={['click']}
      disabled={disabled}
      className={className}
    >
      <div>{children}</div>
    </DropdownBase>
  );
};

export default Dropdown;
