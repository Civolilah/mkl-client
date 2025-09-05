/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useState } from 'react';

import { HEADER_HEIGHT } from '@constants/index';
import { route } from '@helpers/index';
import { Drawer } from 'antd';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { userCompanyAtom } from '@components/general/PrivateRoute';
import {
  Avatar,
  Box,
  Button,
  Icon,
  MobileNavBar,
  NavBarLogoSection,
  Popover,
  Text,
} from '@components/index';

import { areChangesMadeAtom } from '@hooks/global/useHandleEntityChanges';
import { saveAndDiscardActionsAtom } from '@hooks/global/useSaveAndDiscardActions';
import {
  useAccentColor,
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

const Header = ({ title }: Props) => {
  const t = useTranslation();

  const colors = useColors();
  const location = useLocation();
  const navItems = useNavItems();
  const accentColor = useAccentColor();

  const logout = useLogout();
  const navigate = useNavigate();

  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

  const userCompanyDetails = useAtomValue(userCompanyAtom);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  const areChangesMade = useAtomValue(areChangesMadeAtom);
  const saveAndDiscardActions = useAtomValue(saveAndDiscardActionsAtom);

  const onClose = () => {
    setIsDrawerOpened(false);
  };

  useEffect(() => {
    if (isMiddleScreen && isDrawerOpened) {
      onClose();
    }
  }, [isMiddleScreen]);

  return (
    <Box
      className={classNames(
        'flex items-center justify-center w-full border-b py-4 relative',
        {
          'shadow-sm':
            !location.pathname.includes('/new') &&
            !location.pathname.includes('/edit') &&
            !location.pathname.includes('/show'),
        }
      )}
      style={{
        height: HEADER_HEIGHT,
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

      <Box className="flex w-full justify-between items-center px-2 md:px-6 relative">
        <Text className="text-lg md:text-xl font-medium whitespace-nowrap">
          {title}
        </Text>

        {saveAndDiscardActions && (
          <Box
            className="flex items-center gap-x-20 absolute right-[54%] -top-[0.45rem] translate-x-1/2 border rounded-md py-1.5 px-2 bg-white animate-box-shake"
            style={{
              borderColor: colors.$1,
            }}
          >
            <Box className="flex items-center gap-x-2">
              <Box>
                <Icon
                  name="warning"
                  size="1.35rem"
                  style={{ color: 'orange' }}
                />
              </Box>

              <Text className="text-xs-mid font-medium">
                {t('unsaved_changes')}
              </Text>
            </Box>
            <Box className="flex items-center space-x-2">
              <Button
                size="middle"
                type="default"
                onClick={saveAndDiscardActions.onDiscardClick}
              >
                {t(saveAndDiscardActions.discardButtonLabel || 'discard')}
              </Button>

              <Button
                size="middle"
                type="primary"
                onClick={saveAndDiscardActions.onSaveClick}
              >
                {t(saveAndDiscardActions.saveButtonLabel || 'save')}
              </Button>
            </Box>
          </Box>
        )}

        <Box className="flex w-full justify-end">
          {isSmallScreen ? (
            <>
              <Avatar
                className="cursor-pointer uppercase"
                onClick={() => setIsDrawerOpened(true)}
              >
                {userCompanyDetails?.email?.[0]}
              </Avatar>

              <Drawer
                placement="bottom"
                open={isDrawerOpened}
                closable={false}
                onClose={onClose}
                width="100%"
                height="auto"
                rootStyle={{ padding: 0 }}
                styles={{
                  body: { padding: 0 },
                }}
              >
                <Box className="relative flex flex-col w-full bg-white">
                  <Box className="flex justify-center py-2">
                    <Box
                      className="w-10 h-1 rounded-full"
                      style={{ backgroundColor: colors.$1 }}
                    />
                  </Box>

                  <Box className="flex flex-col items-center py-6 px-6 border-b border-gray-100">
                    <Box
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Text className="text-white text-3xl uppercase">
                        {userCompanyDetails?.email?.[0]}
                      </Text>
                    </Box>

                    <Text className="font-medium text-lg text-center">
                      {userCompanyDetails?.email}
                    </Text>
                  </Box>

                  <Box className="flex flex-col w-full">
                    <StyledBox
                      className="flex w-full items-center space-x-4 cursor-pointer px-6 py-3.5 transition-colors duration-200"
                      onClick={() => {
                        setIsDrawerOpened(false);
                        setTimeout(() => {
                          navigate(route('/settings/profile'));
                        }, 100);
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="person"
                          size="1.25rem"
                          style={{ color: 'blue' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-base">
                          {t('profile')}
                        </Text>
                      </Box>

                      <Icon
                        name="arrowForward"
                        size="1.6rem"
                        style={{ color: colors.$8 }}
                      />
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-4 cursor-pointer px-6 py-3.5 transition-colors duration-200"
                      onClick={() => {
                        setIsDrawerOpened(false);
                        setTimeout(() => {
                          // Handle contact us
                        }, 100);
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="email"
                          size="1.25rem"
                          style={{ color: '#3b82f6' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-base">
                          {t('contact_us')}
                        </Text>
                      </Box>

                      <Icon
                        name="arrowForward"
                        size="1.6rem"
                        style={{ color: colors.$8 }}
                      />
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-4 cursor-pointer px-6 py-3.5 transition-colors duration-200"
                      onClick={() => {
                        setIsDrawerOpened(false);
                        setTimeout(() => {
                          // Handle feedback
                        }, 100);
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="feedback"
                          size="1.25rem"
                          style={{ color: '#10b981' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-base">
                          {t('feedback_bugs_features')}
                        </Text>
                      </Box>

                      <Icon
                        name="arrowForward"
                        size="1.6rem"
                        style={{ color: colors.$8 }}
                      />
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-4 cursor-pointer px-6 py-3.5 transition-colors duration-200"
                      onClick={() => {
                        setIsDrawerOpened(false);
                        setTimeout(() => {
                          logout();
                        }, 100);
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="logout"
                          style={{ rotate: '180deg', color: '#ef4444' }}
                          size="1.25rem"
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-base text-red-600">
                          {t('logout')}
                        </Text>
                      </Box>

                      <Icon
                        name="arrowForward"
                        size="1.6rem"
                        style={{ color: colors.$8 }}
                      />
                    </StyledBox>
                  </Box>

                  <Box className="h-3" />
                </Box>
              </Drawer>
            </>
          ) : (
            <Popover
              content={
                <Box className="flex flex-col w-full bg-white">
                  <Box className="flex flex-col items-center py-4 px-5 border-b border-gray-100">
                    <Box
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                      style={{ backgroundColor: accentColor }}
                    >
                      <Text className="text-white text-xl uppercase">
                        {userCompanyDetails?.email?.[0]}
                      </Text>
                    </Box>

                    <Text className="font-medium text-base text-center">
                      {userCompanyDetails?.email}
                    </Text>
                  </Box>

                  <Box className="flex flex-col w-full py-2">
                    <StyledBox
                      className="flex w-full items-center space-x-3 cursor-pointer px-5 py-2.5 transition-colors duration-200"
                      onClick={() => navigate(route('/settings/profile'))}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="person"
                          size="1rem"
                          style={{ color: 'blue' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-sm">
                          {t('profile')}
                        </Text>
                      </Box>
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-3 cursor-pointer px-5 py-2.5 transition-colors duration-200"
                      onClick={() => {
                        // Handle contact us
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="email"
                          size="1rem"
                          style={{ color: '#3b82f6' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-sm">
                          {t('contact_us')}
                        </Text>
                      </Box>
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-3 cursor-pointer px-5 py-2.5 transition-colors duration-200"
                      onClick={() => {
                        // Handle feedback
                      }}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="feedback"
                          size="1rem"
                          style={{ color: '#10b981' }}
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-sm">
                          {t('feedback_bugs_features')}
                        </Text>
                      </Box>
                    </StyledBox>

                    <StyledBox
                      className="flex w-full items-center space-x-3 cursor-pointer px-5 py-2.5 transition-colors duration-200"
                      onClick={logout}
                      theme={{
                        hoverBackgroundColor: colors.$19,
                      }}
                    >
                      <Box className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <Icon
                          name="logout"
                          style={{ rotate: '180deg', color: '#ef4444' }}
                          size="1rem"
                        />
                      </Box>

                      <Box className="flex-1">
                        <Text className="font-medium text-sm text-red-600">
                          {t('logout')}
                        </Text>
                      </Box>
                    </StyledBox>
                  </Box>
                </Box>
              }
            >
              <Avatar className="cursor-pointer uppercase">
                {userCompanyDetails?.email?.[0]}
              </Avatar>
            </Popover>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
