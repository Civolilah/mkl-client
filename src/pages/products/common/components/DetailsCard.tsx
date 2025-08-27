/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMediaQuery } from 'react-responsive';

import { Product, ValidationErrors } from '@interfaces/index';

import {
  Box,
  BrandsSelector,
  Card,
  CategoriesSelector,
  InformationLabel,
  MarkdownEditor,
  RefreshDataElement,
  SubsidiariesSelector,
  SuppliersSelector,
  TextField,
  WarehousesSelector,
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

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

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

        <BrandsSelector
          mode="single"
          label={t('brand')}
          placeholder={t('select_brand')}
          value={product?.brand_id ? [product?.brand_id] : []}
          onChange={(value) => handleChange('brand_id', value as string)}
          onBrandCreated={(brandId) => handleChange('brand_id', brandId)}
          onClear={() => handleChange('brand_id', '')}
          errorMessage={errors?.brand_id && t(errors.brand_id)}
          withActionButton
          withRefreshButton
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
          withRefreshButton
        />

        <SuppliersSelector
          label={t('supplier')}
          placeholder={t('select_supplier')}
          value={product?.supplier_ids ? product?.supplier_ids : []}
          onChange={(value) => handleChange('supplier_ids', value as string)}
          onCreatedSupplier={(supplierId) =>
            handleChange('supplier_ids', [
              ...(product?.supplier_ids || []),
              supplierId,
            ])
          }
          onClear={() => handleChange('supplier_ids', [])}
          withActionButton
          errorMessage={errors?.supplier_ids && t(errors.supplier_ids)}
          withRefreshButton
        />

        <SubsidiariesSelector
          label={t('subsidiaries')}
          placeholder={t('select_subsidiaries')}
          value={product?.subsidiaries_ids ? product?.subsidiaries_ids : []}
          onChange={(value) =>
            handleChange('subsidiaries_ids', value as string)
          }
          onCreatedSubsidiary={(subsidiaryId) =>
            handleChange('subsidiaries_ids', [
              ...(product?.subsidiaries_ids || []),
              subsidiaryId,
            ])
          }
          onClear={() => handleChange('subsidiaries_ids', [])}
          errorMessage={errors?.subsidiaries_ids && t(errors.subsidiaries_ids)}
          withActionButton
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t('subsidiaries_assigning_on_product')}
                onlyTooltip
                tooltipOverlayInnerStyle={{
                  width: isSmallScreen ? undefined : '40rem',
                  textAlign: 'center',
                }}
                iconSize="1.35rem"
              />
            </Box>
          }
          withRefreshButton
        />

        <WarehousesSelector
          label={t('warehouses')}
          placeholder={t('select_warehouses')}
          value={product?.warehouses_ids ? product?.warehouses_ids : []}
          onChange={(value) => handleChange('warehouses_ids', value as string)}
          onCreatedWarehouse={(warehouseId) =>
            handleChange('warehouses_ids', [
              ...(product?.warehouses_ids || []),
              warehouseId,
            ])
          }
          onClear={() => handleChange('warehouses_ids', [])}
          errorMessage={errors?.warehouses_ids && t(errors.warehouses_ids)}
          withActionButton
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t('warehouses_assigning_on_product')}
                onlyTooltip
                tooltipOverlayInnerStyle={{
                  width: isSmallScreen ? undefined : '40rem',
                  textAlign: 'center',
                }}
                iconSize="1.35rem"
              />
            </Box>
          }
          withRefreshButton
        />

        <MarkdownEditor
          label={t('description')}
          placeholder={t('enter_description')}
          value={product?.description || ''}
          onChange={(value) => handleChange('description', value)}
          withoutImageFormat
        />
      </Box>
    </Card>
  );
};

export default DetailsCard;
