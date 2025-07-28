/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Product, ValidationErrors } from '@interfaces/index';

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
  ) => void;
};

const Details = ({
  product,
  errors,
  editPage,
  isLoading,
  onRefresh,
  handleChange,
}: ProductProps) => {
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
      />

      <ImagesCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
      />

      <AdditionalDetailsCard
        isLoading={isLoading}
        editPage={editPage}
        onRefresh={onRefresh}
        product={product}
        errors={errors}
        handleChange={handleChange}
      />
    </Box>
  );
};

export default Details;
