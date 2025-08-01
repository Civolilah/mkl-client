/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import {
  Product,
  QuantityByVariant,
  ValidationErrors,
} from '@interfaces/index';

import { Box, StaticTabs } from '@components/index';

import useHandleChange from '../hooks/useHandleChange';
import useTabs from '../hooks/useTabs';

type Props = {
  product: Product | undefined;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  quantityByVariants: QuantityByVariant[];
  setQuantityByVariants: Dispatch<SetStateAction<QuantityByVariant[]>>;
};

const ProductForm = ({
  product,
  errors,
  editPage,
  isLoading,
  onRefresh,
  setProduct,
  quantityByVariants,
  setQuantityByVariants,
}: Props) => {
  const handleChange = useHandleChange({ setProduct });

  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<string>(
    searchParams.get('tab') ?? 'details'
  );

  const tabs = useTabs({
    product,
    editPage,
    isLoading,
    onRefresh,
    errors,
    handleChange,
    quantityByVariants,
    setQuantityByVariants,
  });

  useEffect(() => {
    if (Object.keys(errors).length) {
      const isErrorFromDetailsPage = Object.keys(errors).some(
        (key) =>
          key.includes('name') ||
          key.includes('description') ||
          key.includes('price') ||
          key.includes('quantity')
      );

      if (isErrorFromDetailsPage) {
        setActiveTab('details');
      }
    }
  }, [errors]);

  useEffect(() => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', activeTab);
      return newParams;
    });
  }, [activeTab]);

  return (
    <Box className="flex w-full self-start xl:w-5/6">
      <StaticTabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Box>
  );
};

export default ProductForm;
