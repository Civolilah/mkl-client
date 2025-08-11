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

import { Popover as PopoverBase } from 'antd';

type Props = {
  children: ReactNode;
  content: ReactNode;
  trigger?: ('click' | 'hover')[];
};

const Popover = ({ children, content, trigger = ['click'] }: Props) => {
  return (
    <PopoverBase
      content={content}
      trigger={trigger}
      arrow={false}
      overlayInnerStyle={{ borderRadius: 0, padding: 0 }}
    >
      <div>{children}</div>
    </PopoverBase>
  );
};

export default Popover;
