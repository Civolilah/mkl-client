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

import { Session } from 'next-auth';
import { SessionProvider as SessionProviderBase } from 'next-auth/react';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  session: Session | null;
};

const SessionProvider = ({ children, session }: Props) => (
  <SessionProviderBase session={session}>{children}</SessionProviderBase>
);

export default SessionProvider;
