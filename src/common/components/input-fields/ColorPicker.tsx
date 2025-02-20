/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useDebounce } from 'react-use';
import styled from 'styled-components';

import {
  Box,
  Button,
  CopyToClipboard,
  CopyToClipboardOnlyIcon,
  ErrorMessageElement,
  Label,
  Modal,
  RequiredOptionalLabel,
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
  className?: string;
  label?: string;
  value: string;
  required?: boolean;
  allowClear?: boolean;
  showText?: boolean;
  onValueChange: (value: string) => void;
  errorMessage?: string;
  withoutOptionalText?: boolean;
  width?: 'full';
  productQuantityPreview?: boolean;
};

const ColorPicker = (props: Props) => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

  const initialValue = useRef(props.value);

  const {
    value,
    onValueChange,
    label,
    required,
    errorMessage,
    withoutOptionalText,
    width,
    productQuantityPreview,
  } = props;

  const [color, setColor] = useState<string>(value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useDebounce(
    () => {
      onValueChange(color);
    },
    200,
    [color]
  );

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <>
      <Box
        className={classNames(
          'flex flex-col justify-center items-start space-y-1',
          {
            'w-full': width === 'full',
          }
        )}
      >
        {label && (
          <Box className="flex items-center space-x-1">
            <Label>{label}</Label>

            <RequiredOptionalLabel
              required={Boolean(required)}
              withoutOptionalText={withoutOptionalText}
            />
          </Box>
        )}

        <Div
          className={classNames('cursor-pointer mt-2', {
            'w-full': width === 'full',
            'hover:opacity-75': productQuantityPreview,
          })}
          onClick={() => setIsModalOpen(true)}
          theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
        >
          {color === '' ? (
            <Box
              className="flex items-center space-x-2 px-1.5 py-1"
              style={{ borderColor: colors.$1 }}
            >
              <TransparentColorBox />

              <Text className="text-sm">{t('transparent')}</Text>
            </Box>
          ) : (
            <>
              {productQuantityPreview ? (
                <Box
                  style={{
                    width: '7rem',
                    height: '2.25rem',
                    backgroundColor: color,
                  }}
                />
              ) : (
                <Box
                  className={classNames(
                    'flex items-center space-x-4 px-1.5 py-1',
                    {
                      'flex justify-between w-full': width === 'full',
                    }
                  )}
                >
                  <Box
                    className="border"
                    style={{
                      width: '1.625rem',
                      height: '1.625rem',
                      backgroundColor: color,
                      borderColor: colors.$1,
                    }}
                  />

                  <CopyToClipboard text={color} iconSize="1rem">
                    <Text className="text-xs-plus">{color}</Text>
                  </CopyToClipboard>
                </Box>
              )}
            </>
          )}
        </Div>

        <ErrorMessageElement errorMessage={errorMessage} />
      </Box>

      <Modal
        title={t('color')}
        size="small"
        visible={isModalOpen}
        onClose={() => {
          if (initialValue.current !== value) {
            onValueChange(initialValue.current);
          }

          setIsModalOpen(false);
        }}
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
            <Button
              className="w-full"
              onClick={() => {
                initialValue.current = color;

                setTimeout(() => {
                  setIsModalOpen(false);
                }, 25);
              }}
            >
              {t('done')}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ColorPicker;
