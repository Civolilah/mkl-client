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

import {
  Box,
  BrandSelector,
  Card,
  CategoriesSelector,
  RefreshDataElement,
  SuppliersSelector,
  TextField,
} from '@components/index';

import { useTranslation } from '@hooks/index';

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
};

const DetailsCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  handleChange,
}: Props) => {
  const t = useTranslation();

  return (
    <Card
      title={t('details')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-2">
        <TextField
          required
          label={t('name')}
          placeHolder={t('product_name_placeholder')}
          value={product?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />

        <BrandSelector
          mode="single"
          label={t('brand')}
          placeholder={t('select_brand')}
          value={product?.brand_id ? [product?.brand_id] : []}
          onChange={(value) => handleChange('brand_id', value as string)}
          onBrandCreated={(brandId) => handleChange('brand_id', brandId)}
          onClear={() => handleChange('brand_id', '')}
          errorMessage={errors?.brand_id && t(errors.brand_id)}
          withActionButton
        />

        <CategoriesSelector
          mode="single"
          label={t('category')}
          placeholder={t('select_category')}
          value={product?.category_id ? [product?.category_id] : []}
          onChange={(value) => handleChange('category_id', value as string)}
          onCategoryCreated={(categoryId) =>
            handleChange('category_id', categoryId)
          }
          onClear={() => handleChange('category_id', '')}
          errorMessage={errors?.category_id && t(errors.category_id)}
          withActionButton
        />

        <SuppliersSelector
          mode="single"
          label={t('supplier')}
          placeholder={t('select_supplier')}
          value={product?.supplier_id ? [product?.supplier_id] : []}
          onChange={(value) => handleChange('supplier_id', value as string)}
          onClear={() => handleChange('supplier_id', '')}
          withActionButton
          errorMessage={errors?.supplier_id && t(errors.supplier_id)}
        />

        <TextField
          type="textarea"
          label={t('description')}
          placeHolder={t('product_notes')}
          value={product?.description || ''}
          onValueChange={(value) => handleChange('description', value)}
          maxLength={2000}
        />
      </Box>
    </Card>
  );
};

export default DetailsCard;
