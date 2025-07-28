/* eslint-disable @typescript-eslint/no-unused-vars */
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

type Props = {
  isLoading?: boolean;
  editPage?: boolean;
  onRefresh?: () => void;
  product: Product | undefined;
  errors: ValidationErrors;
  handleChange: (
    field: keyof Product,
    value:
      | string
      | number
      | boolean
      | Product['inventory_by_variant']
      | string[]
  ) => void;
  setCurrentImages?: Dispatch<SetStateAction<string[]>>;
};

const ImagesCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  handleChange,
  setCurrentImages,
}: Props) => {
  const t = useTranslation();

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
      <Box className="pt-2">
        <ImageUploader setCurrentImages={setCurrentImages} />
      </Box>
    </Card>
  );
};

export default ImagesCard;
