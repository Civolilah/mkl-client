/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { ReactNode, useEffect } from 'react';

import { Modal as ModalBase } from 'antd';

import { Text } from '@components/index';

import { useColors } from '@hooks/index';

import Box from './Box';
import Icon from './Icon';

type Props = {
  visible: boolean;
  title?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  onClose?: () => void;
  size?: 'extraSmall' | 'small' | 'regular' | 'large';
  disableClosing?: boolean;
  withoutTitleAndClose?: boolean;
};

const Modal = (props: Props) => {
  const {
    visible,
    title,
    isLoading,
    children,
    onClose,
    size = 'regular',
    disableClosing,
    withoutTitleAndClose,
  } = props;

  const colors = useColors();

  const getWidth = () => {
    switch (size) {
      case 'extraSmall':
        return 300;
      case 'small':
        return 375;
      case 'large':
        return 900;
      default:
        return 520;
    }
  };

  useEffect(() => {
    if (!visible) {
      onClose?.();
    }
  }, [visible]);

  return (
    <ModalBase
      title={title}
      footer={null}
      loading={isLoading}
      open={visible}
      onCancel={() => {
        if (!disableClosing) {
          onClose?.();
        }
      }}
      width={getWidth()}
      closable={false}
      styles={{
        header: {
          display: 'none',
          padding: '0',
        },
        content: { padding: '0px', borderRadius: '0px' },
      }}
      centered
      keyboard={false}
    >
      <Box className="flex flex-col items-center justify-center">
        {!withoutTitleAndClose && (
          <Box
            className="flex w-full items-center justify-between self-start px-4 py-3.5 border-b"
            style={{ borderColor: colors.$1 }}
          >
            <Text className="text-lg font-medium">{title}</Text>

            <Box className="cursor-pointer">
              <Icon
                name="close"
                onClick={() => {
                  if (!disableClosing) {
                    onClose?.();
                  }
                }}
                size="1.3rem"
              />
            </Box>
          </Box>
        )}

        <Box className="flex flex-col justify-center items-center w-full p-4">
          {children}
        </Box>
      </Box>
    </ModalBase>
  );
};

export default Modal;
