/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { notFound } from 'next/navigation';

import { getRequestConfig } from 'next-intl/server';

import { locales } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid

  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./resources/languages/${locale}/${locale}.json`))
      .default,
  };
});
