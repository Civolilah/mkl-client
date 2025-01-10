/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ItemType } from 'antd/es/menu/interface';
import styled from 'styled-components';

import { Box, Dropdown, Icon, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

type Props = {
  actions: ItemType[];
};

const StyledBox = styled(Box)`
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

const EntityActions = (props: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const { actions } = props;

  return (
    <Dropdown menu={{ items: actions }}>
      <StyledBox
        className="flex items-center space-x-1 cursor-pointer border h-full py-1.5 px-2"
        theme={{ backgroundColor: colors.$18 }}
        style={{ borderColor: colors.$1 }}
      >
        <Text className="text-sm font-medium">{t('actions')}</Text>

        <Icon name="arrowDown" size={22} />
      </StyledBox>
    </Dropdown>
  );
};

export default EntityActions;
