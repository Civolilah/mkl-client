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

import Icon, { IconName } from '@components/general/Icon';

import { useColors } from '@hooks/index';

import { Box } from '..';

export interface FooterActionProps {
  iconName?: IconName;
  iconSize?: string;
  iconColor?: string;
  icon?: ReactNode;
  visible?: boolean;
  onClick?: () => void;
}

const FooterActionItem = ({
  iconName,
  onClick,
  iconColor,
}: FooterActionProps) => {
  const colors = useColors();

  return (
    <Box
      className="flex items-center justify-center p-3 cursor-pointer rounded-full border"
      onClick={onClick}
      style={{
        backgroundColor: colors.$39,
        borderColor: colors.$1,
      }}
    >
      <Icon
        name={iconName as IconName}
        size="1.5rem"
        style={{ color: iconColor }}
      />
    </Box>
  );
};

export default FooterActionItem;
