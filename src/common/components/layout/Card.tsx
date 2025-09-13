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

interface Props {
  id?: string;
  className?: string;
  title?: string;
  titleElement?: ReactNode;
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
}

const Card = ({
  id,
  children,
  title,
  titleElement,
  className,
  onSaveClick,
  saveButtonText,
  isLoading = false,
  topRight,
  actions = [],
  childrenParentClassName,
  childrenParentStyle,
  paddingBottom,
}: Props) => {
  const t = useTranslation();

  const colors = useColors();

  return (
    <Box id={id} className="flex w-full h-full justify-center items-start">
      <CardBase
        className={classNames('shadow-sm', className)}
        style={{
          borderColor: colors.$1,
          borderRadius: '0.75rem',
          paddingBottom: paddingBottom ?? '1rem',
        }}
        styles={{
          body: { padding: isLoading ? '2rem' : 0 },
        }}
        loading={isLoading}
      >
        <Box className="flex flex-col">
          <Box
            className="flex items-center justify-between border-b px-3 md:px-4 py-3"
            style={{ borderColor: colors.$1 }}
          >
            <Box className="text-base font-medium">
              {titleElement ? (
                titleElement
              ) : (
                <Text className="text-base font-medium">{title}</Text>
              )}
            </Box>

            {topRight}
          </Box>

          <Box
            className={classNames(
              'px-3 md:px-4 pt-4 md:pt-5 pb-4',
              childrenParentClassName
            )}
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
