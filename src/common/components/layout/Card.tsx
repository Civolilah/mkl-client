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
import { useMediaQuery } from 'react-responsive';

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
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Box className="flex w-full h-full justify-center items-start">
      <CardBase
        title={
          <Box className="flex items-center justify-between">
            <Text>{title}</Text>

            {topRight}
          </Box>
        }
        className={classNames(className)}
        style={{
          borderColor: colors.$1,
          borderRadius: 0,
          paddingBottom: paddingBottom ?? '1rem',
        }}
        styles={{
          body: { padding: isLoading ? '2rem' : 0 },
          header: {
            fontSize: isSmallScreen ? '0.8rem' : '1rem',
            fontWeight: 500,
            letterSpacing: 0.8,
          },
        }}
        loading={isLoading}
      >
        <Box
          className={classNames('px-6 pt-6 pb-4', childrenParentClassName)}
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
      </CardBase>
    </Box>
  );
};

export default Card;
