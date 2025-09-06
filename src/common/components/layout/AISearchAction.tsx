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
import { useLocation } from 'react-router-dom';

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

const AISearchAction = ({ disabled, withoutFooterAction }: Props) => {
  const colors = useColors();
  const location = useLocation();
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

          <SearchItem icon="microphoneLine" onClick={handleVoiceSearch} />

          <SearchItem icon="imageLine" onClick={handleImageSearch} />
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
      {isLargeScreen ? (
        <div
          className={classNames(
            'flex fixed rounded-full p-5 py-[1.2rem] cursor-pointer',
            {
              'bottom-[2rem] right-[2rem]':
                location.pathname.includes('/new') ||
                location.pathname.includes('/settings'),
              'bottom-[4.25rem] right-[2rem]':
                !location.pathname.includes('/new') &&
                !location.pathname.includes('/settings'),
            }
          )}
          style={{
            backgroundColor: isOpen ? 'white' : accentColor,
            border: `1px solid ${colors.$1}`,
          }}
        >
          <Box>
            <Icon
              name="robotLine"
              size="1.7rem"
              style={{ color: isOpen ? accentColor : 'white' }}
            />
          </Box>
        </div>
      ) : (
        <div className="flex flex-1 h-full items-center">
          <FooterAction
            text="ai_search"
            icon={
              <Box>
                <Icon
                  name="robotLine"
                  size="1.2rem"
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
      )}
    </Popover>
  );
};

export default AISearchAction;
