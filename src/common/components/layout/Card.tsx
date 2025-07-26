/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { CSSProperties, ReactNode } from 'react';

import { Card as CardBase } from 'antd';
import { ItemType } from 'antd/es/menu/interface';
import classNames from 'classnames';

import { Box, Button, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

type Props = {
  className?: string;
  title?: string;
  children: ReactNode;
  width?: 'full';
  saveButtonText?: string;
  onSaveClick?: () => void;
  isLoading?: boolean;
  topRight?: ReactNode;
  actions?: ItemType[];
  childrenParentClassName?: string;
  childrenParentStyle?: CSSProperties;
  paddingBottom?: string;
};

const Card = (props: Props) => {
  const t = useTranslation();

  const {
    children,
    title,
    className,
    onSaveClick,
    saveButtonText,
    isLoading = false,
    topRight,
    actions = [],
    childrenParentClassName,
    childrenParentStyle,
    paddingBottom,
  } = props;

  const colors = useColors();

  return (
    <Box className="flex w-full h-full justify-center items-start">
      <CardBase
        className={classNames('shadow-sm', className)}
        style={{
          borderColor: colors.$1,
          borderRadius: 0,
          paddingBottom: paddingBottom ?? '1rem',
        }}
        styles={{
          body: { padding: isLoading ? '2rem' : 0 },
        }}
        loading={isLoading}
      >
        <Box className="flex flex-col">
          <Box
            className="flex items-center justify-between border-b px-5 py-3.5"
            style={{ borderColor: colors.$1 }}
          >
            <Text className="text-base md:text-lg-mid font-medium">
              {title}
            </Text>

            {topRight}
          </Box>

          <Box
            className={classNames('px-5 pt-5 pb-4', childrenParentClassName)}
            style={childrenParentStyle}
          >
            {children}
          </Box>

          {Boolean(actions.length || onSaveClick) && (
            <Box className="flex justify-end border-t px-6">
              {onSaveClick && (
                <Button type="primary" onClick={onSaveClick}>
                  {saveButtonText || t('save')}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </CardBase>
    </Box>
  );
};

export default Card;
