/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react';

interface Props {
  id?: string;
  innerRef?: RefObject<HTMLDivElement>;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Box = ({
  children,
  innerRef,
  className,
  style,
  onClick,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  id,
}: Props) => {
  if (!children)
    return (
      <div
        id={id}
        ref={innerRef}
        className={className}
        style={style}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    );

  return (
    <div
      id={id}
      ref={innerRef}
      className={className}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export default Box;
