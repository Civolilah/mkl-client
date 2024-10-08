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

type Props = {
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const Box = (props: Props) => {
  const { children, className, style, onClick } = props;

  if (!children)
    return <div className={className} style={style} onClick={onClick} />;

  return (
    <div className={className} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

export default Box;
