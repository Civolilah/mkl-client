/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { route } from '@helpers/index';
import { useSetAtom } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Box, Icon, Text, Tooltip } from '@components/index';

import { NavItem as NavItemType } from '@hooks/global/useNavItems';
import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import { menuDrawerOpenedAtom } from './MobileNavBar';

type Props = {
  item: NavItemType;
};

const Div = styled.div`
  background-color: ${(props) =>
    props.theme.isActive ? props.theme.backgroundColor : 'transparent'};

  &:hover {
    background-color: ${(props) =>
      props.theme.isActive
        ? props.theme.backgroundColor
        : props.theme.hoverBackgroundColor};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const IconWrapper = styled.div`
  color: ${(props) =>
    props.theme.isActive ? props.theme.hoverColor : props.theme.color};

  ${Div}:hover & {
    opacity: ${(props) => (props.theme.isActive ? 1 : 0.6)};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const NavItem = ({ item }: Props) => {
  const t = useTranslation();

  const navigate = useNavigate();

  const colors = useColors();
  const location = useLocation();
  const accentColor = useAccentColor();

  const setIsMenuDrawerOpened = useSetAtom(menuDrawerOpenedAtom);

  return (
    <Div
      className="flex items-center cursor-pointer pl-1 pr-2"
      theme={{
        hoverBackgroundColor: colors.$30,
        backgroundColor: colors.$7,
        hoverColor: colors.$8,
        isActive: location.pathname.startsWith(item.href),
      }}
      onClick={() => {
        navigate(route(item.href));
        setIsMenuDrawerOpened(false);
      }}
      style={{ minHeight: '2.4rem' }}
    >
      <Box className="flex w-full items-center justify-between">
        <Box className="flex items-center space-x-2">
          <Box className="flex justify-center items-center min-w-8">
            <IconWrapper
              theme={{
                color: accentColor,
                hoverColor: colors.$9,
                isActive: location.pathname.startsWith(item.href),
              }}
            >
              <Icon name={item.iconName} size={item.iconSize} />
            </IconWrapper>
          </Box>

          <Text className="text-xs-mid">{t(item.label)}</Text>
        </Box>

        {Boolean(item.rightIcon && item.rightIcon.visible) && (
          <Tooltip
            text={t(item.rightIcon!.tooltipText)}
            withoutClickOpenOnMobile
          >
            <div
              className="flex items-center justify-center"
              onClick={(event) => {
                event.stopPropagation();
                navigate(route(item.rightIcon!.href));
                setIsMenuDrawerOpened(false);
              }}
              style={{
                borderRadius: '50%',
                color: accentColor,
                border: `1px solid ${accentColor}`,
              }}
            >
              <Icon name={item.rightIcon!.name} size="0.95rem" />
            </div>
          </Tooltip>
        )}
      </Box>
    </Div>
  );
};

export default NavItem;
