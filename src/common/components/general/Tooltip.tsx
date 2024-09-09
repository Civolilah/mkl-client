/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import TooltipBase from 'antd/es/tooltip';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  text?: string;
  children: ReactNode;
  disableOpening?: boolean;
  render?: boolean;
};

const Tooltip = (props: Props) => {
  const { className, children, text, disableOpening, render = true } = props;

  if (!render) {
    return null;
  }

  return (
    <TooltipBase
      className={className}
      title={disableOpening ? '' : text}
      trigger={['hover']}
      mouseEnterDelay={0}
      overlayClassName="rounded"
      overlayInnerStyle={{
        padding: 6,
        fontSize: 13.2,
      }}
    >
      {children}
    </TooltipBase>
  );
};

export default Tooltip;
