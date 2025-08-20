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

import { Modal } from '@components/index';

import { useTranslation } from '@hooks/index';

interface Props {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
}

const MobilePreviewModal = ({ title, children, visible, onClose }: Props) => {
  const t = useTranslation();

  return (
    <Modal title={t(title)} visible={visible} onClose={onClose}>
      {children}
    </Modal>
  );
};

export default MobilePreviewModal;
