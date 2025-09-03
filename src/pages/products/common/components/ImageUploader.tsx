/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useCallback, useState, useEffect, useMemo, ReactNode } from 'react';

import classNames from 'classnames';
import { FileRejection, useDropzone } from 'react-dropzone';
import { FaImage } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import styled from 'styled-components';

import {
  Box,
  Button,
  ErrorMessageElement,
  Icon,
  Image,
  Text,
} from '@components/index';

import {
  useColors,
  useCompanyPlan,
  useImageLimitByPlan,
  useTranslation,
} from '@hooks/index';

export interface ImageFile {
  id: string | number;
  file?: File;
  preview?: string;
  url?: string;
  isNew?: boolean;
  name?: string;
}

export interface ImageUploaderProps {
  maxImages?: number;
  onImagesChange?: (images: ImageFile[]) => void;
  initialImages?: ImageFile[];
  className?: string;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  disabled?: boolean;
  onDefaultImageIndexChange?: (index: number) => void;
}

const StyledBox = styled.div`
  border: 1px dashed ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};

  &:hover {
    border-color: ${({ theme }) => theme.hoverBorderColor};
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

const ImageUploader = ({
  onImagesChange,
  initialImages = [],
  className = '',
  acceptedFileTypes = ['.jpeg', '.jpg', '.gif', '.webp'],
  maxFileSize = 100 * 1024 * 1024,
  disabled = false,
  onDefaultImageIndexChange,
}: ImageUploaderProps) => {
  const t = useTranslation();

  const colors = useColors();
  const navigate = useNavigate();

  const { companyPlan } = useCompanyPlan();
  const { imagesNumberLimit } = useImageLimitByPlan();

  const [images, setImages] = useState<ImageFile[]>(initialImages);
  const [uploadErrors, setUploadErrors] = useState<ReactNode[]>([]);
  const [defaultImageIndex, setDefaultImageIndex] = useState<number>(0);

  const isMaxReached = useMemo(() => {
    return images.length >= imagesNumberLimit;
  }, [images, imagesNumberLimit]);

  const isDropzoneDisabled = useMemo(() => {
    return disabled || isMaxReached;
  }, [disabled, isMaxReached]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      setUploadErrors([]);

      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.flatMap(({ file, errors }) =>
          errors.map((e: { code: string }) => {
            switch (e.code) {
              case 'file-too-large':
                return reactStringReplace(
                  reactStringReplace(t('file_too_large'), ':name', () => (
                    <Text key="fileTooLargeMessage">{file.name}</Text>
                  )),
                  ':maxSize',
                  () => (
                    <Text key="maxSizeMessage">
                      {Math.round(maxFileSize / (1024 * 1024))}
                    </Text>
                  )
                );
              case 'file-invalid-type':
                return reactStringReplace(
                  t('invalid_file_type'),
                  ':name',
                  () => <Text key="invalidTypeMessage">{file.name}</Text>
                );
              default:
                return reactStringReplace(t('upload_error'), ':name', () => (
                  <Text key="uploadErrorMessage">{file.name}</Text>
                ));
            }
          })
        );

        setUploadErrors(errors);
      }

      const remainingSlots = imagesNumberLimit - images.length;
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);

      const imageFiles: ImageFile[] = filesToAdd.map((file) => ({
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        isNew: true,
        name: file.name,
      }));

      const newImages = [...images, ...imageFiles];
      setImages(newImages);

      if (onImagesChange) {
        onImagesChange(newImages);
      }
    },
    [images, imagesNumberLimit, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': acceptedFileTypes,
    },
    multiple: true,
    disabled: disabled || isMaxReached,
    maxSize: maxFileSize,
  });

  const removeImage = useCallback(
    (imageId: string | number) => {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((img) => {
          if (img.id === imageId) {
            if (img.preview) {
              URL.revokeObjectURL(img.preview);
            }
            return false;
          }
          return true;
        });

        if (onImagesChange) {
          onImagesChange(updatedImages);
        }

        return updatedImages;
      });
    },
    [onImagesChange]
  );

  useEffect(() => {
    return () => {
      images.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  return (
    <Box className={classNames('w-full', className)}>
      {uploadErrors.length > 0 && (
        <Box className="mb-4 p-3 bg-red-50 border border-red-200">
          {uploadErrors.map((error, index) => (
            <ErrorMessageElement errorMessage={error as string} key={index} />
          ))}
        </Box>
      )}

      {!(images.length >= imagesNumberLimit) && !disabled && (
        <StyledBox
          {...getRootProps()}
          className={classNames(
            'flex flex-col items-center justify-center px-6 gap-y-3 text-center transition-colors h-[11rem]',
            {
              'cursor-not-allowed': isDropzoneDisabled,
              'cursor-pointer': !isDropzoneDisabled,
            }
          )}
          theme={{
            borderColor: isDragActive
              ? colors.$32
              : isDropzoneDisabled
                ? colors.$1
                : colors.$1,
            backgroundColor: isDragActive
              ? colors.$33
              : isDropzoneDisabled
                ? colors.$2
                : colors.$26,
            hoverBorderColor: !isDropzoneDisabled ? colors.$16 : undefined,
            hoverBackgroundColor: !isDropzoneDisabled ? colors.$3 : undefined,
          }}
        >
          <input {...getInputProps()} />

          <Box
            className={classNames({
              'opacity-75': isDropzoneDisabled,
              'opacity-100': !isDropzoneDisabled,
            })}
          >
            <Icon
              name="image"
              size="2.75rem"
              style={{
                color: colors.$34,
              }}
            />
          </Box>

          {isDragActive ? (
            <Text className="text-blue-600">{t('drop_images_here')}</Text>
          ) : (
            <Box className="flex flex-col items-center justify-center">
              <Text
                className="text-base"
                style={{
                  color: isDropzoneDisabled ? colors.$34 : colors.$24,
                }}
              >
                {t('drag_drop_or_click_to_upload')}
              </Text>

              <Text className="text-sm" style={{ color: colors.$34 }}>
                {t('max_file_size')}: {Math.round(maxFileSize / (1024 * 1024))}
                MB
              </Text>
            </Box>
          )}
        </StyledBox>
      )}

      {images.length > 0 && (
        <Box
          className={classNames(
            'grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4',
            {
              'mt-4': !(images.length >= imagesNumberLimit) && !disabled,
            }
          )}
        >
          {images.map((image, index) => (
            <Box key={image.id} className="h-full flex flex-col space-y-2">
              <Box
                className="relative group border-2"
                style={{
                  lineHeight: 0,
                  borderColor:
                    defaultImageIndex === index ? '#3b82f6' : colors.$1,
                }}
              >
                <Image
                  className="block"
                  src={image.preview || image.url || ''}
                  loading="lazy"
                  preview
                />

                <Box
                  className={classNames(
                    'absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg transition-all duration-200',
                    'opacity-0 group-hover:opacity-100 hover:bg-red-600 hover:scale-110',
                    'focus:outline-none focus:ring-2 focus:ring-red-300 focus:opacity-100',
                    {
                      'cursor-pointer': !disabled,
                      'cursor-not-allowed opacity-50': disabled,
                    }
                  )}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!disabled) {
                      removeImage(image.id);
                    }
                  }}
                >
                  <Icon name="close" size={16} style={{ color: 'white' }} />
                </Box>

                {image.isNew && (
                  <Box className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md shadow-sm font-medium">
                    {t('new')}
                  </Box>
                )}

                {image.name && (
                  <Box
                    className="w-full absolute bottom-0 left-0 text-xs p-2 truncate backdrop-blur-sm"
                    style={{
                      color: colors.$24,
                      backgroundColor: `${colors.$25}95`,
                    }}
                  >
                    {image.name}
                  </Box>
                )}
              </Box>

              <Box className="flex-shrink-0">
                {defaultImageIndex === index ? (
                  <Button
                    className="w-full"
                    size="middle"
                    type="default"
                    disabled
                    icon={<Icon name="star" size="1.25rem" />}
                  >
                    {t('default')}
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    size="middle"
                    type="default"
                    disabled={disabled}
                    onClick={() => {
                      setDefaultImageIndex(index);
                      onDefaultImageIndexChange?.(index);
                    }}
                    icon={<Icon name="emptyStar" size="1.25rem" />}
                  >
                    {t('set_as_default')}
                  </Button>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {isMaxReached && (
        <Box
          className="flex items-center justify-center gap-x-10 p-4 border mt-6"
          style={{
            borderColor: colors.$1,
            backgroundColor: colors.$26,
          }}
        >
          <Box className="flex items-center space-x-2">
            <Box>
              <FaImage className="h-5 w-5 text-gray-400 mr-2" />
            </Box>

            <Text style={{ color: colors.$34 }}>
              {t('max_images_reached')}: {imagesNumberLimit}/{imagesNumberLimit}
            </Text>
          </Box>

          {companyPlan !== 'enterprise' && (
            <Button
              type="default"
              onClick={() => navigate('/settings/billing')}
            >
              {t('upgrade')}
            </Button>
          )}
        </Box>
      )}

      {!isMaxReached && (
        <Box className="mt-2 text-sm text-right" style={{ color: colors.$34 }}>
          {images.length}/{imagesNumberLimit} {t('images')}
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
