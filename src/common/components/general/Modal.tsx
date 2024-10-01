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
  } = props;

  const colors = useColors();

  const getWidth = () => {
    switch (size) {
      case 'extraSmall':
        return 300;
      case 'small':
        return 400;
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
      onCancel={onClose}
      width={getWidth()}
      closable={false}
      styles={{
        header: { display: 'none' },
        content: { padding: '0px', borderRadius: '0px' },
      }}
      centered
    >
      <Box className="flex flex-col items-center justify-center">
        {!disableClosing && (
          <Box
            className="flex w-full items-center justify-between self-start p-4 text-lg font-medium border-b"
            style={{ borderColor: colors.$1 }}
          >
            <Box>{title}</Box>

            <Box className="cursor-pointer">
              <Icon name="close" onClick={onClose} size={25} />
            </Box>
          </Box>
        )}

        <Box className="flex flex-col justify-center items-center w-full p-6">
          {children}
        </Box>
      </Box>
    </ModalBase>
  );
};

export default Modal;
