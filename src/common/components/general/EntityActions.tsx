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
import classNames from 'classnames';
import styled from 'styled-components';

import { Box, Dropdown, Icon, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

type Props = {
  actions: ItemType[];
  disabled?: boolean;
};

const StyledBox = styled(Box)`
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColor};
  }
`;

const EntityActions = (props: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const { actions, disabled = false } = props;

  return (
    <Dropdown menu={{ items: actions }} disabled={disabled}>
      <StyledBox
        className={classNames(
          'flex items-center space-x-1 border h-full py-1.5 px-2',
          {
            'cursor-not-allowed opacity-75': disabled,
            'cursor-pointer': !disabled,
          }
        )}
        theme={{ backgroundColor: colors.$18 }}
        style={{ borderColor: colors.$1, height: '2.25rem' }}
      >
        <Text className="text-sm-mid">{t('actions')}</Text>

        <Icon name="arrowDown" size="1.2rem" />
      </StyledBox>
    </Dropdown>
  );
};

export default EntityActions;
