/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, MouseEvent, ReactNode } from 'react';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
}

const Box = ({
  children,
  className,
  style,
  onClick,
  onMouseDown,
  id,
}: Props) => {
  if (!children)
    return (
      <div
        id={id}
        className={className}
        style={style}
        onClick={onClick}
        onMouseDown={onMouseDown}
      />
    );

  return (
    <div
      id={id}
      className={className}
      style={style}
      onClick={onClick}
      onMouseDown={onMouseDown}
    >
      {children}
    </div>
  );
};

export default Box;
