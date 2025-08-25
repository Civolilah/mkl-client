/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import classNames from 'classnames';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import styled from 'styled-components';

import {
  Box,
  Button,
  CopyToClipboard,
  CopyToClipboardOnlyIcon,
  ErrorMessageElement,
  Icon,
  Image,
  InformationLabel,
  Label,
  Modal,
  RequiredOptionalLabel,
  Spinner,
  Text,
  TransparentColorBox,
} from '@components/index';

import {
  useAccentColor,
  useColors,
  useFetchEntity,
  useTranslation,
} from '@hooks/index';

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

type ImageColorPickerProps = {
  imageUrl: string;
  onColorPick: (color: string) => void;
  isImageLoaded: boolean;
  setIsImageLoaded: Dispatch<SetStateAction<boolean>>;
};

const ImageColorPicker = ({
  imageUrl,
  onColorPick,
  isImageLoaded,
  setIsImageLoaded,
}: ImageColorPickerProps) => {
  const t = useTranslation();

  const colors = useColors();

  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isImageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);

      setSelectedColor(hex);
      onColorPick(hex);
    }
  };

  const handleCanvasMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !isImageLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((event.clientX - rect.left) * scaleX);
    const y = Math.floor((event.clientY - rect.top) * scaleY);

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    if (ctx) {
      const pixel = ctx.getImageData(x, y, 1, 1).data;
      const hex = rgbToHex(pixel[0], pixel[1], pixel[2]);
      setSelectedColor(hex);
    }
  };

  const handleCanvasMouseLeave = () => {
    setCursorPosition(null);
    setSelectedColor('');
  };

  useEffect(() => {
    if (isImageLoaded && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const img = imageRef.current;

      if (ctx) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.drawImage(img, 0, 0);
      }
    }
  }, [isImageLoaded]);

  return (
    <Box className="flex flex-col space-y-4">
      <Box className="relative">
        <img
          ref={imageRef}
          src={imageUrl}
          onLoad={handleImageLoad}
          crossOrigin="anonymous"
          style={{
            display: 'none',
          }}
        />

        {isImageLoaded ? (
          <Box className="relative">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              onMouseLeave={handleCanvasMouseLeave}
              className="w-full h-auto cursor-crosshair border"
              style={{
                borderColor: colors.$1,
              }}
            />

            {cursorPosition && selectedColor && (
              <Box
                className="absolute pointer-events-none border shadow-lg w-7 h-7 z-10"
                style={{
                  left: cursorPosition.x + 12.5,
                  top: cursorPosition.y - 25,
                  borderColor: colors.$1,
                  backgroundColor: selectedColor,
                }}
              />
            )}
          </Box>
        ) : (
          <Box className="flex items-center justify-center h-64">
            <Spinner />
          </Box>
        )}
      </Box>

      <Box className="flex items-center justify-between h-6">
        <InformationLabel text={t('click_on_image_to_pick_color')} />

        {selectedColor && (
          <Box className="flex items-center space-x-2">
            <Box
              className="border w-7 h-7"
              style={{
                backgroundColor: selectedColor,
                borderColor: colors.$1,
              }}
            />

            <Text className="text-xs">{selectedColor}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

type ImagePaletteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  onColorSelect: (color: string) => void;
};

const ImagePaletteModal = ({
  isOpen,
  onClose,
  images,
  onColorSelect,
}: ImagePaletteModalProps) => {
  const t = useTranslation();

  const colors = useColors();

  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [isImageColorPickerOpen, setIsImageColorPickerOpen] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageColorPickerOpen(true);
  };

  const handleColorPick = (color: string) => {
    onColorSelect(color);
    onClose();

    setSelectedImage(null);
    setIsImageColorPickerOpen(false);
  };

  const handleModalClose = () => {
    onClose();
    setSelectedImage(null);
  };

  const handleImageColorPickerClose = () => {
    setIsImageColorPickerOpen(false);
    setSelectedImage(null);
    setIsImageLoaded(false);
  };

  return (
    <>
      <Modal
        title={t('select_image')}
        size="large"
        visible={isOpen}
        onClose={handleModalClose}
      >
        <Box className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {images.map((imageUrl, index) => (
            <Box
              key={index}
              className="group relative cursor-pointer overflow-hidden border hover:border-spacing-2 transition-colors"
              style={{
                borderColor: colors.$1,
              }}
              onClick={() => handleImageSelect(imageUrl)}
            >
              <Image src={imageUrl} className="w-full object-cover" />

              <Box className="flex items-center justify-center absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all">
                <Box className="rounded-full p-2 bg-white hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Icon name="eyeDropper" size="1rem" />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Modal>

      <Modal
        title={t('pick_color')}
        size="large"
        visible={isImageColorPickerOpen}
        onClose={handleImageColorPickerClose}
      >
        {selectedImage && (
          <ImageColorPicker
            imageUrl={selectedImage}
            onColorPick={handleColorPick}
            isImageLoaded={isImageLoaded}
            setIsImageLoaded={setIsImageLoaded}
          />
        )}
      </Modal>
    </>
  );
};

interface ColorPickerProps {
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
  images?: string[];
  onColorRemove?: (hexCode: string) => void;
}

const ColorPicker = ({
  value,
  onValueChange,
  label,
  required,
  errorMessage,
  withoutOptionalText,
  width,
  productQuantityPreview,
  images = [],
  onColorRemove,
}: ColorPickerProps) => {
  const t = useTranslation();
  const colors = useColors();
  const accentColor = useAccentColor();

  const initialValue = useRef<string>(value);

  const [paletteColors, setPaletteColors] = useState<string[]>([]);

  const [isLoadingPaletteColors, setIsLoadingPaletteColors] =
    useState<boolean>(false);

  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState<boolean>(false);

  const [color, setColor] = useState<string>(value);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isImagePaletteOpen, setIsImagePaletteOpen] = useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/colors'],
    endpoint: '/api/colors',
    setEntities: setPaletteColors,
    setIsLoading: setIsLoadingPaletteColors,
    listQuery: true,
    enableByPermission: true,
  });

  useEffect(() => {
    setColor(value);
  }, [value]);

  const handleImageColorSelect = (selectedColor: string) => {
    setColor(selectedColor);
    setIsImagePaletteOpen(false);
  };

  const handlePaletteModalClose = () => {
    setIsPaletteModalOpen(false);
  };

  const handleModalClose = () => {
    if (initialValue.current !== value) {
      onValueChange(initialValue.current);
    }
    setIsModalOpen(false);
  };

  const handleDone = () => {
    initialValue.current = color;
    onValueChange(color);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 25);
  };

  return (
    <>
      <Box
        className={classNames('flex flex-col justify-center items-start', {
          'w-full': width === 'full',
          'space-y-1': label,
        })}
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
          className={classNames('cursor-pointer', {
            'w-full': width === 'full',
            'mt-2': label,
          })}
          onClick={() => setIsModalOpen(true)}
          theme={{ borderColor: colors.$1, hoverBorderColor: accentColor }}
        >
          {color === '' ? (
            <Box
              className="flex items-center space-x-2.5 pl-2 pr-5 py-1"
              style={{ borderColor: colors.$1 }}
            >
              <TransparentColorBox size="1.875rem" />
              <Text className="text-sm">{t('transparent')}</Text>
            </Box>
          ) : (
            <>
              {productQuantityPreview ? (
                <Box className="relative group">
                  <Box
                    className="hover:opacity-75"
                    style={{
                      width: '3rem',
                      height: '2.375rem',
                      backgroundColor: color,
                    }}
                  />

                  <Box
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 shadow-lg transition-all duration-200',
                      'opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110'
                      'focus:outline-none focus:ring-2 focus:ring-red-300 focus:opacity-100"
                    onClick={(event) => {
                      event.stopPropagation();
                      onColorRemove?.(color);
                    }}
                  >
                    <Icon name="close" size="0.9rem" />
                  </Box>
                </Box>
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
                      width: '1.875rem',
                      height: '1.875rem',
                      backgroundColor: color,
                      borderColor: colors.$1,
                    }}
                  />

                  <CopyToClipboard
                    text={color}
                    iconSize="1rem"
                    withoutClickOpenOnMobile
                  >
                    <Text className="text-xs">{color}</Text>
                  </CopyToClipboard>
                </Box>
              )}
            </>
          )}
        </Div>

        <ErrorMessageElement errorMessage={errorMessage} />
      </Box>

      <Modal
        title={t('select_color')}
        size="small"
        visible={isPaletteModalOpen}
        onClose={handlePaletteModalClose}
      >
        <Box className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
          {paletteColors.map((color, index) => (
            <Box key={index} className="w-full h-10 bg-gray-200" />
          ))}
        </Box>
      </Modal>

      <Modal
        title={t('color')}
        size="small"
        visible={isModalOpen}
        onClose={handleModalClose}
      >
        <Box className="flex flex-col w-full items-center justify-center space-y-5">
          <Box className="flex flex-col w-full items-center justify-center space-y-3">
            <Box className="flex w-full flex-col space-y-1">
              <Box
                className={classNames('flex items-center', {
                  'justify-end':
                    !isLoadingPaletteColors && !paletteColors.length,
                  'justify-between':
                    !isLoadingPaletteColors && paletteColors.length,
                })}
              >
                {Boolean(!isLoadingPaletteColors && paletteColors.length) && (
                  <Button
                    type="default"
                    size="middle"
                    onClick={() => setIsPaletteModalOpen(true)}
                  >
                    {t('my_palette')}
                  </Button>
                )}

                {isLoadingPaletteColors && <Spinner />}

                <Box className="cursor-pointer" onClick={() => setColor('')}>
                  <TransparentColorBox size="1.875rem" />
                </Box>
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
                style={{ width: '100%' }}
                theme={{
                  borderColor: colors.$1,
                  hoverBorderColor: accentColor,
                }}
              />

              {color && (
                <CopyToClipboardOnlyIcon
                  text={color}
                  withoutClickOpenOnMobile
                />
              )}
            </Box>
          </Box>

          <Box className="flex w-full flex-col gap-y-2">
            {images.length > 0 && (
              <Button
                type="default"
                className="w-full"
                onClick={() => setIsImagePaletteOpen(true)}
              >
                {t('pick_from_image')}
              </Button>
            )}

            <Button className="w-full" onClick={handleDone}>
              {t('done')}
            </Button>
          </Box>
        </Box>
      </Modal>

      <ImagePaletteModal
        isOpen={isImagePaletteOpen}
        onClose={() => setIsImagePaletteOpen(false)}
        images={images}
        onColorSelect={handleImageColorSelect}
      />
    </>
  );
};

export default ColorPicker;
