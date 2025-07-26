/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useState } from 'react';

import { get } from 'lodash';

import { LabelCategory, Product, ValidationErrors } from '@interfaces/index';

import {
  Box,
  BrandSelector,
  Card,
  Divider,
  Icon,
  InformationLabel,
  Label,
  LabelCategoriesSelector,
  LabelsSelector,
  NumberField,
  RefreshDataElement,
  SelectDataField,
  SelectStaticField,
  Spinner,
  SubsidiariesSelector,
  Text,
  TextField,
  Toggle,
} from '@components/index';

import { useFetchEntity, useHasPermission, useTranslation } from '@hooks/index';

import ImageUploader from './ImageUploader';
import useInventoryGroupOptions from '../hooks/useInventoryGroupOptions';

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

const Details = (props: ProductProps) => {
  const t = useTranslation();
  const hasPermission = useHasPermission();

  const { product, errors, editPage, isLoading, onRefresh, handleChange } =
    props;

  const inventoryGroupOptions = useInventoryGroupOptions();

  const [labelCategories, setLabelCategories] = useState<LabelCategory[]>([]);

  const [isLoadingLabelCategories, setIsLoadingLabelCategories] =
    useState<boolean>(false);

  useFetchEntity({
    queryKey: '/api/label_categories?selector=true',
    setEntities: setLabelCategories,
    setIsLoading: setIsLoadingLabelCategories,
    listQuery: true,
    enableByPermission:
      hasPermission('view_label_category') ||
      hasPermission('create_label_category') ||
      hasPermission('edit_label_category'),
  });

  const handleAddVariant = (labelCategoryId: string) => {
    handleChange('inventory_by_variant', [
      ...(product?.inventory_by_variant || []),
      {
        label_category_id: labelCategoryId,
        quantity: 1,
        label_ids: [],
        price: 0,
        weight: undefined,
        width: undefined,
        height: undefined,
        length: undefined,
      },
    ]);
  };

  const getVariantLabel = (labelCategoryId: string) => {
    return labelCategories.find(
      (labelCategory) => labelCategory.id === labelCategoryId
    )?.name;
  };

  return (
    <Box className="flex flex-col space-y-4">
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
            onClear={() => handleChange('brand_id', '')}
            errorMessage={errors?.brand_id && t(errors.brand_id)}
            withActionButton
          />

          <SelectDataField
            mode="single"
            label={t('category')}
            placeholder={t('select_category')}
            valueKey="id"
            labelKey="name"
            endpoint="/api/categories?selector=true"
            enableByPermission={
              hasPermission('create_category') ||
              hasPermission('view_category') ||
              hasPermission('edit_category')
            }
            withoutRefreshData
            value={product?.category_id ? [product?.category_id] : []}
            onChange={(value) => handleChange('category_id', value as string)}
            onClear={() => handleChange('category_id', '')}
            errorMessage={errors?.category_id && t(errors.category_id)}
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

      <Card title={t('inventory')} className="w-full">
        <Box className="flex flex-col space-y-4 pb-2">
          <SelectStaticField
            mode="single"
            required
            label={t('group_inventory_by')}
            options={inventoryGroupOptions}
            value={product?.inventory_group ? [product?.inventory_group] : []}
            onChange={(value) => {
              handleChange('inventory_group', value as string);

              setTimeout(() => {
                handleChange('inventory_by_variant', []);
              }, 50);
            }}
          />

          {product?.inventory_group === 'default' && (
            <>
              <Box className="flex items-center space-x-10">
                <Label>{t('unlimited_quantity')}</Label>

                <Toggle
                  checked={Boolean(product?.unlimited_default_quantity)}
                  onChange={(value) => {
                    handleChange('unlimited_default_quantity', value);

                    if (value) {
                      handleChange(
                        'inventory_by_group.0.quantity' as keyof Product,
                        0
                      );
                    }
                  }}
                />
              </Box>

              <NumberField
                required
                min={0}
                label={t('quantity')}
                value={get(product, 'inventory_by_group.0.quantity', 0)}
                onValueChange={(value) =>
                  handleChange(
                    'inventory_by_group.0.quantity' as keyof Product,
                    value
                  )
                }
                disabled={Boolean(product?.unlimited_default_quantity)}
                errorMessage={
                  errors?.['inventory_by_group.0.quantity'] &&
                  t(errors['inventory_by_group.0.quantity'])
                }
              />

              <NumberField
                min={0}
                required
                label={t('price_by_item')}
                value={product?.price_by_item || 0}
                onValueChange={(value) => handleChange('price_by_item', value)}
                addonAfter="KM"
                errorMessage={
                  errors?.['price_by_item'] && t(errors['price_by_item'])
                }
              />
            </>
          )}

          {product?.inventory_group === 'variant' && (
            <Box className="flex flex-col space-y-4 w-full">
              {isLoadingLabelCategories ? (
                <Box className="flex items-center justify-center pt-5">
                  <Spinner />
                </Box>
              ) : (
                <>
                  <Box className="max-w-[20rem]">
                    <LabelCategoriesSelector
                      label={t('options')}
                      placeholder={t('select_options')}
                      value={[]}
                      onChange={(value) => handleAddVariant(value?.[0])}
                      withActionButton
                      exclude={product?.inventory_by_variant?.map(
                        (variant) => variant.label_category_id as string
                      )}
                    />
                  </Box>

                  {Boolean(product.inventory_by_variant.length) && (
                    <Box className="flex flex-col w-full">
                      <Box className="flex flex-col w-full pt-6">
                        {product.inventory_by_variant.map((variant, index) => (
                          <Box
                            key={index}
                            className="flex items-center justify-between max-w-[40rem]"
                          >
                            <Box className="flex items-center space-x-2">
                              <Icon name="dotFill" size="1.1rem" />

                              <Text>
                                {getVariantLabel(
                                  variant.label_category_id as string
                                )}
                              </Text>
                            </Box>

                            <Box className="flex items-center space-x-2 w-[20rem] pb-6">
                              <LabelsSelector
                                label={t('variants')}
                                placeholder={t('select_variants')}
                                value={variant.label_ids || []}
                                onChange={(value) =>
                                  handleChange(
                                    `inventory_by_variant.${index}.label_ids` as keyof Product,
                                    value
                                  )
                                }
                                withActionButton
                                withoutOptionalText
                                labelCategoryId={variant.label_category_id}
                              />
                            </Box>
                          </Box>
                        ))}
                      </Box>

                      <Divider
                        style={{
                          marginTop: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      />

                      <Box className="flex space-x-5"></Box>
                    </Box>
                  )}

                  {!product.inventory_by_variant.length && (
                    <Text className="text-sm text-center pt-5">
                      {t('no_options_added')}
                    </Text>
                  )}
                </>
              )}
            </Box>
          )}
        </Box>
      </Card>

      <Card title={t('images')} className="w-full">
        <Box className="pt-2">
          <ImageUploader />
        </Box>
      </Card>

      <Card title={t('additional_details')} className="w-full">
        <Box className="flex flex-col space-y-6 pb-2">
          <Box className="flex flex-col space-y-2 w-full">
            <SubsidiariesSelector
              label={t('subsidiaries')}
              placeholder={t('select_subsidiaries')}
              value={product?.subsidiaries ? product?.subsidiaries : []}
              onChange={(value) =>
                handleChange('subsidiaries', value as string)
              }
              onClear={() => handleChange('subsidiaries', '')}
              errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
              withActionButton
            />

            <InformationLabel text={t('subsidiaries_assigning_on_product')} />
          </Box>

          <Box className="flex items-center space-x-10">
            <Label>{t('status_by_quantity')}</Label>

            <Toggle
              checked={Boolean(product?.is_status_by_quantity)}
              onChange={(value) => handleChange('is_status_by_quantity', value)}
            />
          </Box>

          {product?.is_status_by_quantity ? (
            <>Status by quantity</>
          ) : (
            <SelectDataField
              mode="single"
              label={t('status')}
              placeholder={t('select_status')}
              valueKey="id"
              labelKey="name"
              endpoint="/api/statuses?selector=true"
              enableByPermission={
                hasPermission('create_status') ||
                hasPermission('view_status') ||
                hasPermission('edit_status')
              }
              withoutRefreshData
              value={product?.status_id ? [product?.status_id] : []}
              onChange={(value) => handleChange('status_id', value as string)}
              onClear={() => handleChange('status_id', '')}
              errorMessage={errors?.status_id && t(errors.status_id)}
            />
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default Details;
