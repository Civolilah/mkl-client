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
  Box,
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
      <Box className="flex flex-col justify-center items-start">
        {label && (
          <Box className="flex items-center space-x-1">
            <Text
              style={{
                fontSize: isSmallScreen ? '0.875rem' : '0.938rem',
                fontWeight: 500,
              }}
            >
              {label}
            </Text>

            {required ? (
              <Text
                style={{ fontSize: isSmallScreen ? '0.719rem' : '0.781rem' }}
              >
                ({t('required')})
              </Text>
            ) : (
              <Text
                style={{ fontSize: isSmallScreen ? '0.734rem' : '0.781rem' }}
              >
                ({t('optional')})
              </Text>
            )}
          </Box>
        )}

        <Div
          className={classNames('cursor-pointer mt-2')}
          onClick={() => setIsModalOpen(true)}
          theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
        >
          {color === '' ? (
            <Box
              className="flex items-center space-x-2 px-1.5 py-1"
              style={{ borderColor: colors.$1 }}
            >
              <TransparentColorBox />

              <Text>{t('no_color')}</Text>
            </Box>
          ) : (
            <Box className="flex items-center space-x-4 px-1.5 py-1">
              <Box
                style={{
                  width: '2.2rem',
                  height: '2.2rem',
                  backgroundColor: color,
                }}
              />

              <CopyToClipboard text={color}>
                <Text>{color}</Text>
              </CopyToClipboard>
            </Box>
          )}
        </Div>
      </Box>

      <Modal
        title={t('color')}
        size="small"
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Box className="flex flex-col w-full items-center justify-center space-y-6">
          <Box className="flex w-full flex-col space-y-1">
            <Box
              className="cursor-pointer self-end"
              onClick={() => setColor('')}
            >
              <TransparentColorBox size="1.875rem" />
            </Box>

            <HexColorPicker
              color={color}
              onChange={setColor}
              style={{ width: '100%' }}
            />
          </Box>

          <Box className="flex w-full items-center justify-between space-x-4">
            <HexColorInputStyled
              color={color}
              onChange={setColor}
              className="my-2 p-2"
              style={{
                width: '100%',
              }}
              theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
            />

            {color && <CopyToClipboardOnlyIcon text={color} />}
          </Box>

          <Box className="flex w-full items-center space-x-2">
            <Button className="w-full" onClick={() => setIsModalOpen(false)}>
              {t('done')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ColorPicker;
