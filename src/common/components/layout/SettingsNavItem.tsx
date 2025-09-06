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
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IconName } from '@components/general/Icon';
import { Box, Icon, Text } from '@components/index';

import {
  useAccentColor,
  useColors,
  usePreventAction,
  useTranslation,
} from '@hooks/index';

interface SettingsNavItemType {
  key: string;
  label: string;
  iconName: IconName;
  href: string;
  visible: boolean;
  iconSize?: string;
}

interface Props {
  item: SettingsNavItemType;
}

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

const SettingsNavItem = ({ item }: Props) => {
  const t = useTranslation();

  const navigate = useNavigate();
  const preventAction = usePreventAction();

  const colors = useColors();
  const location = useLocation();
  const accentColor = useAccentColor();

  return (
    <Div
      className="flex items-center cursor-pointer pl-1 rounded min-w-56"
      theme={{
        hoverBackgroundColor: colors.$30,
        backgroundColor: colors.$7,
        hoverColor: colors.$8,
        isActive: location.pathname.startsWith(item.href),
      }}
      onClick={() => {
        preventAction({
          action: () => {
            navigate(route(item.href));
          },
        });
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
              <Icon name={item.iconName} size={item.iconSize} unsetColor />
            </IconWrapper>
          </Box>

          <Text className="text-xs-mid">{t(item.label)}</Text>
        </Box>
      </Box>
    </Div>
  );
};

export default SettingsNavItem;
