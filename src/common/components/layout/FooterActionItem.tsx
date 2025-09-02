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

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

import { Box } from '..';

export interface FooterActionProps {
  label?: string;
  iconName?: IconName;
  iconSize?: string;
  iconColor?: string;
  icon?: ReactNode;
  visible?: boolean;
  onClick?: () => void;
}

const FooterActionItem = ({
  label,
  iconName,
  iconSize,
  onClick,
  iconColor,
  visible = true,
}: FooterActionProps) => {
  const t = useTranslation();

  const colors = useColors();
  const accentColor = useAccentColor();

  if (!visible) {
    return null;
  }

  return (
    <Box
      className="flex items-center justify-start px-4 py-2.5 gap-x-4 cursor-pointer w-full active:bg-[#d8d8d8]"
      onClick={onClick}
      style={{
        backgroundColor: colors.$39,
      }}
    >
      <Box>
        <Icon
          name={iconName as IconName}
          size={iconSize || '1.35rem'}
          style={{ color: iconColor || accentColor }}
        />
      </Box>

      {label && <Box className="text-sm">{t(label)}</Box>}
    </Box>
  );
};

export default FooterActionItem;
