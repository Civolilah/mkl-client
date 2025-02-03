/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Box, Icon, Text, Tooltip } from '@components/index';

import { NavItem as NavItemType } from '@hooks/global/useNavItems';
import {
  useAccentColor,
  useColors,
  useIsMiniSidebar,
  useTranslation,
} from '@hooks/index';

type Props = {
  item: NavItemType;
};

const Div = styled.div`
  background-color: ${(props) =>
    props.theme.isActive ? props.theme.hoverBackgroundColor : 'transparent'};

  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const IconWrapper = styled.div`
  color: ${(props) =>
    props.theme.isActive ? props.theme.hoverColor : props.theme.color};

  ${Div}:hover & {
    color: ${(props) => props.theme.hoverColor};
  }
`;

const NavItem = (props: Props) => {
  const t = useTranslation();

  const { item } = props;

  const navigate = useNavigate();

  const colors = useColors();
  const location = useLocation();
  const accentColor = useAccentColor();
  const isMiniSideBar = useIsMiniSidebar();

  return (
    <Tooltip
      placement="right"
      text={isMiniSideBar ? t(item.label) : ''}
      withoutArrow
    >
      <Div
        className={classNames('flex items-center cursor-pointer', {
          'pl-1 pr-2': !isMiniSideBar,
          'px-1': isMiniSideBar,
        })}
        theme={{
          hoverBackgroundColor: colors.$7,
          hoverColor: colors.$8,
          isActive: location.pathname.startsWith(item.href),
        }}
        onClick={() => navigate(item.href)}
        style={{ height: '3rem' }}
      >
        <Box
          className={classNames('flex w-full items-center', {
            'justify-center': isMiniSideBar,
            'justify-between': !isMiniSideBar,
          })}
        >
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

            {!isMiniSideBar && (
              <Text style={{ fontSize: '0.8rem' }}>{t(item.label)}</Text>
            )}
          </Box>

          {Boolean(
            item.rightIcon && !isMiniSideBar && item.rightIcon.visible
          ) && (
            <Tooltip
              text={t(item.rightIcon!.tooltipText)}
              href={item.rightIcon!.href}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  borderRadius: '50%',
                  color: accentColor,
                  border: `1px solid ${accentColor}`,
                }}
              >
                <Icon name={item.rightIcon!.name} size="0.96rem" />
              </div>
            </Tooltip>
          )}
        </Box>
      </Div>
    </Tooltip>
  );
};

export default NavItem;
