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

import Icon, { IconName } from '@components/general/Icon';

import { useTranslation } from '@hooks/index';

import { Box, Text } from '..';

interface Props {
  text: string;
  onClick: () => void;
  iconName: IconName;
  iconSize?: string;
  disabled?: boolean;
}

const FooterAction = ({
  text,
  onClick,
  iconName,
  iconSize = '1.25rem',
  disabled = false,
}: Props) => {
  const t = useTranslation();

  return (
    <Box className="flex flex-1 h-full items-center">
      <Box
        className={classNames(
          'flex flex-col w-full justify-between items-center h-9',
          {
            'cursor-not-allowed opacity-75 pointer-events-none': disabled,
            'cursor-pointer': !disabled,
          }
        )}
        onClick={onClick}
      >
        <Box>
          <Icon name={iconName} size={iconSize} />
        </Box>

        <Text className="text-xs">{t(text)}</Text>
      </Box>
    </Box>
  );
};

export default FooterAction;
