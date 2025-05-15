/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import classNames from 'classnames';
import { cloneDeep, get } from 'lodash';

import { Product, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Button,
  Card,
  ColorPicker,
  Icon,
  InformationLabel,
  Label,
  NumberField,
  RefreshDataElement,
  SelectDataField,
  SelectStaticField,
  Text,
  TextField,
  Toggle,
} from '@components/index';

import { useAccentColor, useHasPermission, useTranslation } from '@hooks/index';

import useBlankQuantityByGroup from '../hooks/useBlankQuantityByGroup';
import useQuantityGroupOptions, {
  QuantityGroup,
} from '../hooks/useQuantityGroupOptions';

export type ProductProps = {
  product: Product | undefined;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  handleChange: (
    field: keyof Product,
    value: string | number | boolean | Product['quantity_by_group'] | string[]
  ) => void;
};

const Details = (props: ProductProps) => {
  const t = useTranslation();

  const { product, errors, editPage, isLoading, onRefresh, handleChange } =
    props;

  const accentColor = useAccentColor();
  const blankQuantityByGroup = useBlankQuantityByGroup();
  const quantityGroupOptions = useQuantityGroupOptions();

  const hasPermission = useHasPermission();

  const addBlankQuantityByGroup = (
    quantityGroup: QuantityGroup,
    quantityColorSubGroup?: boolean,
    quantityColorSubGroupIndex?: number
  ) => {
    if (
      product &&
      quantityColorSubGroup &&
      typeof quantityColorSubGroupIndex === 'number'
    ) {
      const updatedQuantityByGroupSub = cloneDeep([
        ...(product?.quantity_by_group[quantityColorSubGroupIndex]
          .quantity_by_color || []),
        { color: accentColor, quantity: 0 },
      ]);

      handleChange(
        `quantity_by_group.${quantityColorSubGroupIndex}.quantity_by_color` as keyof Product,
        updatedQuantityByGroupSub
      );

      return;
    }

    const updatedQuantityByGroup = cloneDeep([
      ...(product?.quantity_by_group || []),
      ...blankQuantityByGroup[quantityGroup],
    ]);

    handleChange('quantity_by_group', updatedQuantityByGroup);
  };

  const deleteQuantityByGroup = (index: number) => {
    const updatedQuantityByGroup = product?.quantity_by_group?.filter(
      (_, i) => i !== index
    );

    handleChange('quantity_by_group', updatedQuantityByGroup || []);
  };

  const deleteQuantityByColor = (
    quantityByColorIndex: number,
    quantityByGroupIndex: number
  ) => {
    const updatedQuantityByColor = product?.quantity_by_group[
      quantityByGroupIndex
    ]?.quantity_by_color?.filter((_, i) => i !== quantityByColorIndex);

    handleChange(
      `quantity_by_group.${quantityByGroupIndex}.quantity_by_color` as keyof Product,
      updatedQuantityByColor || []
    );
  };

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
        <Box className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <Box className="w-full md:w-3/5">
            <TextField
              required
              label={t('name')}
              placeHolder={t('product_name_placeholder')}
              value={product?.name || ''}
              onValueChange={(value) => handleChange('name', value)}
              changeOnBlur
              errorMessage={errors?.name && t(errors.name)}
            />
          </Box>

          <Box className="w-full md:w-2/5">
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
          </Box>
        </Box>

        <TextField
          maxLength={500}
          label={t('product_key')}
          placeHolder={t('product_key_placeholder')}
          value={product?.product_key || ''}
          onValueChange={(value) => handleChange('product_key', value)}
          changeOnBlur
          errorMessage={errors?.product_key && t(errors.product_key)}
        />

        <SelectStaticField
          mode="single"
          required
          label={t('group_quantity_by')}
          options={quantityGroupOptions}
          value={product?.quantity_group ? [product?.quantity_group] : []}
          onChange={(value) => {
            handleChange('quantity_group', value as string);

            setTimeout(() => {
              if (value !== 'default') {
                handleChange(
                  'quantity_by_group',
                  blankQuantityByGroup[
                    value as keyof typeof blankQuantityByGroup
                  ]
                );
              } else {
                handleChange('quantity_by_group', []);
              }
            }, 50);
          }}
        />

        {product?.quantity_group === 'default' && (
          <NumberField
            required
            min={0}
            label={t('quantity')}
            value={get(product, 'quantity_by_group.0.quantity', 0)}
            onValueChange={(value) =>
              handleChange(
                'quantity_by_group.0.quantity' as keyof Product,
                value
              )
            }
            errorMessage={
              errors?.['quantity_by_group.0.quantity'] &&
              t(errors['quantity_by_group.0.quantity'])
            }
          />
        )}

        {product?.quantity_group === 'color' && (
          <Box className="flex flex-col space-y-4 w-full">
            {!product.quantity_by_group.length && (
              <Text className="text-sm text-center">
                {t('no_quantity_records')}
              </Text>
            )}

            {product?.quantity_by_group?.map((item, index) => (
              <Box
                key={index}
                className="flex items-center justify-between space-x-6 w-full"
              >
                <ColorPicker
                  required
                  className="w-full"
                  label={t('color')}
                  value={item.color || ''}
                  onValueChange={(value) =>
                    handleChange(
                      `quantity_by_group.${index}.color` as keyof Product,
                      value
                    )
                  }
                  productQuantityPreview
                  withoutOptionalText
                  errorMessage={
                    errors?.[`quantity_by_group.${index}.color`] &&
                    t(errors[`quantity_by_group.${index}.color`])
                  }
                />

                <Box
                  className={classNames('flex items-center w-1/2', {
                    'space-x-5': product?.quantity_by_group.length > 1,
                  })}
                >
                  <NumberField
                    required
                    min={0}
                    label={t('quantity')}
                    value={item.quantity || 0}
                    onValueChange={(value) =>
                      handleChange(
                        `quantity_by_group.${index}.quantity` as keyof Product,
                        value
                      )
                    }
                    withoutOptionalText
                    errorMessage={
                      errors?.[`quantity_by_group.${index}.quantity`] &&
                      t(errors[`quantity_by_group.${index}.quantity`])
                    }
                  />

                  {product?.quantity_by_group.length > 1 && (
                    <Box
                      className="flex items-center cursor-pointer hover:opacity-75"
                      onClick={() => deleteQuantityByGroup(index)}
                      style={{ marginTop: '1.35rem' }}
                    >
                      <Icon
                        name="delete"
                        className="text-red-500"
                        size="1.35rem"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            ))}

            <Button
              type="primary"
              onClick={() => addBlankQuantityByGroup('color')}
            >
              {t('add_quantity')}
            </Button>
          </Box>
        )}

        {product?.quantity_group === 'labels' && (
          <Box className="flex flex-col space-y-4 w-full">
            {!product.quantity_by_group.length && (
              <Text className="text-sm text-center">
                {t('no_quantity_records')}
              </Text>
            )}

            {product?.quantity_by_group?.map((item, index) => (
              <Box
                key={index}
                className="flex items-center justify-between space-x-6 w-full"
              >
                <Box className="w-5/12">
                  <SelectDataField
                    required
                    label={t('labels')}
                    placeholder={t('select_labels')}
                    valueKey="id"
                    labelKey="name"
                    endpoint="/api/labels?selector=true"
                    maxTagTextLength={20}
                    maxTagCount={1}
                    enableByPermission={
                      hasPermission('create_label') ||
                      hasPermission('view_label') ||
                      hasPermission('edit_label')
                    }
                    formatLabel={(label) =>
                      `${label.name} (${label.label_category?.name})`
                    }
                    withoutRefreshData
                    value={item.label_ids ? item.label_ids : []}
                    onChange={(value) =>
                      handleChange(
                        `quantity_by_group.${index}.label_ids` as keyof Product,
                        value
                      )
                    }
                    onClear={() =>
                      handleChange(
                        `quantity_by_group.${index}.label_ids` as keyof Product,
                        []
                      )
                    }
                    errorMessage={
                      errors?.[`quantity_by_group.${index}.label_ids`] &&
                      t(errors[`quantity_by_group.${index}.label_ids`])
                    }
                  />
                </Box>

                <Box
                  className={classNames('flex items-center w-1/2', {
                    'space-x-5': product?.quantity_by_group.length > 1,
                  })}
                >
                  <NumberField
                    min={0}
                    required
                    label={t('quantity')}
                    value={item.quantity || 0}
                    onValueChange={(value) =>
                      handleChange(
                        `quantity_by_group.${index}.quantity` as keyof Product,
                        value
                      )
                    }
                    withoutOptionalText
                    errorMessage={
                      errors?.[`quantity_by_group.${index}.quantity`] &&
                      t(errors[`quantity_by_group.${index}.quantity`])
                    }
                  />

                  {product?.quantity_by_group.length > 1 && (
                    <Box
                      className="flex items-center cursor-pointer hover:opacity-75"
                      onClick={() => deleteQuantityByGroup(index)}
                      style={{ marginTop: '1.35rem' }}
                    >
                      <Icon
                        name="delete"
                        className="text-red-500"
                        size="1.35rem"
                      />
                    </Box>
                  )}
                </Box>
              </Box>
            ))}

            <Button
              type="primary"
              onClick={() => addBlankQuantityByGroup('labels')}
            >
              {t('add_quantity')}
            </Button>
          </Box>
        )}

        {product?.quantity_group === 'labels_and_color' && (
          <Box className="flex flex-col space-y-4 w-full">
            {!product.quantity_by_group.length && (
              <Text className="text-sm text-center">
                {t('no_quantity_records')}
              </Text>
            )}

            {product?.quantity_by_group?.map((item, index) => (
              <Box
                key={index}
                className={classNames(
                  'flex items-center justify-between space-x-6 w-full',
                  {
                    'space-x-6': product?.quantity_by_group.length > 1,
                  }
                )}
              >
                <Box className="w-5/12">
                  <SelectDataField
                    required
                    label={t('labels')}
                    placeholder={t('select_labels')}
                    valueKey="id"
                    labelKey="name"
                    endpoint="/api/labels?selector=true"
                    maxTagTextLength={10}
                    maxTagCount={1}
                    formatLabel={(label) =>
                      `${label.name} (${label.label_category?.name})`
                    }
                    enableByPermission={
                      hasPermission('create_label') ||
                      hasPermission('view_label') ||
                      hasPermission('edit_label')
                    }
                    withoutRefreshData
                    value={item.label_ids ? item.label_ids : []}
                    onChange={(value) =>
                      handleChange(
                        `quantity_by_group.${index}.label_ids` as keyof Product,
                        value
                      )
                    }
                    onClear={() =>
                      handleChange(
                        `quantity_by_group.${index}.label_ids` as keyof Product,
                        []
                      )
                    }
                    errorMessage={
                      errors?.[`quantity_by_group.${index}.label_ids`] &&
                      t(errors[`quantity_by_group.${index}.label_ids`])
                    }
                  />
                </Box>

                <Box className="flex items-center space-x-5 w-7/12">
                  <Box className="flex flex-col items-center space-y-4 flex-1">
                    {!item.quantity_by_color?.length && (
                      <Text className="text-sm text-center">
                        {t('no_quantity_records')}
                      </Text>
                    )}

                    {item.quantity_by_color?.map(
                      (quantityByColor, quantityByColorIndex) => (
                        <Box
                          key={quantityByColorIndex}
                          className="flex items-center space-x-4 w-full justify-between"
                        >
                          <ColorPicker
                            required
                            label={t('color')}
                            value={quantityByColor.color}
                            onValueChange={(value) =>
                              handleChange(
                                `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.color` as keyof Product,
                                value
                              )
                            }
                            productQuantityPreview
                            errorMessage={
                              errors?.[
                                `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.color`
                              ] &&
                              t(
                                errors[
                                  `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.color`
                                ]
                              )
                            }
                          />

                          <Box
                            className={classNames(
                              'flex items-center space-x-5 flex-1',
                              {
                                'space-x-5':
                                  (item.quantity_by_color?.length || 0) > 1,
                              }
                            )}
                          >
                            <Box className="flex-1">
                              <NumberField
                                required
                                min={0}
                                label={t('quantity')}
                                value={quantityByColor.quantity || 0}
                                onValueChange={(value) =>
                                  handleChange(
                                    `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.quantity` as keyof Product,
                                    value
                                  )
                                }
                                withoutOptionalText
                                errorMessage={
                                  errors?.[
                                    `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.quantity`
                                  ] &&
                                  t(
                                    errors[
                                      `quantity_by_group.${index}.quantity_by_color.${quantityByColorIndex}.quantity`
                                    ]
                                  )
                                }
                              />
                            </Box>

                            {(item.quantity_by_color?.length || 0) > 1 && (
                              <Box
                                className="flex items-center space-x-5 cursor-pointer hover:opacity-75"
                                style={{ marginTop: '1.35rem' }}
                                onClick={() =>
                                  deleteQuantityByColor(
                                    quantityByColorIndex,
                                    index
                                  )
                                }
                              >
                                <Icon name="close" size="1.35rem" />
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )
                    )}

                    <Button
                      className="w-full"
                      type="primary"
                      onClick={() =>
                        addBlankQuantityByGroup('labels_and_color', true, index)
                      }
                    >
                      {t('add_color_quantity')}
                    </Button>
                  </Box>
                </Box>

                {product?.quantity_by_group.length > 1 && (
                  <Box
                    className="flex items-center cursor-pointer hover:opacity-75"
                    onClick={() => deleteQuantityByGroup(index)}
                    style={{ marginTop: '1.35rem' }}
                  >
                    <Icon name="delete" size="1.35rem" />
                  </Box>
                )}
              </Box>
            ))}

            <Button
              type="primary"
              onClick={() => addBlankQuantityByGroup('labels_and_color')}
            >
              {t('add_quantity')}
            </Button>
          </Box>
        )}

        <SelectDataField
          mode="single"
          label={t('brand')}
          placeholder={t('select_brand')}
          valueKey="id"
          labelKey="name"
          endpoint="/api/brands?selector=true"
          enableByPermission={
            hasPermission('create_brand') ||
            hasPermission('view_brand') ||
            hasPermission('edit_brand')
          }
          withoutRefreshData
          value={product?.brand_id ? [product?.brand_id] : []}
          onChange={(value) => handleChange('brand_id', value as string)}
          onClear={() => handleChange('brand_id', '')}
          errorMessage={errors?.brand_id && t(errors.brand_id)}
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

        <Box className="flex flex-col space-y-2 w-full">
          <SelectDataField
            label={t('subsidiaries')}
            placeholder={t('select_subsidiaries')}
            valueKey="id"
            labelKey="name"
            endpoint="/api/subsidiaries?selector=true"
            enableByPermission={
              hasPermission('create_subsidiary') ||
              hasPermission('view_subsidiary') ||
              hasPermission('edit_subsidiary')
            }
            withoutRefreshData
            value={product?.subsidiaries ? product?.subsidiaries : []}
            onChange={(value) => handleChange('subsidiaries', value as string)}
            onClear={() => handleChange('subsidiaries', '')}
            errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
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

        <TextField
          type="textarea"
          label={t('description')}
          placeHolder={t('product_notes')}
          value={product?.description || ''}
          onValueChange={(value) => handleChange('description', value)}
          maxLength={2000}
        />

        <Box className="flex flex-col space-y-2 w-full">
          <Label>{t('images')}</Label>

          {editPage ? (
            <>Uploader</>
          ) : (
            <Text className="text-sm">{t('save_product_to_add_images')}</Text>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
