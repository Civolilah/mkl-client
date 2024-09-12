/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Icon, Text, Tooltip } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { NavItem as NavItemType } from './Default';
import { isMiniSideBarAtom } from './NavBarIconsBox';

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

const RightIconWrapper = styled.div`
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.15s ease;
  color: ${(props) => props.theme.color};

  &:hover {
    border: 2px solid;
  }
`;

type TooltipProps = {
  isMiniSideBar: boolean;
  children: ReactNode;
  tooltipText: string;
};

const TooltipWrapper = (props: TooltipProps) => {
  const { isMiniSideBar, children, tooltipText } = props;

  if (!isMiniSideBar) {
    return <>{children}</>;
  }

  return <Tooltip text={tooltipText}>{children}</Tooltip>;
};

const NavItem = (props: Props) => {
  const t = useTranslation();

  const { item } = props;

  const colors = useColors();

  const navigate = useNavigate();
  const location = useLocation();

  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

  return (
    <TooltipWrapper isMiniSideBar={isMiniSideBar} tooltipText={t(item.label)}>
      <Div
        className={classNames('py-3 cursor-pointer rounded', {
          'px-2': !isMiniSideBar,
          'px-3': isMiniSideBar,
        })}
        theme={{
          hoverBackgroundColor: colors.$7,
          hoverColor: colors.$8,
          isActive: location.pathname.startsWith(item.href),
        }}
        onClick={() => navigate(item.href)}
      >
        <div
          className={classNames('flex items-center', {
            'justify-center': isMiniSideBar,
            'justify-between': !isMiniSideBar,
          })}
        >
          <div className="flex items-center space-x-2">
            <div className="flex justify-center items-center min-w-8">
              <IconWrapper
                theme={{
                  color: colors.$10,
                  hoverColor: colors.$9,
                  isActive: location.pathname.startsWith(item.href),
                }}
              >
                <Icon name={item.iconName} size={item.iconSize} />
              </IconWrapper>
            </div>

            {!isMiniSideBar && (
              <Text style={{ fontSize: 16.5 }}>{t(item.label)}</Text>
            )}
          </div>

          {Boolean(item.rightIcon && !isMiniSideBar) && (
            <Tooltip
              text={t(item.rightIcon!.tooltipText)}
              href={item.rightIcon!.href}
            >
              <RightIconWrapper className="ml-6" theme={{ color: colors.$10 }}>
                <Icon name={item.rightIcon!.name} size={27} />
              </RightIconWrapper>
            </Tooltip>
          )}
        </div>
      </Div>
    </TooltipWrapper>
  );
};

export default NavItem;
