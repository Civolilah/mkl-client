/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import BaseLink from 'next/link';

import { ReactNode } from 'react';

interface Props {
  to: string;
  children: ReactNode;
  target?: '_blank';
  locale?: 'en' | 'tr';
}

const Link = (props: Props) => {
  const { children, to, target } = props;

  return (
    <BaseLink href={to} className="hover:underline" target={target}>
      {children}
    </BaseLink>
  );
};

export default Link;
