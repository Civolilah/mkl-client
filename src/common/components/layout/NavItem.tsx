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

import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';

import { useRouter } from 'src/navigation';

import { Icon, Text, Tooltip } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { NavItem as NavItemType } from './MainNavBar';

type Props = {
  item: NavItemType;
};

const Div = styled.div`
  &:hover {
    background-color: ${(props) => props.theme.hoverBackgroundColor};
    color: ${(props) => props.theme.hoverColor};
  }
`;

const IconWrapper = styled.div`
  color: ${(props) => props.theme.color};

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

  const colors = useColors();
  const router = useRouter();

  const isMiddleScreen = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <Div
      className="py-3 px-2 cursor-pointer rounded"
      theme={{
        hoverBackgroundColor: colors.$7,
        hoverColor: colors.$8,
      }}
    >
      <div
        className="flex items-center justify-between"
        onClick={() => router.push(item.href)}
      >
        <div className="flex items-center space-x-4">
          <Tooltip text={t(item.label)} disableOpening={isMiddleScreen}>
            <IconWrapper
              theme={{ color: colors.$10, hoverColor: colors.$9 }}
              onClick={() => router.push(item.href)}
            >
              <Icon name={item.iconName} size={21} />
            </IconWrapper>
          </Tooltip>

          <Text
            className="hidden md:flex"
            style={{ fontSize: 16.5, letterSpacing: 0.8 }}
          >
            {t(item.label)}
          </Text>
        </div>

        {Boolean(item.rightIcon) && (
          <Tooltip
            text={t(item.rightIcon!.tooltipText)}
            render={isMiddleScreen}
          >
            <RightIconWrapper
              className="ml-4"
              theme={{ color: colors.$10 }}
              onClick={() => router.push(item.rightIcon!.href)}
            >
              <Icon name={item.rightIcon!.name} size={27} />
            </RightIconWrapper>
          </Tooltip>
        )}
      </div>
    </Div>
  );
};

export default NavItem;
