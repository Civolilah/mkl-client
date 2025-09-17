/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { useRef, useState } from 'react';

import { Popover } from 'antd';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import { useMediaQuery } from 'react-responsive';

import { IconName } from '@components/general/Icon';
import { Box, Icon } from '@components/index';

import { useAccentColor, useColors, usePreventAction } from '@hooks/index';

import FooterAction from './FooterAction';

interface Props {
  disabled?: boolean;
  withoutFooterAction?: boolean;
}

const SearchItem = ({
  icon,
  onClick,
}: {
  icon: IconName;
  onClick: () => void;
}) => {
  const colors = useColors();
  const accentColor = useAccentColor();

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Box
      className={classNames(
        'flex items-center justify-center p-3 cursor-pointer rounded-full border',
        {
          'shadow-xl': isHovered,
        }
      )}
      onClick={onClick}
      style={{
        backgroundColor: isHovered ? 'white' : accentColor,
        borderColor: isHovered ? colors.$1 : 'transparent',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Icon
        name={icon}
        size="1.5rem"
        style={{ color: isHovered ? accentColor : 'white' }}
      />
    </Box>
  );
};

export const isMobileAiPopoverOpenAtom = atom<boolean>(false);

const ScanAction = ({ disabled, withoutFooterAction }: Props) => {
  const colors = useColors();
  const accentColor = useAccentColor();

  const preventAction = usePreventAction();

  const popoverRef = useRef(null);

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  const [isOpen, setIsOpen] = useAtom(isMobileAiPopoverOpenAtom);

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

  if (withoutFooterAction && !isLargeScreen) {
    return null;
  }

  return (
    <Popover
      ref={popoverRef}
      content={
        <Box className="flex flex-col gap-y-3 p-2">
          <SearchItem icon="qrCode" onClick={handleQRScan} />

          <SearchItem icon="barcode" onClick={handleBarcodeScan} />
        </Box>
      }
      trigger="click"
      open={isOpen}
      onOpenChange={(open) => {
        preventAction({
          action: () => {
            handleOpenChange(open);
          },
        });
      }}
      placement="top"
      arrow={false}
      overlayInnerStyle={{
        backgroundColor: 'transparent',
        paddingBottom: '1rem',
        boxShadow: 'none',
      }}
      getTooltipContainer={() => document.body}
    >
      <div className="flex flex-1 h-full items-center">
        <FooterAction
          text="scan"
          icon={
            <Box>
              <Icon
                name="barcode"
                size="1.15rem"
                style={{ color: accentColor }}
              />
            </Box>
          }
          style={{
            backgroundColor: isOpen ? colors.$17 : 'transparent',
          }}
          disabled={disabled}
          withoutActiveEffect
        />
      </div>
    </Popover>
  );
};

export default ScanAction;
