/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React, { ReactNode, useCallback, useState } from 'react';

import { FileRejection, useDropzone } from 'react-dropzone';
import reactStringReplace from 'react-string-replace';
import styled from 'styled-components';

import { Box, Card, ErrorMessageElement, Icon, Text } from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { CompanyDetailsProps } from '../../CompanyDetails';

const StyledBox = styled.div`
  border: 1px dashed ${({ theme }) => theme.borderColor};
  background-color: ${({ theme }) => theme.backgroundColor};

  &:hover {
    border-color: ${({ theme }) => theme.hoverBorderColor};
    background-color: ${({ theme }) => theme.hoverBackgroundColor};
  }
`;

const LogoCard = ({
  companyDetails,
  errors,
  setCompanyDetails,
  isLoading,
  isFormBusy,
}: CompanyDetailsProps) => {
  const t = useTranslation();

  const colors = useColors();

  const [uploadErrors, setUploadErrors] = useState<ReactNode[]>([]);
  const [currentLogo, setCurrentLogo] = useState<File | undefined>(undefined);

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
                      {Math.round((100 * 1024 * 1024) / (1024 * 1024))}
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

        return;
      }

      setCurrentLogo(acceptedFiles[0]);
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.gif', '.webp'],
    },
    multiple: false,
    disabled: false,
    maxSize: 100 * 1024 * 1024,
  });

  return (
    <Card
      className="w-full"
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="image" size="1.1rem" />
          </Box>

          <Text>{t('logo')}</Text>
        </Box>
      }
      isLoading={isLoading}
    >
      <Box className="w-full">
        {uploadErrors.length > 0 && (
          <Box className="mb-4 p-3 bg-red-50 border border-red-200">
            {uploadErrors.map((error, index) => (
              <ErrorMessageElement errorMessage={error as string} key={index} />
            ))}
          </Box>
        )}

        <StyledBox
          {...getRootProps()}
          className="flex flex-col items-center justify-center px-6 gap-y-3 text-center transition-colors h-[11rem] cursor-pointer"
          theme={{
            borderColor: isDragActive ? colors.$32 : colors.$1,
            backgroundColor: isDragActive ? colors.$33 : colors.$26,
            hoverBorderColor: colors.$16,
            hoverBackgroundColor: colors.$3,
          }}
        >
          <input {...getInputProps()} />

          <Box>
            <Icon
              name="image"
              size="2.25rem"
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
                className="text-sm-plus"
                style={{
                  color: colors.$24,
                }}
              >
                {t('drag_drop_or_click_to_upload')}
              </Text>
            </Box>
          )}
        </StyledBox>
      </Box>
    </Card>
  );
};

export default LogoCard;
