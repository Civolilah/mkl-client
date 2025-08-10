/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction } from 'react';

import { BLANK_SUPPLIER_CONTACT } from '@constants/index';
import classNames from 'classnames';
import { get } from 'lodash';

import { Supplier, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Button,
  Card,
  CurrenciesSelector,
  Icon,
  RefreshDataElement,
  Text,
  TextField,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';

type Props = {
  supplier: Supplier | undefined;
  setSupplier: Dispatch<SetStateAction<Supplier | undefined>>;
  errors: ValidationErrors;
  editPage?: boolean;
  isLoading?: boolean;
  onRefresh?: () => void;
  onlyFields?: boolean;
};

const SupplierForm = ({
  supplier,
  setSupplier,
  errors,
  editPage,
  isLoading,
  onRefresh,
  onlyFields,
}: Props) => {
  const t = useTranslation();

  const colors = useColors();

  const handleChange = useHandleChange({ setSupplier });

  const handleAddContact = () => {
    setSupplier(
      (prev) =>
        prev && {
          ...prev,
          contacts: [...(supplier?.contacts || []), BLANK_SUPPLIER_CONTACT],
        }
    );

    setTimeout(() => {
      const contactElements = document.querySelectorAll(
        '[id^="supplier_contact_first_name_"]'
      );

      if (contactElements.length > 1) {
        const lastContactElement = contactElements[contactElements.length - 1];
        lastContactElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }, 50);
  };

  const handleRemoveContact = (index: number) => {
    setSupplier(
      (prev) =>
        prev && {
          ...prev,
          contacts: prev.contacts.filter((_, i) => i !== index),
        }
    );
  };

  if (onlyFields) {
    return (
      <>
        <TextField
          required
          label={t('name')}
          placeHolder={t('supplier_name_placeholder')}
          value={supplier?.name || ''}
          onValueChange={(value) => handleChange('name', value)}
          changeOnBlur
          errorMessage={errors?.name && t(errors.name)}
        />
      </>
    );
  }

  return (
    <Box className="flex flex-col xl:flex-row self-start gap-6 w-full md:w-3/4 xl:w-full">
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
        <Box className="flex flex-col gap-y-4">
          <TextField
            required
            label={t('name')}
            placeHolder={t('supplier_name_placeholder')}
            value={supplier?.name || ''}
            onValueChange={(value) => handleChange('name', value)}
            changeOnBlur
            errorMessage={errors?.name && t(errors.name)}
          />

          <CurrenciesSelector
            label={t('currency')}
            placeholder={t('select_currency')}
            value={supplier?.currency_id || ''}
            onChange={(value) => handleChange('currency_id', value)}
            errorMessage={errors?.currency_id && t(errors.currency_id)}
          />
        </Box>
      </Card>

      <Card
        title={t('contacts')}
        className="w-full"
        isLoading={isLoading}
        topRight={
          <Button type="default" size="middle" onClick={handleAddContact}>
            <Box>
              <Icon name="add" />
            </Box>

            <Text>{t('add_contact')}</Text>
          </Button>
        }
      >
        <Box className="flex flex-col gap-6">
          {supplier?.contacts.map((contact, index) => (
            <Box
              key={index}
              className={classNames('flex flex-col gap-y-4 pb-4', {
                'border-b border-dashed':
                  supplier?.contacts.length > 1 &&
                  index !== supplier?.contacts.length - 1,
              })}
              style={{ borderColor: colors.$1 }}
            >
              <TextField
                id={`supplier_contact_first_name_${index}`}
                label={t('first_name')}
                placeHolder={t('supplier_contact_first_name_placeholder')}
                value={contact.first_name}
                onValueChange={(value) =>
                  handleChange(
                    `contacts.${index}.first_name` as keyof Supplier,
                    value
                  )
                }
                changeOnBlur
                errorMessage={
                  get(errors, `contacts.${index}.first_name`) &&
                  t(get(errors, `contacts.${index}.first_name`))
                }
                withoutOptionalText
              />

              <TextField
                label={t('last_name')}
                placeHolder={t('supplier_contact_last_name_placeholder')}
                value={contact.last_name}
                onValueChange={(value) =>
                  handleChange(
                    `contacts.${index}.last_name` as keyof Supplier,
                    value
                  )
                }
                changeOnBlur
                errorMessage={
                  get(errors, `contacts.${index}.last_name`) &&
                  t(get(errors, `contacts.${index}.last_name`))
                }
                withoutOptionalText
              />

              <TextField
                type="email"
                label={t('email')}
                placeHolder={t('supplier_contact_email_placeholder')}
                value={contact.email}
                onValueChange={(value) =>
                  handleChange(
                    `contacts.${index}.email` as keyof Supplier,
                    value
                  )
                }
                changeOnBlur
                errorMessage={
                  get(errors, `contacts.${index}.email`) &&
                  t(get(errors, `contacts.${index}.email`))
                }
                withoutOptionalText
              />

              <TextField
                type="tel"
                label={t('phone')}
                placeHolder={t('supplier_contact_phone_placeholder')}
                value={contact.phone}
                onValueChange={(value) =>
                  handleChange(
                    `contacts.${index}.phone` as keyof Supplier,
                    value
                  )
                }
                changeOnBlur
                errorMessage={
                  get(errors, `contacts.${index}.phone`) &&
                  t(get(errors, `contacts.${index}.phone`))
                }
                withoutOptionalText
              />

              <Button
                className="self-end"
                type="default"
                size="middle"
                onClick={() => handleRemoveContact(index)}
              >
                <Box>
                  <Icon name="delete" />
                </Box>

                <Text>{t('remove')}</Text>
              </Button>
            </Box>
          ))}

          {supplier?.contacts.length === 0 && (
            <Text className="self-center pt-4 font-medium">
              {t('no_contacts_added')}
            </Text>
          )}
        </Box>
      </Card>
    </Box>
  );
};

export default SupplierForm;
