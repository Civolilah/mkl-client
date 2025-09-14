/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode, useRef, useState } from 'react';

import { Popover } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';
import { get } from 'lodash';

import Icon, { IconName } from '@components/general/Icon';

import {
  useAccentColor,
  useColors,
  usePreventAction,
  useTranslation,
} from '@hooks/index';

import { Box } from '..';

interface Props {
  text: string;
  onClick?: () => void;
  iconName?: IconName;
  disabled?: boolean;
  iconColor?: string;
  icon?: ReactNode;
  iconForPopover?: (isOpen: boolean) => ReactNode;
  visible?: boolean;
  actions?: ItemType[];
  withoutActiveEffect?: boolean;
  style?: CSSProperties;
}

const ICON_SIZE: Record<string, string> = {
  dashboard: '1.15rem',
  save: '1.175rem',
  refresh: '1.2rem',
  percentage: '1.15rem',
  tags: '1.2rem',
  employees: '1.215rem',
  edit: '1.2rem',
  boxAlignTopRightFilled: '1.15rem',
  subsidiary: '1.1rem',
};

const FooterAction = ({
  text,
  onClick,
  iconName,
  disabled = false,
  iconColor,
  icon,
  iconForPopover,
  visible = true,
  actions,
  withoutActiveEffect = false,
  style,
}: Props) => {
  const t = useTranslation();

  const colors = useColors();
  const popoverRef = useRef(null);
  const accentColor = useAccentColor();
  const preventAction = usePreventAction();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  if (!visible) {
    return null;
  }

  if (actions) {
    return (
      <Popover
        ref={popoverRef}
        content={
          <Box
            className="flex flex-col min-w-[9rem] divide-y"
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen(false);
            }}
            style={{
              borderColor: colors.$1,
            }}
          >
            {actions
              .filter((action) =>
                get(
                  action?.['label' as keyof typeof action],
                  'props.visible',
                  true
                )
              )
              .map((action, index) => (
                <Box key={index}>
                  {action?.['label' as keyof typeof action] as ReactNode}
                </Box>
              ))}
          </Box>
        }
        trigger="click"
        open={isOpen}
        onOpenChange={handleOpenChange}
        placement="top"
        arrow={false}
        overlayInnerStyle={{
          backgroundColor: colors.$39,
          paddingBottom: '1rem',
          padding: 0,
          border: `1px solid ${colors.$1}`,
        }}
        getTooltipContainer={() => document.body}
      >
        <div
          className="flex flex-1 h-full items-center overflow-hidden px-2 select-none"
          style={{
            backgroundColor: isOpen ? colors.$17 : 'transparent',
          }}
        >
          <Box
            className={classNames(
              'flex flex-col w-full justify-between items-center h-9',
              {
                'cursor-not-allowed opacity-75 pointer-events-none': disabled,
                'cursor-pointer': !disabled,
              }
            )}
            onClick={() => {
              if (text === 'save') {
                onClick?.();
              } else {
                preventAction({
                  action: () => {
                    onClick?.();
                  },
                });
              }
            }}
          >
            <Box>
              {Boolean(iconName && !icon) && (
                <Icon
                  name={iconName as IconName}
                  size={ICON_SIZE[iconName as IconName]}
                  style={{ color: iconColor || accentColor }}
                />
              )}

              {icon}

              {iconForPopover && iconForPopover(isOpen)}
            </Box>

            <Box className="w-full truncate text-xs text-center min-w-0">
              {t(text)}
            </Box>
          </Box>
        </div>
      </Popover>
    );
  }

  return (
    <Box
      className={classNames(
        'flex flex-1 h-full items-center overflow-hidden px-2 select-none',
        {
          'cursor-not-allowed opacity-75 pointer-events-none': disabled,
          'cursor-pointer': !disabled,
          'active:bg-[#d8d8d8]': !withoutActiveEffect,
        }
      )}
      onClick={() => {
        if (text === 'save') {
          onClick?.();
        } else {
          preventAction({
            action: () => {
              onClick?.();
            },
          });
        }
      }}
      style={style}
    >
      <Box className="flex flex-col w-full justify-between items-center h-9">
        <Box>
          {Boolean(iconName && !icon) && (
            <Icon
              name={iconName as IconName}
              size={ICON_SIZE[iconName as IconName]}
              style={{ color: iconColor || accentColor }}
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
