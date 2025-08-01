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

import colorString from 'color-string';
import { cloneDeep, get, set } from 'lodash';

import {
  LabelCategory,
  Product,
  QuantityByVariant,
  ValidationErrors,
} from '@interfaces/index';

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
  SuppliersSelector,
  Text,
  Toggle,
} from '@components/index';

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
import useInventoryGroupOptions from '../hooks/useInventoryGroupOptions';
import useLabelCategoriesAdditionalOptions from '../hooks/useLabelCategoriesAdditionalOptions';

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
      | Product['quantity_by_variant']
  ) => void;
  images?: string[];
  quantityByVariants: QuantityByVariant[];
  setQuantityByVariants: Dispatch<SetStateAction<QuantityByVariant[]>>;
};

const InventoryCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  handleChange,
  images,
  quantityByVariants,
  setQuantityByVariants,
}: Props) => {
  const t = useTranslation();

  const hasPermission = useHasPermission();

  const { getLabelNameByLabelId, isLoadingLabels } = useFindLabel();

  const colors = useColors();
  const accentColor = useAccentColor();
  const { currencySymbol } = useSymbols();
  const inventoryGroupOptions = useInventoryGroupOptions();
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
    const updatedCombinations = cloneDeep(quantityByVariants);

    set(updatedCombinations, `${index}.${field}`, value);

    setQuantityByVariants(updatedCombinations);

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
              disablePlaceholderValue={disablingNumberFieldSymbol}
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
              addonAfter={currencySymbol}
              errorMessage={
                errors?.['price_by_item'] && t(errors['price_by_item'])
              }
            />
          </>
        )}

        {product?.inventory_group === 'variant' && (
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
                  onChange={(value) => handleAddVariant(value?.[0])}
                  onCreatedLabelCategory={(labelCategoryId) =>
                    handleAddVariant(labelCategoryId)
                  }
                  withActionButton
                  exclude={product?.inventory_by_variant?.map(
                    (variant) => variant.label_category_id as string
                  )}
                  additionalOptions={labelCategoriesAdditionalOptions}
                />

                {Boolean(product.inventory_by_variant.length) && (
                  <Divider
                    style={{
                      marginTop: '2rem',
                      marginBottom: '0.15rem',
                    }}
                  />
                )}

                {Boolean(product.inventory_by_variant.length) && (
                  <Box className="flex flex-col w-full">
                    <Box className="flex flex-col w-full">
                      {product.inventory_by_variant.map((variant, index) => (
                        <Box
                          key={index}
                          className="flex flex-col space-y-2 md:space-y-0 md:flex-row items-start md:items-center justify-between max-w-[40rem] py-3 gap-x-4"
                        >
                          <Box className="flex items-center space-x-2">
                            <Icon name="dotFill" size="1.15rem" />

                            <Text className="text-base">
                              {getVariantLabel(
                                variant.label_category_id as string
                              )}
                            </Text>
                          </Box>

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
                                  images={images}
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
                                withActionButton
                                withoutOptionalText
                                labelCategoryId={variant.label_category_id}
                                withoutLabelCategorySelectorRefreshData
                                disableLabelCategorySelector
                              />
                            )}
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    {Boolean(quantityByVariants.length) && (
                      <Divider
                        style={{
                          marginTop: '1.25rem',
                          marginBottom: '1.25rem',
                        }}
                      />
                    )}

                    {Boolean(quantityByVariants.length) && (
                      <Box className="flex flex-col space-y-4 w-full">
                        <Text className="font-medium text-lg">
                          {t('quantity_by_variants')}
                        </Text>

                        <Box className="flex flex-col space-y-4">
                          {quantityByVariants.map((combination, index) => (
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
                                  {combination.labels.map(
                                    (label, combinationLabelIndex) => {
                                      const isColor =
                                        colorString.get.rgb(label.labelId) !==
                                        null;

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
                                                backgroundColor: label.labelId,
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
                                              label.labelId
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
                                <Box className="grid grid-cols-1 md:grid-cols-4 items-end gap-4">
                                  <Box className="flex flex-col space-y-1">
                                    <Box className="flex items-center space-x-2">
                                      <Label>{t('unlimited_quantity')}</Label>
                                      <Toggle
                                        checked={combination.unlimited}
                                        onChange={(value) => {
                                          if (value) {
                                            const updatedCombinations =
                                              cloneDeep(quantityByVariants);
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
                                            setQuantityByVariants(
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
                                          value
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
                                        value
                                      )
                                    }
                                    addonAfter={currencySymbol}
                                    min={0}
                                  />

                                  <DimensionsModal
                                    selectedCombinationIndex={index}
                                    setQuantityByVariants={
                                      setQuantityByVariants
                                    }
                                    quantityByVariants={quantityByVariants}
                                  />

                                  <SuppliersSelector
                                    mode="single"
                                    label={t('supplier')}
                                    placeholder={t('select_supplier')}
                                    value={
                                      combination.supplier_id
                                        ? [combination.supplier_id]
                                        : []
                                    }
                                    onChange={(value) =>
                                      handleCombinationChange(
                                        index,
                                        'supplier_id',
                                        value as string
                                      )
                                    }
                                    onClear={() =>
                                      handleCombinationChange(
                                        index,
                                        'supplier_id',
                                        ''
                                      )
                                    }
                                    withActionButton
                                    errorMessage={
                                      errors?.supplier_id &&
                                      t(errors.supplier_id)
                                    }
                                  />
                                </Box>
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
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
  );
};

export default InventoryCard;
