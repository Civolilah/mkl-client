/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import {
  Box,
  CopyToClipboard,
  Modal,
  Text,
  TransparentColorBox,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

type Props = {
  color: string;
};

const ColorColumn = ({ color }: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (!color) {
    return (
      <Box
        className="flex items-center justify-start space-x-3"
        style={{ minWidth: '9rem' }}
      >
        <TransparentColorBox size="1.26rem" />

        <Text className="text-sm">{t('transparent')}</Text>
      </Box>
    );
  }

  return (
    <>
      <Box
        className="cursor-pointer hover:opacity-75 border"
        onClick={(event) => {
          event.stopPropagation();
          setIsModalOpen(true);
        }}
        style={{
          backgroundColor: color,
          width: '5rem',
          height: '1.26rem',
          borderColor: colors.$1,
        }}
      />

      <Modal
        size="extraSmall"
        title={t('color')}
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box className="flex flex-col items-center justify-center space-y-6">
          <Box
            className="border"
            style={{
              backgroundColor: color,
              width: '12rem',
              height: '3.5rem',
              borderColor: colors.$1,
            }}
          />

          <CopyToClipboard text={color} withoutClickOpenOnMobile>
            <Text className="font-medium">{color}</Text>
          </CopyToClipboard>
        </Box>
      </Modal>
    </>
  );
};

export default ColorColumn;
