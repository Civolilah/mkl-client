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
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { AddCompanyAction, Box, Dropdown, Icon, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

interface Props {
  mobileSideBar?: boolean;
  handleCloseSideBar?: () => void;
}

const StyledBox = styled(Box)`
  background-color: ${({ theme }) => theme.backgroundColor};

  &:hover {
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

const NavBarLogoSection = ({ mobileSideBar }: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const userCompany = useAtomValue(userCompanyAtom);

  const actions: ItemType[] = [
    {
      key: 'about_us',
      label: (
        <Box className="flex items-center gap-x-2 py-2 px-3">
          <Icon name="information" size="1.5rem" />
          <Text className="text-sm font-medium">{t('about_us')}</Text>
        </Box>
      ),
    },
    {
      key: 'add_company',
      label: <AddCompanyAction />,
    },
  ];

  return (
    <Box
      className={classNames('flex items-center px-3', {
        'border-r': !mobileSideBar,
        'border-b': mobileSideBar,
      })}
      style={{
        height: '3.5rem',
        borderColor: colors.$1,
        width: mobileSideBar ? '100%' : MAN_LARGE_SIDEBAR_WIDTH,
      }}
    >
      <Dropdown menu={{ items: actions }}>
        <StyledBox
          className="flex w-full justify-between items-center cursor-pointer pl-2 pr-0.5"
          style={{
            width: mobileSideBar
              ? '100%'
              : `calc(${MAN_LARGE_SIDEBAR_WIDTH} - 1.5rem)`,
            height: '2.5rem',
          }}
          theme={{
            backgroundColor: colors.$2,
            hoverBackgroundColor: colors.$19,
          }}
        >
          <Box className="flex items-center gap-x-4 cursor-pointer">
            <img
              className="cursor-pointer"
              src="/images/mkl.svg"
              alt="ecoMKL Logo"
              style={{
                width: '2.5rem',
                height: '50px',
                objectFit: 'contain',
              }}
            />

            <Box className="flex-1 truncate max-w-[8.25rem]">
              <Text className="text-sm font-medium">
                {userCompany?.company.name || t('untitled_company')}
              </Text>
            </Box>
          </Box>

          <Box>
            <Icon name="arrowUpDown" size="1.5rem" />
          </Box>
        </StyledBox>
      </Dropdown>
    </Box>
  );
};

export default NavBarLogoSection;
