/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { unstable_setRequestLocale } from 'next-intl/server';

interface Props {
  params: { locale: string };
}

const Home = (props: Props) => {
  const { params } = props;

  unstable_setRequestLocale(params.locale);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      login
    </main>
  );
};

export default Home;
