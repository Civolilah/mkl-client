/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import { useAccentColor } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

interface Props {
  isOpen: boolean;
}

const ActionPopoverIcon = ({ isOpen }: Props) => {
  const accentColor = useAccentColor();

  return (
    <Box className="flex relative">
      <Box className="absolute -right-[0.1rem] -top-[0.05rem]">
        <Icon
          name="horizontalDotsRounded"
          size="1.5rem"
          style={{ color: accentColor }}
        />
      </Box>

      <Box className="absolute -right-[1.5rem]">
        <Icon
          name={isOpen ? 'arrowDownFill' : 'arrowUpFill'}
          size="1.4rem"
          style={{ color: accentColor }}
        />
      </Box>
    </Box>
  );
};

export default ActionPopoverIcon;
