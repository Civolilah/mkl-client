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

import classNames from 'classnames';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useMediaQuery } from 'react-responsive';
import { useDebounce } from 'react-use';
import styled from 'styled-components';

import {
  Button,
  CopyToClipboard,
  CopyToClipboardOnlyIcon,
  Modal,
  Text,
  TransparentColorBox,
} from '@components/index';

import { useAccentColor, useColors, useTranslation } from '@hooks/index';

const HexColorInputStyled = styled(HexColorInput)`
  border: 1px solid ${(props) => props.theme.borderColor};

  &:focus {
    border: 1px solid ${(props) => props.theme.hoverBorderColor};
    outline: none;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.hoverBorderColor};
  }
`;

const Div = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};

  &:hover {
    border: 1px solid ${(props) => props.theme.hoverBorderColor};
  }
`;

type Props = {
  label?: string;
  value: string;
  required?: boolean;
  allowClear?: boolean;
  showText?: boolean;
  onValueChange: (value: string) => void;
};

const ColorPicker = (props: Props) => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const { value, onValueChange, label, required } = props;

  const [color, setColor] = useState<string>(value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useDebounce(
    () => {
      onValueChange(color);
    },
    200,
    [color]
  );

  return (
    <>
      <div className="flex flex-col justify-center items-start">
        {label && (
          <div className="flex items-center space-x-1">
            <Text style={{ fontSize: isSmallScreen ? '14px' : '15px' }}>
              {label}
            </Text>

            {required ? (
              <span className="self-start text-red-600">*</span>
            ) : (
              <span style={{ fontSize: isSmallScreen ? '11.75px' : '12.5px' }}>
                ({t('optional')})
              </span>
            )}
          </div>
        )}

        <Div
          className={classNames('cursor-pointer mt-2')}
          onClick={() => setIsModalOpen(true)}
          style={{
            borderRadius: '4px',
          }}
          theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
        >
          {color === '' ? (
            <div
              className="flex items-center space-x-2 px-1.5 py-1"
              style={{ borderColor: colors.$1 }}
            >
              <TransparentColorBox />

              <Text>{t('no_color')}</Text>
            </div>
          ) : (
            <div className="flex items-center space-x-4 px-1.5 py-1">
              <div
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  backgroundColor: color,
                }}
              />

              <CopyToClipboard text={color}>
                <Text>{color}</Text>
              </CopyToClipboard>
            </div>
          )}
        </Div>
      </div>

      <Modal
        title={t('color')}
        size="small"
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col w-full items-center justify-center space-y-6">
          <div className="flex w-full flex-col space-y-1">
            <div
              className="cursor-pointer self-end"
              onClick={() => setColor('')}
            >
              <TransparentColorBox size="30px" />
            </div>

            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ width: '100%' }}
            />
          </div>

          <div className="flex w-full items-center justify-between space-x-4">
            <HexColorInputStyled
              color={color}
              onChange={setColor}
              className="my-2 p-2"
              style={{
                width: '100%',
                borderRadius: '4px',
              }}
              theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
            />

            {color && <CopyToClipboardOnlyIcon text={color} />}
          </div>

          <div className="flex w-full items-center space-x-2">
            <Button className="w-full" onClick={() => setIsModalOpen(false)}>
              {t('done')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ColorPicker;
