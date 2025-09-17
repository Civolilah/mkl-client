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

import classNames from 'classnames';
import colorString from 'color-string';
import { cloneDeep, get, set } from 'lodash';

import { LabelCategory, Product, QuantityByVariant } from '@interfaces/index';

import {
  Box,
  Card,
  Divider,
  Icon,
  Label,
  LabelCategoriesSelector,
  LabelsSelector,
  NumberField,
  RefreshDataElement,
  SelectStaticField,
  Spinner,
  Text,
  Toggle,
} from '@components/index';
import { QuantityUnitsSelector } from '@components/index';

import useSymbols from '@hooks/global/useSymbols';
import {
  useAccentColor,
  useColors,
  useNumberFieldSymbols,
  useFetchEntity,
  useHasPermission,
  useTranslation,
  useFindLabel,
} from '@hooks/index';

import ColorSelector from './ColorSelector';
import DimensionsModal from './DimensionsModal';
import { ProductProps } from './ProductForm';
import useHandleChange from '../hooks/useHandleChange';
import useInventoryGroupOptions from '../hooks/useInventoryGroupOptions';
import useLabelCategoriesAdditionalOptions from '../hooks/useLabelCategoriesAdditionalOptions';

const InventoryCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  setProduct,
  currentImages,
}: ProductProps) => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const handleChange = useHandleChange({ setProduct });

  const { getLabelNameByLabelId, isLoadingLabels } = useFindLabel();

  const colors = useColors();
  const accentColor = useAccentColor();
  const { currencySymbol } = useSymbols();
  const inventoryGroupOptions = useInventoryGroupOptions({ product });
  const labelCategoriesAdditionalOptions =
    useLabelCategoriesAdditionalOptions();
  const { disablingNumberFieldSymbol } = useNumberFieldSymbols();

  const [labelCategories, setLabelCategories] = useState<LabelCategory[]>([]);
  const [isLoadingLabelCategories, setIsLoadingLabelCategories] =
    useState<boolean>(false);

  useFetchEntity({
    queryIdentifiers: ['/api/label_categories', 'selector'],
    endpoint: '/api/label_categories?selector=true',
    setEntities: setLabelCategories,
    setIsLoading: setIsLoadingLabelCategories,
    listQuery: true,
    enableByPermission:
      hasPermission('view_label_category') ||
      hasPermission('create_label_category') ||
      hasPermission('edit_label_category'),
  });

  const handleCombinationChange = (
    index: number,
    field: string,
    value: string | number | boolean
  ) => {
    if (!product?.quantity_by_variant) {
      return;
    }

    const updatedCombinations = cloneDeep(product?.quantity_by_variant);

    set(updatedCombinations, `${index}.${field}`, value);

    handleChange('quantity_by_variant', updatedCombinations);
  };

  const handleAddVariant = (labelCategoryId: string) => {
    handleChange('inventory_by_variant', [
      ...(cloneDeep(product?.inventory_by_variant) || []),
      {
        label_category_id: labelCategoryId,
        label_ids: [],
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    let updatedInventoryByVariant =
      cloneDeep(product?.inventory_by_variant) || [];

    updatedInventoryByVariant = updatedInventoryByVariant.filter(
      (_, i) => i !== index
    );

    handleChange('inventory_by_variant', updatedInventoryByVariant);
  };

  const getVariantLabel = (labelCategoryId: string) => {
    if (labelCategoryId === 'color') {
      return t('color');
    }

    return labelCategories.find(
      (labelCategory) => labelCategory.id === labelCategoryId
    )?.name;
  };

  return (
    <Card
      title={t('inventory')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-2">
        <QuantityUnitsSelector
          required
          value={product?.quantity_unit || 'pcs'}
          onChange={(value) => handleChange('quantity_unit', value)}
        />

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
                checked={Boolean(product?.unlimited_quantity)}
                onChange={(value) => {
                  handleChange('unlimited_quantity', value);

                  if (value) {
                    handleChange('quantity', 0);
                  }
                }}
              />
            </Box>

            <NumberField
              required
              min={0}
              label={t('quantity')}
              value={get(product, 'quantity', 0)}
              onValueChange={(value) => handleChange('quantity', value)}
              disabled={Boolean(product?.unlimited_quantity)}
              disablePlaceholderValue={disablingNumberFieldSymbol}
              errorMessage={errors?.['quantity'] && t(errors['quantity'])}
            />

            <NumberField
              min={0}
              required
              label={t('price_by_item')}
              value={product?.price_by_item || 0}
              onValueChange={(value) => handleChange('price_by_item', value)}
              addonAfter={currencySymbol}
              errorMessage={
                errors?.['price_by_item'] && t(errors['price_by_item'])
              }
            />
          </>
        )}

        {product?.inventory_group === 'variants' && (
          <Box className="flex flex-col space-y-4 w-full">
            {isLoadingLabelCategories || isLoadingLabels ? (
              <Box className="flex items-center justify-center pt-5">
                <Spinner />
              </Box>
            ) : (
              <>
                <LabelCategoriesSelector
                  label={t('options')}
                  placeholder={t('select_options')}
                  value={[]}
                  onChange={(value) => handleAddVariant(value as string)}
                  onCreatedLabelCategory={(labelCategoryId) =>
                    handleAddVariant(labelCategoryId)
                  }
                  withActionButton
                  exclude={product?.inventory_by_variant?.map(
                    (variant) => variant.label_category_id as string
                  )}
                  additionalOptions={labelCategoriesAdditionalOptions}
                />

                {Boolean(product?.inventory_by_variant?.length) && (
                  <Divider
                    style={{
                      marginTop: '2rem',
                      marginBottom: '0.15rem',
                    }}
                  />
                )}

                {Boolean(product?.inventory_by_variant?.length) && (
                  <Box className="flex flex-col w-full">
                    <Box className="flex flex-col w-full">
                      {product?.inventory_by_variant?.map((variant, index) => (
                        <Box
                          key={index}
                          className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-start md:items-center justify-between max-w-[40rem] py-3 gap-x-4"
                        >
                          <Box
                            className={classNames(
                              'flex items-center space-x-2',
                              {
                                'mt-5': variant.label_category_id !== 'color',
                              }
                            )}
                          >
                            <Icon name="dotFill" size="1.15rem" />

                            <Text className="text-base">
                              {getVariantLabel(
                                variant.label_category_id as string
                              )}
                            </Text>
                          </Box>

                          <Box className="flex items-center space-x-10">
                            <Box className="flex items-center space-x-2 w-[20rem]">
                              {variant.label_category_id === 'color' ? (
                                <Box className="flex items-center gap-x-2">
                                  {!(variant.label_ids || []).length && (
                                    <Text className="whitespace-nowrap text-sm">
                                      {t('no_colors_added')}
                                    </Text>
                                  )}

                                  <ColorSelector
                                    colors={variant.label_ids || []}
                                    handleChange={(value) =>
                                      handleChange(
                                        `inventory_by_variant.${index}.label_ids` as keyof Product,
                                        value
                                      )
                                    }
                                    addColor={() =>
                                      handleChange(
                                        `inventory_by_variant.${index}.label_ids` as keyof Product,
                                        [
                                          ...(variant.label_ids || []),
                                          accentColor,
                                        ]
                                      )
                                    }
                                    images={currentImages}
                                  />
                                </Box>
                              ) : (
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
                                  onCreatedLabel={(labelId) =>
                                    handleChange(
                                      `inventory_by_variant.${index}.label_ids` as keyof Product,
                                      [...(variant.label_ids || []), labelId]
                                    )
                                  }
                                  onClear={() =>
                                    handleChange(
                                      `inventory_by_variant.${index}.label_ids` as keyof Product,
                                      []
                                    )
                                  }
                                  withActionButton
                                  withoutOptionalText
                                  labelCategoryId={variant.label_category_id}
                                  withoutLabelCategorySelectorRefreshData
                                  disableLabelCategorySelector
                                />
                              )}
                            </Box>

                            <Box
                              className={classNames(
                                'cursor-pointer hover:opacity-75',
                                {
                                  'mt-5': variant.label_category_id !== 'color',
                                }
                              )}
                              onClick={() => handleRemoveVariant(index)}
                            >
                              <Icon name="delete" size="1.6rem" />
                            </Box>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {Boolean(product?.quantity_by_variant?.length) && (
                      <Divider
                        style={{
                          marginTop: '1.25rem',
                          marginBottom: '1.25rem',
                        }}
                      />
                    )}

                    {Boolean(product?.quantity_by_variant?.length) && (
                      <Box className="flex flex-col space-y-4 w-full">
                        <Text className="font-medium text-lg">
                          {t('quantity_by_variants')}
                        </Text>

                        <Box className="flex flex-col space-y-4">
                          {product?.quantity_by_variant?.map(
                            (combination, index) => (
                              <Box
                                key={index}
                                className="border overflow-hidden rounded-t-lg"
                                style={{
                                  borderColor: colors.$1,
                                }}
                              >
                                <Box
                                  className="px-4 py-3 border-b"
                                  style={{
                                    borderColor: colors.$1,
                                  }}
                                >
                                  <Box className="flex items-center flex-wrap gap-2">
                                    {combination.label_ids?.map(
                                      (
                                        currentLabelId,
                                        combinationLabelIndex
                                      ) => {
                                        const isColor =
                                          colorString.get.rgb(
                                            currentLabelId
                                          ) !== null;

                                        if (isColor) {
                                          return (
                                            <Box
                                              key={combinationLabelIndex}
                                              className="flex items-center gap-1"
                                            >
                                              {combinationLabelIndex > 0 && (
                                                <Box>
                                                  <Icon
                                                    name="dotFill"
                                                    size="1rem"
                                                  />
                                                </Box>
                                              )}

                                              <Box
                                                className="rounded-full shadow-sm p-2"
                                                style={{
                                                  width: '1.4rem',
                                                  height: '1.4rem',
                                                  backgroundColor:
                                                    currentLabelId,
                                                }}
                                              />
                                            </Box>
                                          );
                                        }

                                        return (
                                          <Box
                                            key={combinationLabelIndex}
                                            className="flex items-center gap-x-2"
                                          >
                                            {combinationLabelIndex > 0 && (
                                              <Box>
                                                <Icon
                                                  name="dotFill"
                                                  size="1rem"
                                                />
                                              </Box>
                                            )}

                                            <Box
                                              className="px-2 py-1 rounded-md text-sm font-medium"
                                              style={{
                                                backgroundColor: colors.$1,
                                              }}
                                            >
                                              {getLabelNameByLabelId(
                                                currentLabelId
                                              )}
                                            </Box>
                                          </Box>
                                        );
                                      }
                                    )}
                                  </Box>
                                </Box>

                                <Box
                                  className="p-4"
                                  style={{ backgroundColor: colors.$36 }}
                                >
                                  <Box className="grid grid-cols-1 md:grid-cols-3 items-end gap-4">
                                    <Box className="flex flex-col space-y-1">
                                      <Box className="flex items-center space-x-2">
                                        <Label>{t('unlimited_quantity')}</Label>
                                        <Toggle
                                          checked={combination.unlimited}
                                          onChange={(value) => {
                                            if (value) {
                                              const updatedCombinations =
                                                cloneDeep(
                                                  product?.quantity_by_variant
                                                ) as QuantityByVariant[];
                                              set(
                                                updatedCombinations,
                                                `${index}.unlimited`,
                                                true
                                              );
                                              set(
                                                updatedCombinations,
                                                `${index}.quantity`,
                                                0
                                              );
                                              handleChange(
                                                'quantity_by_variant',
                                                updatedCombinations
                                              );
                                            } else {
                                              handleCombinationChange(
                                                index,
                                                'unlimited',
                                                false
                                              );
                                            }
                                          }}
                                        />
                                      </Box>

                                      <NumberField
                                        label={t('quantity')}
                                        placeHolder={t('enter_quantity')}
                                        value={combination.quantity}
                                        onValueChange={(value) =>
                                          handleCombinationChange(
                                            index,
                                            'quantity',
                                            parseFloat(String(value || '0'))
                                          )
                                        }
                                        min={0}
                                        disabled={combination.unlimited}
                                        disablePlaceholderValue={
                                          disablingNumberFieldSymbol
                                        }
                                        withoutOptionalText
                                      />
                                    </Box>

                                    <NumberField
                                      required
                                      label={t('price')}
                                      placeHolder={t('enter_price')}
                                      value={combination.price}
                                      onValueChange={(value) =>
                                        handleCombinationChange(
                                          index,
                                          'price',
                                          parseFloat(String(value || '0'))
                                        )
                                      }
                                      addonAfter={currencySymbol}
                                      min={0}
                                    />

                                    <DimensionsModal
                                      product={product}
                                      selectedCombinationIndex={index}
                                      setProduct={setProduct}
                                    />
                                  </Box>
                                </Box>
                              </Box>
                            )
                          )}
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}

                {!product?.inventory_by_variant?.length && (
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
  );
};

export default InventoryCard;
