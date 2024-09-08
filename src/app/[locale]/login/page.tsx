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

import { useColors, useTranslation } from '@hooks/index';

import Form from './common/components/Form';

export type LoginDetails = {
  email: string;
  password: string;
};

type Props = {
  params: { locale: string };
};

const LoginPage = (props: Props) => {
  const { params } = props;

  unstable_setRequestLocale(params.locale);

  const t = useTranslation({ section: 'LoginPage' });

  const colors = useColors();

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <div
        className="px-2 md:px-0"
        style={{
          width: '24.5rem',
        }}
      >
        <div
          className="flex flex-col border px-4 md:px-6 pb-12 pt-16 w-full"
          style={{
            borderColor: colors.$1,
            boxShadow: `
            0 1px 2px rgba(0, 0, 0, 0.04),
            0 2px 4px rgba(0, 0, 0, 0.03),
            0 4px 8px rgba(0, 0, 0, 0.02),
            0 8px 16px rgba(0, 0, 0, 0.01)
          `,
            backgroundColor: colors.$2,
          }}
        >
          <div className="flex flex-col items-center justify-center space-y-16">
            <h1 className="text-6xl">{t('login')}</h1>

            <div className="flex flex-col justify-center items-center space-y-4 w-full">
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
