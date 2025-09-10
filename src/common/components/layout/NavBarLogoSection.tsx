/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@constants/index';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import { AddCompanyAction, Box, Dropdown, Icon, Text } from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

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
  const accentColor = useAccentColor();

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
      className={classNames(
        'flex items-center px-1.5 company-switcher-dropdown',
        {
          'border-r': !mobileSideBar,
          'border-b': mobileSideBar,
        }
      )}
      style={{
        height: HEADER_HEIGHT,
        borderColor: colors.$1,
        width: mobileSideBar ? '100%' : SIDEBAR_WIDTH,
      }}
    >
      <Dropdown menu={{ items: actions }}>
        <StyledBox
          className="flex w-full justify-between items-center cursor-pointer pl-1.5 pr-0.5 rounded"
          style={{
            height: '3rem',
          }}
          theme={{
            backgroundColor: colors.$2,
            hoverBackgroundColor: colors.$19,
          }}
        >
          <Box className="flex items-center gap-x-4 cursor-pointer flex-1">
            <Box
              className="rounded-full flex items-center justify-center px-2.5 py-1"
              style={{ backgroundColor: accentColor }}
            >
              <Text
                className="text-white uppercase"
                style={{ fontSize: '0.875rem' }}
              >
                {(userCompany?.company.name?.[0] || t('untitled_company'))[0]}
              </Text>
            </Box>

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
