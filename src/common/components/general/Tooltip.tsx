/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { useParams } from 'next/navigation';

import TooltipBase from 'antd/es/tooltip';
import { ReactNode } from 'react';

import { Languages } from 'src/config';
import { getPathname, useRouter } from 'src/navigation';

type Props = {
  href?: string;
  className?: string;
  text?: string;
  children: ReactNode;
};

const Tooltip = (props: Props) => {
  const { className, children, text, href } = props;

  const router = useRouter();
  const params = useParams();

  if (href) {
    return (
      <div
        onClick={(event) => {
          event.stopPropagation();
          router.push(
            getPathname({
              href,
              locale: params.locale as Languages,
            })
          );
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
