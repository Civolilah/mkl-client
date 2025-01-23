/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Text, Box } from '@components/index';

import Icon, { IconName } from './Icon';

type Props = {
  iconName: IconName;
  label?: string;
  onClick?: () => void;
  iconSize?: string;
};

const ActionElement = (props: Props) => {
  const { iconName, label, onClick, iconSize = '1.25rem' } = props;

  return (
    <Box
      className="flex justify-start items-center space-x-4 pl-3 py-1.5 pr-6 min-w-32"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      <Box>
        <Icon name={iconName} size={iconSize} />
      </Box>

      <Text className="whitespace-nowrap">{label}</Text>
    </Box>
  );
};

export default ActionElement;
