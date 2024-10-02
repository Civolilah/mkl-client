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
};

const Popover = (props: Props) => {
  const { children, content } = props;

  return (
    <PopoverBase
      content={content}
      trigger={['click']}
      arrow={false}
      overlayInnerStyle={{ borderRadius: '0px', padding: 0 }}
    >
      {children}
    </PopoverBase>
  );
};

export default Popover;
