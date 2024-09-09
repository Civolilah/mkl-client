/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Poppins } from 'next/font/google';

import classNames from 'classnames';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';

import { redirect } from 'src/navigation';

import { Header } from '@components/index';

import { useColors } from '@hooks/index';

import MainNavBar from './MainNavBar';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  children: ReactNode;
};

const Default = async ({ children }: Props) => {
  const colors = useColors();

  const session = await getServerSession();

  if (!session) {
    redirect('/login');
    return null;
  }

  return (
    <div
      className={classNames(
        'flex min-w-screen min-h-screen',
        poppins.className
      )}
      style={{ backgroundColor: colors.$3 }}
    >
      <MainNavBar />

      <div className="flex flex-col flex-1 justify-center items-center">
        <Header />

        <div className="flex flex-1 justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Default;
