/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useState } from 'react';

import { Popover } from 'antd';

import { Box, Icon } from '@components/index';

import { useAccentColor } from '@hooks/index';

import FooterAction from './FooterAction';

interface Props {
  disabled?: boolean;
}

const AISearchAction = ({ disabled }: Props) => {
  const accentColor = useAccentColor();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleQRScan = () => {
    // QR code scan logic
    console.log('QR Code scan');
    setIsOpen(false);
  };

  const handleBarcodeScan = () => {
    // Barcode scan logic
    console.log('Barcode scan');
    setIsOpen(false);
  };

  const handleVoiceSearch = () => {
    // Voice research logic
    console.log('Voice research');
    setIsOpen(false);
  };

  const handleImageSearch = () => {
    // Image research logic
    console.log('Image research');
    setIsOpen(false);
  };

  return (
    <Popover
      content={
        <Box className="flex flex-col gap-y-3 p-2">
          <Box
            className="flex items-center justify-center p-3 cursor-pointer hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleQRScan}
            style={{
              backgroundColor: accentColor,
            }}
          >
            <Icon name="qrCode" size="1.5rem" style={{ color: 'white' }} />
          </Box>

          <Box
            className="flex items-center justify-center p-3 cursor-pointer bg-white hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleBarcodeScan}
            style={{
              backgroundColor: accentColor,
            }}
          >
            <Icon name="barcode" size="1.5rem" style={{ color: 'white' }} />
          </Box>

          <Box
            className="flex items-center justify-center p-3 cursor-pointer bg-white hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleVoiceSearch}
            style={{
              backgroundColor: accentColor,
            }}
          >
            <Icon
              name="microphoneLine"
              size="1.5rem"
              style={{ color: 'white' }}
            />
          </Box>

          <Box
            className="flex items-center justify-center p-3 cursor-pointer bg-white hover:bg-gray-100 rounded-full transition-colors"
            onClick={handleImageSearch}
            style={{
              backgroundColor: accentColor,
            }}
          >
            <Icon name="imageLine" size="1.5rem" style={{ color: 'white' }} />
          </Box>
        </Box>
      }
      trigger="click"
      open={isOpen}
      onOpenChange={handleOpenChange}
      placement="top"
      overlayClassName="ai-search-popup"
      arrow={false}
      overlayInnerStyle={{
        backgroundColor: 'transparent',
        paddingBottom: '1rem',
        boxShadow: 'none',
      }}
    >
      <FooterAction
        text="ai_search"
        onClick={() => setIsOpen(!isOpen)}
        icon={
          <Box className="flex relative">
            <Box className="pr-3">
              <Icon name="robotLine" size="1.2rem" />
            </Box>

            <Box className="absolute -right-[0.6rem]">
              <Icon
                name={isOpen ? 'arrowDownFill' : 'arrowUpFill'}
                size="1.4rem"
              />
            </Box>
          </Box>
        }
        disabled={disabled}
      />
    </Popover>
  );
};

export default AISearchAction;
