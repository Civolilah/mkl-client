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

import React from 'react';

import { Link, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import HeaderIcons from './HeaderIcons';

const Header = () => {
  const t = useTranslation();

  const colors = useColors();

  return (
    <div
      className="flex flex-col justify-center items-center w-full border-b"
      style={{ backgroundColor: colors.$2, borderColor: colors.$1 }}
    >
      <div
        className="flex justify-center w-full"
        style={{ borderBottom: '1px solid #eaeaea' }}
      >
        <div className="flex w-4/5 justify-between items-center text-sm py-2">
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Text>{t('about_us')}</Text>
            </Link>

            <Link to="/">
              <Text>{t('privacy')}</Text>
            </Link>

            <Link to="/">
              <Text>{t('contact')}</Text>
            </Link>
          </div>

          <div className="flex items-center space-x-3">
            <Text className="border-r pr-3">{t('my_wishlist')}</Text>

            <HeaderIcons />
          </div>
        </div>
      </div>

      <div className="flex justify-between py-4 w-4/5">
        <span style={{ color: 'red' }}>●</span> Capital Shop
        <div className="flex items-center space-x-10 list-none">
          <Link to="/">
            <Text className="font-bold text-base">{t('home')}</Text>
          </Link>

          <Link to="/login">
            <Text className="font-bold text-base">{t('men')}</Text>
          </Link>

          <Link to="/">
            <Text className="font-bold text-base">{t('women')}</Text>
          </Link>

          <Link to="/">
            <Text className="font-bold text-base">{t('pages')}</Text>
          </Link>
        </div>
        👤 🛒<sup>1</sup>
      </div>
    </div>
  );
};

export default Header;
