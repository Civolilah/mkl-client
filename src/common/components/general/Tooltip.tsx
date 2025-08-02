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

import TooltipBase from 'antd/es/tooltip';
import classNames from 'classnames';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { useAccentColor } from '@hooks/index';

import Box from './Box';

type Props = {
  href?: string;
  className?: string;
  text?: string | ReactNode;
  children: ReactNode;
  trigger?: ('hover' | 'click')[];
  placement?: 'bottom' | 'right' | 'left' | 'top';
  withoutArrow?: boolean;
  overlayClassName?: string;
  overlayInnerStyle?: CSSProperties;
};

const Tooltip = ({
  className,
  children,
  text,
  href,
  trigger,
  placement,
  withoutArrow,
  overlayClassName,
  overlayInnerStyle,
}: Props) => {
  const accentColor = useAccentColor();

  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  if (href) {
    return (
      <Box
        onClick={(event) => {
          event.stopPropagation();
          navigate(href);
        }}
      >
        <TooltipBase
          className={classNames('text-xs', className)}
          title={text}
          trigger={isLargeScreen ? (trigger ?? ['hover']) : ['click']}
          mouseEnterDelay={0}
          overlayInnerStyle={{
            padding: '0.35rem',
            lineHeight: '1.15rem',
            borderRadius: 0,
            ...overlayInnerStyle,
          }}
          overlayClassName={overlayClassName}
          color={accentColor}
          placement={placement}
          arrow={!withoutArrow}
        >
          {children}
        </TooltipBase>
      </Box>
    );
  }

  return (
    <TooltipBase
      className={classNames('text-xs', className)}
      title={text}
      trigger={isLargeScreen ? (trigger ?? ['hover']) : ['click']}
      mouseEnterDelay={0}
      overlayInnerStyle={{
        padding: '0.35rem',
        lineHeight: '1.15rem',
        borderRadius: 0,
        ...overlayInnerStyle,
      }}
      overlayClassName={overlayClassName}
      mouseLeaveDelay={0}
      color={accentColor}
      placement={placement}
      arrow={!withoutArrow}
    >
      {children}
    </TooltipBase>
  );
};

export default Tooltip;
