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
};

const ActionElement = (props: Props) => {
  const { iconName, label, onClick } = props;

  return (
    <Box
      className="flex justify-start items-center space-x-4 px-3"
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      <Icon name={iconName} size={20} />

      <Text>{label}</Text>
    </Box>
  );
};

export default ActionElement;
