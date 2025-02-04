/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';
import styled from 'styled-components';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import {
  Box,
  Icon,
  MobileNavBar,
  NavBarLogoSection,
  Popover,
  Text,
} from '@components/index';

import {
  useColors,
  useLogout,
  useNavItems,
  useTranslation,
} from '@hooks/index';

type Props = {
  title?: string;
};

const StyledBox = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
  }
`;

const Header = (props: Props) => {
  const t = useTranslation();

  const { title } = props;

  const colors = useColors();
  const navItems = useNavItems();

  const logout = useLogout();

  const userCompanyDetails = useAtomValue(userCompanyAtom);

  return (
    <Box
      className="flex items-center justify-center w-full border-b py-4"
      style={{
        height: '3.5rem',
        borderColor: colors.$1,
        backgroundColor: colors.$6,
      }}
    >
      <Box className="hidden lg:flex">
        <NavBarLogoSection />
      </Box>

      <Box className="flex lg:hidden">
        <MobileNavBar items={navItems} />
      </Box>

      <Box className="flex w-full justify-between items-center px-2 md:px-6">
        <Text className="text-base md:text-lg whitespace-nowrap">{title}</Text>

        <Box className="flex w-full justify-end">
          <Popover
            content={
              <Box className="flex flex-col justify-center items-center min-w-60">
                <Box className="py-3 px-1.5">
                  <Text className="text-sm font-medium">
                    {userCompanyDetails?.email}
                  </Text>
                </Box>

                <StyledBox
                  className="flex w-full items-center space-x-5 cursor-pointer p-2.5 border-t"
                  onClick={logout}
                  theme={{
                    hoverBackgroundColor: colors.$19,
                    borderColor: colors.$1,
                  }}
                >
                  <Box>
                    <Icon
                      name="logout"
                      style={{ rotate: '180deg' }}
                      size="1.35rem"
                    />
                  </Box>

                  <Text className="text-sm">{t('logout')}</Text>
                </StyledBox>
              </Box>
            }
          >
            <Box
              className="flex relative cursor-pointer"
              style={{ width: '2.6rem' }}
            >
              <Box>
                <Icon name="person" size="1.5rem" />
              </Box>

              <Box className="absolute left-6" style={{ top: '0.2rem' }}>
                <Icon name="arrowDown" size="1.3rem" />
              </Box>
            </Box>
          </Popover>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
