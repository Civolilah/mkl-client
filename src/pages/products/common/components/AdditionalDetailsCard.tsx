/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import colorString from 'color-string';

import {
  Product,
  QuantityByVariant,
  ValidationErrors,
} from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  InformationLabel,
  Label,
  NumberField,
  RefreshDataElement,
  Spinner,
  StatusesSelector,
  Text,
  Toggle,
} from '@components/index';

import { useColors, useFindLabel, useTranslation } from '@hooks/index';

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
  quantityByVariants: QuantityByVariant[];
};

const AdditionalDetailsCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  handleChange,
  quantityByVariants,
}: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const { getLabelNameByLabelId, isLoadingLabels } = useFindLabel();

  return (
    <Card
      title={t('status_details')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-2">
        <Box className="flex items-center space-x-10">
          <Label>{t('status_by_quantity')}</Label>

          <Toggle
            checked={Boolean(product?.is_status_by_quantity)}
            onChange={(value) => handleChange('is_status_by_quantity', value)}
          />
        </Box>

        {product?.is_status_by_quantity ? (
          <>
            {isLoadingLabels && (
              <Box className="flex items-center justify-center py-8">
                <Spinner />
              </Box>
            )}

            {!isLoadingLabels && (
              <>
                {quantityByVariants.length > 0 ? (
                  <Box className="flex flex-col space-y-4">
                    {quantityByVariants.map(
                      (combination, quantityByVariantIndex) => (
                        <Box
                          key={quantityByVariantIndex}
                          className="border overflow-hidden rounded-t-lg"
                          style={{
                            borderColor: colors.$1,
                          }}
                        >
                          <Box
                            className="px-3 md:px-4 py-2.5 md:py-3 border-b"
                            style={{
                              borderColor: colors.$1,
                            }}
                          >
                            <Box className="flex items-center flex-wrap gap-2">
                              {combination.label_ids.map(
                                (currentLabelId, combinationLabelIndex) => {
                                  const isColor =
                                    colorString.get.rgb(currentLabelId) !==
                                    null;

                                  if (isColor) {
                                    return (
                                      <Box
                                        key={combinationLabelIndex}
                                        className="flex items-center gap-1"
                                      >
                                        {combinationLabelIndex > 0 && (
                                          <Box>
                                            <Icon name="dotFill" size="1rem" />
                                          </Box>
                                        )}

                                        <Box
                                          className="rounded-full shadow-sm p-2"
                                          style={{
                                            width: '1.4rem',
                                            height: '1.4rem',
                                            backgroundColor: currentLabelId,
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
                                          <Icon name="dotFill" size="1rem" />
                                        </Box>
                                      )}

                                      <Box
                                        className="px-2 py-1 rounded-md text-sm font-medium"
                                        style={{
                                          backgroundColor: colors.$1,
                                        }}
                                      >
                                        {getLabelNameByLabelId(currentLabelId)}
                                      </Box>
                                    </Box>
                                  );
                                }
                              )}
                            </Box>
                          </Box>

                          <Box
                            className="px-3 pb-5 md:px-4 pt-3 md:pt-4 md:pb-4"
                            style={{ backgroundColor: colors.$36 }}
                          >
                            <Box className="grid grid-cols-1 md:grid-cols-3 items-end gap-4">
                              {combination.unlimited ? (
                                <Box className="flex flex-col h-full">
                                  <Label>{t('total_available')}</Label>

                                  <Box className="flex items-center justify-start text-sm h-full md:pt-1.5 font-medium truncate">
                                    {t('unlimited_quantity')}
                                  </Box>
                                </Box>
                              ) : (
                                <NumberField
                                  label={t('total_available')}
                                  value={combination.quantity}
                                  withoutOptionalText
                                  readOnly
                                />
                              )}

                              <NumberField
                                label={t('quantity_to_assign')}
                                placeHolder={t('enter_quantity')}
                                value={
                                  product?.status_by_quantity[
                                    quantityByVariantIndex
                                  ]?.quantity ?? 0
                                }
                                onValueChange={(value) =>
                                  handleChange(
                                    `status_by_quantity.${quantityByVariantIndex}.quantity` as keyof Product,
                                    value || 0
                                  )
                                }
                                withoutOptionalText
                                min={0}
                                max={
                                  combination.quantity
                                    ? combination.quantity
                                    : undefined
                                }
                                afterLabel={
                                  <InformationLabel
                                    text={t('quantity_to_assign_tooltip')}
                                    onlyTooltip
                                    iconSize="1.35rem"
                                  />
                                }
                                errorMessage={
                                  errors[
                                    `status_by_quantity.${quantityByVariantIndex}.quantity`
                                  ] &&
                                  t(
                                    errors[
                                      `status_by_quantity.${quantityByVariantIndex}.quantity`
                                    ]
                                  )
                                }
                              />

                              <StatusesSelector
                                mode="single"
                                label={t('status')}
                                placeholder={t('select_status')}
                                value={
                                  product?.status_by_quantity[
                                    quantityByVariantIndex
                                  ]?.status_id
                                    ? [
                                        product?.status_by_quantity[
                                          quantityByVariantIndex
                                        ]?.status_id,
                                      ]
                                    : []
                                }
                                onChange={(value) =>
                                  handleChange(
                                    `status_by_quantity.${quantityByVariantIndex}.status_id` as keyof Product,
                                    value as string
                                  )
                                }
                                onStatusCreated={(statusId) =>
                                  handleChange(
                                    `status_by_quantity.${quantityByVariantIndex}.status_id` as keyof Product,
                                    statusId
                                  )
                                }
                                onClear={() =>
                                  handleChange(
                                    `status_by_quantity.${quantityByVariantIndex}.status_id` as keyof Product,
                                    ''
                                  )
                                }
                                errorMessage={
                                  errors[
                                    `status_by_quantity.${quantityByVariantIndex}.status_id`
                                  ] &&
                                  t(
                                    errors[
                                      `status_by_quantity.${quantityByVariantIndex}.status_id`
                                    ]
                                  )
                                }
                                withActionButton
                              />
                            </Box>
                          </Box>
                        </Box>
                      )
                    )}
                  </Box>
                ) : (
                  <Text className="text-sm text-center pt-5">
                    {t('no_options_added')}
                  </Text>
                )}
              </>
            )}
          </>
        ) : (
          <StatusesSelector
            mode="single"
            label={t('status')}
            placeholder={t('select_status')}
            value={product?.status_id ? [product?.status_id] : []}
            onChange={(value) => handleChange('status_id', value as string)}
            onClear={() => handleChange('status_id', '')}
            onStatusCreated={(statusId) => handleChange('status_id', statusId)}
            errorMessage={errors?.status_id && t(errors.status_id)}
            withActionButton
          />
        )}
      </Box>
    </Card>
  );
};

export default AdditionalDetailsCard;
