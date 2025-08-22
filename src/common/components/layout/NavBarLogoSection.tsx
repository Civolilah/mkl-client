/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { MAN_LARGE_SIDEBAR_WIDTH } from '@constants/index';
import classNames from 'classnames';

import { Box, Text } from '@components/index';

import { useColors } from '@hooks/index';

type Props = {
  mobileSideBar?: boolean;
  handleCloseSideBar?: () => void;
};

const NavBarLogoSection = (props: Props) => {
  const { mobileSideBar } = props;

  const colors = useColors();

  return (
    <Box
      className={classNames('flex items-center px-1.5', {
        'border-r': !mobileSideBar,
        'border-b': mobileSideBar,
      })}
      style={{
        height: '3.5rem',
        borderColor: colors.$1,
        width: mobileSideBar ? '100%' : MAN_LARGE_SIDEBAR_WIDTH,
      }}
    >
      <Box className="flex w-full justify-start items-center space-x-4">
        <img
          className="cursor-pointer"
          src="/images/mkl.svg"
          alt="ecoMKL Logo"
          style={{
            width: '4rem',
            height: '50px',
            objectFit: 'contain',
          }}
        />

        <Text className="text-lg font-medium">ecoMKL</Text>
      </Box>
    </Box>
  );
};

export default NavBarLogoSection;
