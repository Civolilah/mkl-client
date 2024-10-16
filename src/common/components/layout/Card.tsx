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

import { Card as CardBase } from 'antd';
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
  } = props;

  const colors = useColors();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div className="flex w-full h-full justify-center items-start">
      <CardBase
        title={
          <Box className="flex items-center justify-between">
            <Text>{title}</Text>

            {topRight}
          </Box>
        }
        className={className}
        style={{ borderColor: colors.$1, borderRadius: '0px' }}
        styles={{
          body: { padding: isLoading ? '2rem' : 0 },
          header: {
            fontSize: isSmallScreen ? '1.05rem' : '1.155rem',
            fontWeight: 500,
            letterSpacing: 0.8,
          },
        }}
        loading={isLoading}
      >
        <div className="p-6">{children}</div>

        {onSaveClick && (
          <div
            className="flex justify-end border-t py-4 px-6"
            style={{ borderColor: colors.$1 }}
          >
            <Button type="primary" onClick={onSaveClick}>
              {saveButtonText || t('save')}
            </Button>
          </div>
        )}
      </CardBase>
    </div>
  );
};

export default Card;
