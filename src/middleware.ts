/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import createMiddleware from 'next-intl/middleware';

import { localePrefix, defaultLocale, locales, pathnames } from './config';

export default createMiddleware({
  defaultLocale,
  locales,
  localePrefix,
  pathnames,
});

export const config = {
  matcher: [
    '/',

    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image).*)',
  ],
};
