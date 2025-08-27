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

import classNames from 'classnames';

import Icon, { IconName } from '@components/general/Icon';

import { useTranslation } from '@hooks/index';

import { Box } from '..';

interface Props {
  text: string;
  onClick: () => void;
  iconName?: IconName;
  iconSize?: string;
  disabled?: boolean;
  iconColor?: string;
  icon?: ReactNode;
}

const FooterAction = ({
  text,
  onClick,
  iconName,
  iconSize = '1.25rem',
  disabled = false,
  iconColor,
  icon,
}: Props) => {
  const t = useTranslation();

  return (
    <Box className="flex flex-1 h-full items-center overflow-hidden px-2">
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
          {Boolean(iconName && !icon) && (
            <Icon
              name={iconName as IconName}
              size={iconSize}
              style={{ color: iconColor }}
            />
          )}

          {icon}
        </Box>

        <Box className="w-full truncate text-xs text-center min-w-0">
          {t(text)}
        </Box>
      </Box>
    </Box>
  );
};

export default FooterAction;
