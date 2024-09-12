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

import classNames from 'classnames';
import { Link as BaseLink } from 'react-router-dom';

type Props = {
  to: string;
  className?: string;
  children: ReactNode;
  target?: '_blank';
  locale?: 'en' | 'tr';
  disableHoverColor?: boolean;
  enableUnderline?: boolean;
};

const Link = (props: Props) => {
  const {
    children,
    to,
    target,
    disableHoverColor,
    className,
    enableUnderline,
  } = props;

  return (
    <BaseLink
      to={to}
      className={classNames(
        'transition-colors duration-200',
        {
          'hover:text-primary-blue': !disableHoverColor,
          'hover:underline': enableUnderline,
        },
        className
      )}
      target={target}
    >
      {children}
    </BaseLink>
  );
};

export default Link;
