/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Icon, Link, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import HeaderIcons from './HeaderIcons';

const Header = () => {
  const t = useTranslation({ section: 'NavigationMenu' });

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
        <div className="flex w-4/5 justify-between items-center text-sm py-2.5">
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

          <div className="flex items-center space-x-4">
            <div className="relative inline-block">
              <span className="border-r pr-4 cursor-pointer text-accent hover:text-primary-blue transition-colors duration-200">
                {t('my_wishlist')}
              </span>

              <span
                className="absolute right-0 bg-red-500 text-white rounded-full flex items-center justify-center"
                style={{
                  fontSize: '0.67rem',
                  height: '0.9rem',
                  width: '0.9rem',
                  top: '-0.4rem',
                  right: '0.2rem',
                }}
              >
                1
              </span>
            </div>

            <HeaderIcons />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between py-4 w-4/5">
        <div className="flex-shrink-0 w-1/4">
          <Link to="/" disableHoverColor>
            <svg width="200" height="45" xmlns="http://www.w3.org/2000/svg">
              <circle cx="22.5" cy="22.5" r="18" fill="#FF0000" />
              <text
                x="50"
                y="29"
                font-family="Arial, sans-serif"
                font-size="22"
                font-weight="bold"
              >
                Star Boutique
              </text>
            </svg>
          </Link>
        </div>

        <div className="flex items-center justify-center flex-grow">
          <div className="flex items-center space-x-10 list-none">
            <Link to="/">
              <Text className="font-medium text-lg">{t('home')}</Text>
            </Link>
            <Link to="/login">
              <Text className="font-medium text-lg">{t('men')}</Text>
            </Link>
            <Link to="/">
              <Text className="font-medium text-lg">{t('women')}</Text>
            </Link>
            <Link to="/">
              <Text className="font-medium text-lg">{t('products')}</Text>
            </Link>
          </div>
        </div>

        <div className="flex-shrink-0 w-1/4 flex items-center justify-end space-x-5">
          <Icon
            name="person"
            className="text-black cursor-pointer"
            enableHoverColor
            size={31}
          />

          <div className="relative inline-block">
            <Icon
              name="shoppingCart"
              className="text-black cursor-pointer"
              enableHoverColor
              size={28}
            />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
