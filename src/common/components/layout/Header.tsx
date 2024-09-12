/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { PersonIcon, Text } from '@components/index';

import LanguageSwitcher from './LanguageSwitcher';

type Props = {
  title?: string;
};

const Header = (props: Props) => {
  const { title } = props;

  return (
    <div
      className="flex items-center justify-center w-full border-l border-b bg-white py-4 shadow-sm px-6"
      style={{ height: '4.35rem' }}
    >
      <div className="flex w-full justify-between items-center">
        <Text style={{ fontSize: '1.15rem' }}>{title}</Text>

        <div className="flex w-full justify-end">
          <div className="flex items-center space-x-9">
            <LanguageSwitcher />

            <div className="cursor-pointer">
              <PersonIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
