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

import { useAccentColor } from '@hooks/index';

import Box from './Box';

type Props = {
  href?: string;
  className?: string;
  text?: string;
  children: ReactNode;
  trigger?: ('hover' | 'click')[];
};

const Tooltip = (props: Props) => {
  const { className, children, text, href, trigger } = props;

  const accentColor = useAccentColor();

  const navigate = useNavigate();

  if (href) {
    return (
      <Box
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
          overlayInnerStyle={{
            padding: '0.375rem',
            fontSize: '0.825rem',
            borderRadius: 0,
          }}
          color={accentColor}
        >
          {children}
        </TooltipBase>
      </Box>
    );
  }

  return (
    <TooltipBase
      className={className}
      title={text}
      trigger={trigger ?? ['hover']}
      mouseEnterDelay={0}
      overlayInnerStyle={{
        padding: '0.375rem',
        fontSize: '0.825rem',
        borderRadius: 0,
      }}
      mouseLeaveDelay={0}
      color={accentColor}
    >
      {children}
    </TooltipBase>
  );
};

export default Tooltip;
