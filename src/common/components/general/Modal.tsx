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

import Icon from './Icon';

type Props = {
  visible: boolean;
  title: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
  onClose?: () => void;
  size?: 'extraSmall' | 'small' | 'regular' | 'large';
};

const Modal = (props: Props) => {
  const {
    visible,
    title,
    isLoading,
    children,
    onClose,
    size = 'regular',
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
        content: { padding: '0px' },
      }}
      centered
    >
      <div className="flex flex-col items-center justify-center">
        <div
          className="flex w-full items-center justify-between self-start p-4 text-lg font-medium border-b"
          style={{ borderColor: colors.$1 }}
        >
          <div>{title}</div>

          <div className="cursor-pointer">
            <Icon name="close" onClick={onClose} size={25} />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-full p-6">
          {children}
        </div>
      </div>
    </ModalBase>
  );
};

export default Modal;
