/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Pathnames, LocalePrefix } from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'tr'] as const;
export type Languages = (typeof locales)[number];

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
  '/login': {
    en: '/login',
    tr: '/giris',
  },
  '/products': {
    en: '/products',
    tr: '/urunler',
  },
  '/suppliers': {
    en: '/suppliers',
    tr: '/tedarikciler',
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'never';
