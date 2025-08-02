/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useState } from 'react';

import {
  Product,
  QuantityByVariant,
  ValidationErrors,
} from '@interfaces/index';

import { Box } from '@components/index';

import AdditionalDetailsCard from './AdditionalDetailsCard';
import DetailsCard from './DetailsCard';
import ImagesCard from './ImagesCard';
import InventoryCard from './InventoryCard';

export type ProductProps = {
  product: Product | undefined;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  handleChange: (
    field: keyof Product,
    value:
      | string
      | number
      | boolean
      | Product['inventory_by_variant']
      | string[]
      | Product['quantity_by_variant']
  ) => void;
  quantityByVariants: QuantityByVariant[];
  setQuantityByVariants: Dispatch<SetStateAction<QuantityByVariant[]>>;
};

const Details = ({
  product,
  errors,
  editPage,
  isLoading,
  onRefresh,
  handleChange,
  quantityByVariants,
  setQuantityByVariants,
}: ProductProps) => {
  const [currentImages, setCurrentImages] = useState<string[]>([]);

  return (
    <Box className="flex flex-col space-y-4">
      <DetailsCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
      />

      <InventoryCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
        images={currentImages}
        quantityByVariants={quantityByVariants}
        setQuantityByVariants={setQuantityByVariants}
      />

      <ImagesCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
        setCurrentImages={setCurrentImages}
      />

      <AdditionalDetailsCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
        quantityByVariants={quantityByVariants}
      />
    </Box>
  );
};

export default Details;
