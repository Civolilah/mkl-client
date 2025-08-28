/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { Product, ValidationErrors } from '@interfaces/index';

import { Box, Card, RefreshDataElement } from '@components/index';

import { useTranslation } from '@hooks/index';

import ImageUploader from './ImageUploader';
import useHandleChange from '../hooks/useHandleChange';

type Props = {
  isLoading?: boolean;
  editPage?: boolean;
  onRefresh?: () => void;
  product: Product | undefined;
  errors: ValidationErrors;
  setCurrentImages?: Dispatch<SetStateAction<string[]>>;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

const ImagesCard = ({
  isLoading,
  editPage,
  onRefresh,
  setCurrentImages,
  setProduct,
}: Props) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProduct });

  return (
    <Card
      title={t('images')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="py-2">
        <ImageUploader
          onDefaultImageIndexChange={(index) =>
            handleChange('default_image_id', index)
          }
          onImagesChange={(images) => {
            handleChange(
              'images',
              images.map((image) => image.file as File)
            );
            setCurrentImages?.(images.map((image) => image.preview || ''));
          }}
        />
      </Box>
    </Card>
  );
};

export default ImagesCard;
