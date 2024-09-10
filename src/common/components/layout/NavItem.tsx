/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

'use client';

import { useParams } from 'next/navigation';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import styled from 'styled-components';

import { Languages } from 'src/config';
import { getPathname, usePathname, useRouter } from 'src/navigation';

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

const NavItem = (props: Props) => {
  const t = useTranslation({ section: 'NavigationMenu' });

  const { item } = props;

  const router = useRouter();
  const colors = useColors();
  const params = useParams();
  const pathName = usePathname();

  const isMiniSideBar = useAtomValue(isMiniSideBarAtom);

  return (
    <Div
      className={classNames('py-3 cursor-pointer rounded', {
        'px-2': !isMiniSideBar,
        'px-3': isMiniSideBar,
      })}
      theme={{
        hoverBackgroundColor: colors.$7,
        hoverColor: colors.$8,
        isActive: pathName === item.href,
      }}
      onClick={() =>
        router.push(
          getPathname({
            href: item.href,
            locale: params.locale as Languages,
          })
        )
      }
    >
      <div
        className={classNames('flex items-center', {
          'justify-center': isMiniSideBar,
          'justify-between': !isMiniSideBar,
        })}
      >
        <div className="flex items-center space-x-2">
          <div className="flex justify-center items-center min-w-8">
            {isMiniSideBar && (
              <Tooltip text={t(item.label)} href={item.href}>
                <IconWrapper
                  theme={{
                    color: colors.$10,
                    hoverColor: colors.$9,
                    isActive: pathName === item.href,
                  }}
                >
                  <Icon name={item.iconName} size={item.iconSize} />
                </IconWrapper>
              </Tooltip>
            )}

            {!isMiniSideBar && (
              <IconWrapper
                theme={{
                  color: colors.$10,
                  hoverColor: colors.$9,
                  isActive: pathName === item.href,
                }}
              >
                <Icon name={item.iconName} size={item.iconSize} />
              </IconWrapper>
            )}
          </div>

          {!isMiniSideBar && (
            <Text style={{ fontSize: 16.5, letterSpacing: 0.8 }}>
              {t(item.label)}
            </Text>
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
  );
};

export default NavItem;
