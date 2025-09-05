/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useState, useEffect } from 'react';

import { HEADER_HEIGHT, SIDEBAR_WIDTH } from '@constants/index';
import { route } from '@helpers/index';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IconName } from '@components/general/Icon';
import { Box, Icon, NavItem as NavItemElement, Text } from '@components/index';

import { NavGroup, NavItem as NavItemType } from '@hooks/global/useNavItems';
import {
  useAccentColor,
  useColors,
  useNavItems,
  useTranslation,
} from '@hooks/index';

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

interface NavigationGroup {
  label: string;
  icon: IconName;
  iconSize: string;
  defaultNavigation: string;
}

const NAVIGATION_GROUPS: Record<NavGroup, NavigationGroup> = {
  inventory: {
    label: 'inventory',
    icon: 'inventory',
    iconSize: '1.1rem',
    defaultNavigation: '/products',
  },
  taxonomy: {
    label: 'taxonomy',
    icon: 'organization',
    iconSize: '1.1rem',
    defaultNavigation: '/brands',
  },
  partners: {
    label: 'partners',
    icon: 'handshake',
    iconSize: '1.2rem',
    defaultNavigation: '/customers',
  },
  locations: {
    label: 'locations',
    icon: 'locationDot',
    iconSize: '1.1rem',
    defaultNavigation: '/subsidiaries',
  },
};

interface GroupedNavItemsProps {
  group: string;
  items: NavItemType[];
  isExpanded: boolean;
  onToggle: () => void;
  hasActiveItem: boolean;
  activeItemKey: string;
}

const GroupedNavItems = ({
  group,
  items,
  isExpanded,
  onToggle,
  hasActiveItem,
}: GroupedNavItemsProps) => {
  const t = useTranslation();

  const colors = useColors();
  const accentColor = useAccentColor();

  const groupConfig =
    NAVIGATION_GROUPS[group as keyof typeof NAVIGATION_GROUPS];

  if (!groupConfig) return null;

  return (
    <Box
      className={classNames({
        'pb-3': hasActiveItem,
      })}
    >
      <Div
        className="flex items-center justify-between pl-1 pr-1.5 py-2.5 rounded cursor-pointer transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        theme={{
          hoverBackgroundColor: colors.$30,
          backgroundColor: colors.$7,
          hoverColor: colors.$8,
          isActive: hasActiveItem,
        }}
      >
        <Box className="flex items-center space-x-2">
          <Box className="flex justify-center items-center min-w-8">
            <IconWrapper
              theme={{
                color: accentColor,
                hoverColor: colors.$9,
                isActive: hasActiveItem,
              }}
            >
              <Icon
                name={groupConfig.icon as IconName}
                size={groupConfig.iconSize}
                unsetColor
              />
            </IconWrapper>
          </Box>

          <Text
            className={classNames('text-xs-mid', {
              'font-medium': hasActiveItem,
            })}
          >
            {t(groupConfig.label)}
          </Text>
        </Box>

        <Box
          className={classNames('transform transition-transform duration-200', {
            'rotate-90': isExpanded,
          })}
          style={{ color: colors.$4 }}
        >
          <Icon name="arrowForward" size="1.35rem" />
        </Box>
      </Div>

      <Box
        className={classNames('overflow-hidden transition-all duration-300', {
          'max-h-96 opacity-100': isExpanded,
          'max-h-0 opacity-0': !isExpanded,
        })}
      >
        <Box className="ml-2.5">
          {items.map((item, index) => (
            <Box
              key={index}
              className={classNames({
                'mt-1': index === 0,
              })}
            >
              <NavItemElement item={item} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const NavigationBar = () => {
  const colors = useColors();
  const navItems = useNavItems();
  const location = useLocation();
  const navigate = useNavigate();

  const processedGroups = new Set<string>();
  const orderedNavElements: JSX.Element[] = [];
  const [expandedGroup, setExpandedGroup] = useState<NavGroup | null>(
    'inventory'
  );

  const getActiveItemKey = () => {
    const path = location.pathname;
    const activeItem = navItems.find((item) => {
      if (item.href === '/dashboard' && path === '/dashboard') return true;
      if (item.href !== '/dashboard' && path.startsWith(item.href)) return true;
      return false;
    });
    return activeItem?.key || '';
  };

  const activeItemKey = getActiveItemKey();

  const groupedItems = navItems
    .filter((item) => item.visible && item.key !== 'settings')
    .reduce(
      (acc, item) => {
        if (item.group) {
          if (!acc[item.group]) {
            acc[item.group] = [];
          }
          acc[item.group].push(item);
        } else {
          if (!acc.ungrouped) {
            acc.ungrouped = [];
          }
          acc.ungrouped.push(item);
        }
        return acc;
      },
      {} as Record<string, NavItemType[]>
    );

  const toggleGroup = (group: NavGroup) => {
    setExpandedGroup((prev) => (prev === group ? null : group));

    navigate(
      route(
        NAVIGATION_GROUPS[group as keyof typeof NAVIGATION_GROUPS]
          .defaultNavigation
      )
    );
  };

  navItems
    .filter((item) => item.visible && item.key !== 'settings')
    .forEach((item) => {
      if (!item.group) {
        orderedNavElements.push(<NavItemElement key={item.key} item={item} />);
      } else if (!processedGroups.has(item.group)) {
        processedGroups.add(item.group);
        const groupItems = groupedItems[item.group];
        const hasActiveItem = groupItems.some(
          (groupItem) => groupItem.key === activeItemKey
        );

        orderedNavElements.push(
          <GroupedNavItems
            key={item.group}
            group={item.group}
            items={groupItems}
            isExpanded={expandedGroup === item.group}
            onToggle={() => toggleGroup(item.group as NavGroup)}
            hasActiveItem={hasActiveItem}
            activeItemKey={activeItemKey}
          />
        );
      }
    });

  const hasActiveItemInGroup = (items: NavItemType[]) => {
    return items.some((item) => item.key === activeItemKey);
  };

  useEffect(() => {
    Object.entries(groupedItems).forEach(([group, items]) => {
      if (hasActiveItemInGroup(items)) {
        setExpandedGroup(group as NavGroup);
      }
    });
  }, [activeItemKey]);

  return (
    <nav
      className="flex flex-col space-y-1 border-r shadow-md pt-1 w-full"
      style={{
        backgroundColor: colors.$6,
        height: `calc(100vh - ${HEADER_HEIGHT})`,
        width: SIDEBAR_WIDTH,
        borderColor: colors.$1,
      }}
    >
      <Box className="flex flex-col flex-1 overflow-y-auto break-all px-1.5">
        {orderedNavElements}
      </Box>

      <Box className="px-1.5 pb-1.5">
        <NavItemElement
          item={navItems.find((item) => item.key === 'settings')!}
        />
      </Box>
    </nav>
  );
};

export default NavigationBar;
