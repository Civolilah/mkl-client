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

import {
  Box,
  Card,
  CustomersSelector,
  Icon,
  LabelElement,
  TaxRatesSelector,
  Text,
  Toggle,
} from '@components/index';

import { useColors, useFindCustomer, useTranslation } from '@hooks/index';

import { TaxRatesProps } from './TaxRatesCard';
import { TaxRatesType } from '../../TaxRates';
import useHandleChange from '../hooks/useHandleChange';

const InvoiceDefaultTaxesCard = ({
  taxRates,
  isLoading,
  isFetching,
  setTaxRates,
  initialResponse,
  isFormBusy,
}: TaxRatesProps) => {
  const t = useTranslation();

  const colors = useColors();

  const { findCustomerById } = useFindCustomer();

  const handleChange = useHandleChange({ setTaxRates });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="clipboardList" size="1.2rem" />
          </Box>

          <Text>{t('default_order_taxes')}</Text>
        </Box>
      }
      className="w-full"
      childrenParentClassName={classNames({
        'pb-0': Number(taxRates?.number_of_order_taxes || '0') === 0,
        'pb-6': Number(taxRates?.number_of_order_taxes || '0') > 0,
      })}
      isLoading={isLoading && !initialResponse}
    >
      {Number(taxRates?.number_of_order_taxes || '0') > 0 ? (
        <Box className="flex flex-col gap-y-4">
          <LabelElement
            label={t('uniform_tax_rates')}
            helpLabel={t('uniform_tax_rates_helper')}
            withoutOptionalText
            twoGridColumns
          >
            <Toggle
              checked={Boolean(taxRates?.uniform_customer_taxes)}
              onChange={(value) => {
                handleChange('uniform_customer_taxes', value);

                if (value) {
                  setTaxRates((currentTaxRates) => {
                    if (!currentTaxRates) return currentTaxRates;

                    return { ...currentTaxRates, taxes_by_customer: [] };
                  });
                }
              }}
              disabled={isFormBusy || isLoading || isFetching}
            />
          </LabelElement>

          {!taxRates?.uniform_customer_taxes ? (
            <Box className="flex flex-col gap-y-8">
              <CustomersSelector
                mode="multiple"
                label={t('customers')}
                placeholder={t('select_customers')}
                value={
                  taxRates?.taxes_by_customer?.map((tax) => tax.customer_id) ||
                  []
                }
                onChange={(value) => {
                  setTaxRates((currentTaxRates) => {
                    if (!currentTaxRates) return currentTaxRates;

                    const updatedTaxRates = cloneDeep(currentTaxRates);
                    const selectedCustomerIds = value as string[];

                    updatedTaxRates.taxes_by_customer = [
                      ...updatedTaxRates.taxes_by_customer.filter((tax) =>
                        selectedCustomerIds.includes(tax.customer_id)
                      ),
                      ...selectedCustomerIds
                        .filter(
                          (customerId) =>
                            !updatedTaxRates.taxes_by_customer.some(
                              (tax) => tax.customer_id === customerId
                            )
                        )
                        .map((customerId) => ({
                          customer_id: customerId,
                          tax1_id: '',
                          tax2_id: '',
                          tax3_id: '',
                        })),
                    ];

                    return updatedTaxRates;
                  });
                }}
                onClear={() =>
                  setTaxRates(
                    (currentTaxRates) =>
                      currentTaxRates && {
                        ...currentTaxRates,
                        taxes_by_customer: [],
                      }
                  )
                }
                withoutOptionalText
                disabled={isFormBusy || isLoading || isFetching}
              />

              {taxRates?.taxes_by_customer?.length === 0 && (
                <Box className="flex items-center justify-center">
                  <Text className="font-medium">
                    {t('no_customers_selected')}
                  </Text>
                </Box>
              )}

              {Boolean(taxRates?.taxes_by_customer?.length) && (
                <Box className="flex flex-col gap-y-6">
                  {taxRates?.taxes_by_customer?.map((tax, index) => (
                    <Box
                      key={tax.customer_id}
                      className={classNames(
                        'flex flex-col items-start gap-y-4 w-full last:border-b-0 border-b border-dashed pb-8 last:pb-0'
                      )}
                      style={{
                        borderColor: colors.$1,
                      }}
                    >
                      <Box className="flex items-center space-x-2">
                        <Icon name="dotFill" size="1.1rem" />

                        <Text className="text-base font-medium">
                          {t('customer')} -{' '}
                          {findCustomerById(tax.customer_id)?.name}
                        </Text>
                      </Box>

                      <Box className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4 w-full">
                        <TaxRatesSelector
                          label={t('tax_rate_1')}
                          placeholder={t('select_tax_rate')}
                          value={
                            get(taxRates, `taxes_by_customer.${index}.tax1_id`)
                              ? [
                                  get(
                                    taxRates,
                                    `taxes_by_customer.${index}.tax1_id`
                                  ),
                                ]
                              : []
                          }
                          onChange={(value) =>
                            handleChange(
                              `taxes_by_customer.${index}.tax1_id` as keyof TaxRatesType,
                              value as string
                            )
                          }
                          onClear={() =>
                            handleChange(
                              `taxes_by_customer.${index}.tax1_id` as keyof TaxRatesType,
                              ''
                            )
                          }
                          onCreatedTaxRate={(taxRateId) =>
                            handleChange(
                              `taxes_by_customer.${index}.tax1_id` as keyof TaxRatesType,
                              taxRateId
                            )
                          }
                          withActionButton
                          disabled={isFormBusy || isLoading || isFetching}
                        />

                        {Number(taxRates?.number_of_order_taxes || '0') > 1 && (
                          <TaxRatesSelector
                            label={t('tax_rate_2')}
                            placeholder={t('select_tax_rate')}
                            value={
                              get(
                                taxRates,
                                `taxes_by_customer.${index}.tax2_id`
                              )
                                ? [
                                    get(
                                      taxRates,
                                      `taxes_by_customer.${index}.tax2_id`
                                    ),
                                  ]
                                : []
                            }
                            onChange={(value) =>
                              handleChange(
                                `taxes_by_customer.${index}.tax2_id` as keyof TaxRatesType,
                                value as string
                              )
                            }
                            onClear={() =>
                              handleChange(
                                `taxes_by_customer.${index}.tax2_id` as keyof TaxRatesType,
                                ''
                              )
                            }
                            onCreatedTaxRate={(taxRateId) =>
                              handleChange(
                                `taxes_by_customer.${index}.tax2_id` as keyof TaxRatesType,
                                taxRateId
                              )
                            }
                            withActionButton
                            disabled={isFormBusy || isLoading || isFetching}
                          />
                        )}

                        {Number(taxRates?.number_of_order_taxes || '0') > 2 && (
                          <TaxRatesSelector
                            label={t('tax_rate_3')}
                            placeholder={t('select_tax_rate')}
                            value={
                              get(
                                taxRates,
                                `taxes_by_customer.${index}.tax3_id`
                              )
                                ? [
                                    get(
                                      taxRates,
                                      `taxes_by_customer.${index}.tax3_id`
                                    ),
                                  ]
                                : []
                            }
                            onChange={(value) =>
                              handleChange(
                                `taxes_by_customer.${index}.tax3_id` as keyof TaxRatesType,
                                value as string
                              )
                            }
                            onClear={() =>
                              handleChange(
                                `taxes_by_customer.${index}.tax3_id` as keyof TaxRatesType,
                                ''
                              )
                            }
                            onCreatedTaxRate={(taxRateId) =>
                              handleChange(
                                `taxes_by_customer.${index}.tax3_id` as keyof TaxRatesType,
                                taxRateId
                              )
                            }
                            withActionButton
                            disabled={isFormBusy || isLoading || isFetching}
                          />
                        )}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ) : (
            <Box className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 gap-x-4">
              <TaxRatesSelector
                label={t('tax_rate_1')}
                placeholder={t('select_tax_rate')}
                value={
                  taxRates?.default_invoice_tax1_id
                    ? [taxRates?.default_invoice_tax1_id]
                    : []
                }
                onChange={(value) =>
                  handleChange('default_invoice_tax1_id', value as string)
                }
                withActionButton
                disabled={isFormBusy || isLoading || isFetching}
              />

              {Number(taxRates?.number_of_order_taxes || '0') > 1 && (
                <TaxRatesSelector
                  label={t('tax_rate_2')}
                  placeholder={t('select_tax_rate')}
                  value={
                    taxRates?.default_invoice_tax2_id
                      ? [taxRates?.default_invoice_tax2_id]
                      : []
                  }
                  onChange={(value) =>
                    handleChange('default_invoice_tax2_id', value as string)
                  }
                  withActionButton
                  disabled={isFormBusy || isLoading || isFetching}
                />
              )}

              {Number(taxRates?.number_of_order_taxes || '0') > 2 && (
                <TaxRatesSelector
                  label={t('tax_rate_3')}
                  placeholder={t('select_tax_rate')}
                  value={
                    taxRates?.default_invoice_tax3_id
                      ? [taxRates?.default_invoice_tax3_id]
                      : []
                  }
                  onChange={(value) =>
                    handleChange('default_invoice_tax3_id', value as string)
                  }
                  withActionButton
                  disabled={isFormBusy || isLoading || isFetching}
                />
              )}
            </Box>
          )}
        </Box>
      ) : (
        <Box className="flex flex-col justify-center items-center pt-2">
          <Text className="font-medium">{t('no_invoice_taxes_enabled')}</Text>

          <Text className="text-xs" style={{ color: colors.$16 }}>
            {t('no_invoice_taxes_enabled_helper')}
          </Text>
        </Box>
      )}
    </Card>
  );
};

export default InvoiceDefaultTaxesCard;
