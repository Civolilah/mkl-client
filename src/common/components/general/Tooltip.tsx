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

import TooltipBase from 'antd/es/tooltip';
import { useNavigate } from 'react-router-dom';

type Props = {
  href?: string;
  className?: string;
  text?: string;
  children: ReactNode;
  trigger?: ('hover' | 'click')[];
};

const Tooltip = (props: Props) => {
  const { className, children, text, href, trigger } = props;

  const navigate = useNavigate();

  if (href) {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          navigate(href);
        }}
      >
        <TooltipBase
          className={className}
          title={text}
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
      </div>
    );
  }

  return (
    <TooltipBase
      className={className}
      title={text}
      trigger={trigger ?? ['hover']}
      mouseEnterDelay={0}
      overlayClassName="rounded"
      overlayInnerStyle={{
        padding: 6,
        fontSize: 13.2,
      }}
      mouseLeaveDelay={0}
    >
      {children}
    </TooltipBase>
  );
};

export default Tooltip;
