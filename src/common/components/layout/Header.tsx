/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Icon, Text } from '@components/index';

import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  return (
    <div
      className="flex items-center justify-center w-full border-l border-b bg-white py-4 shadow-sm px-4"
      style={{ height: '4.35rem' }}
    >
      <div className="flex w-full justify-end">
        <div className="flex items-center space-x-7">
          <LanguageSwitcher />

          <div className="flex items-center space-x-2">
            <Text>Hi, Abedin!</Text>

            <div>
              <Icon name="person" size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
