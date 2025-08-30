/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { BLANK_SUPPLIER_CONTACT } from '@constants/index';
import classNames from 'classnames';
import { get } from 'lodash';
import { useMediaQuery } from 'react-responsive';

import {
  Box,
  Button,
  Card,
  Icon,
  InformationLabel,
  Text,
  TextField,
  Toggle,
} from '@components/index';

import {
  useColors,
  useEnableInvoicingFeature,
  useTranslation,
} from '@hooks/index';

import useHandleChange from '../hooks/useHandleChange';
import { SupplierProps } from '../hooks/useTabs';

const Contacts = ({
  supplier,
  isLoading,
  errors,
  setSupplier,
  editPage,
}: SupplierProps) => {
  const t = useTranslation();

  const colors = useColors();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = useHandleChange({ setSupplier });

  const isEnabledInvoicing = useEnableInvoicingFeature();

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
        '[id^="supplier_contact_phone_"]'
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

  return (
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
              required
              label={t('first_name')}
              placeHolder={t('first_name_placeholder')}
              value={contact.first_name}
              onValueChange={(value) =>
                handleChange(`contacts.${index}.first_name`, value)
              }
              changeOnBlur
              errorMessage={
                get(errors, `contacts.${index}.first_name`) &&
                t(get(errors, `contacts.${index}.first_name`))
              }
            />

            <TextField
              label={t('last_name')}
              placeHolder={t('last_name_placeholder')}
              value={contact.last_name}
              onValueChange={(value) =>
                handleChange(`contacts.${index}.last_name`, value)
              }
              changeOnBlur
              errorMessage={
                get(errors, `contacts.${index}.last_name`) &&
                t(get(errors, `contacts.${index}.last_name`))
              }
            />

            <TextField
              required
              type="email"
              label={t('email')}
              placeHolder={t('email_placeholder')}
              value={contact.email}
              onValueChange={(value) =>
                handleChange(`contacts.${index}.email`, value)
              }
              changeOnBlur
              errorMessage={
                get(errors, `contacts.${index}.email`) &&
                t(get(errors, `contacts.${index}.email`))
              }
            />

            <TextField
              id={`supplier_contact_phone_${index}`}
              type="tel"
              label={t('phone')}
              placeHolder={t('phone_placeholder')}
              value={contact.phone}
              onValueChange={(value) =>
                handleChange(`contacts.${index}.phone`, value)
              }
              changeOnBlur
              errorMessage={
                get(errors, `contacts.${index}.phone`) &&
                t(get(errors, `contacts.${index}.phone`))
              }
            />

            {isEnabledInvoicing && (
              <>
                <TextField
                  required={contact.supplier_portal_access && !editPage}
                  type="password"
                  label={
                    editPage && contact.has_password
                      ? t('new_password')
                      : t('password')
                  }
                  placeHolder={t('password_placeholder')}
                  value={contact.password || ''}
                  onValueChange={(value) =>
                    handleChange(`contacts.${index}.password`, value)
                  }
                  changeOnBlur
                  errorMessage={
                    get(errors, `contacts.${index}.password`) &&
                    t(get(errors, `contacts.${index}.password`))
                  }
                />

                <Toggle
                  label={t('send_email')}
                  checked={Boolean(contact.send_email)}
                  onChange={(value) =>
                    handleChange(`contacts.${index}.send_email`, value)
                  }
                />

                <Toggle
                  label={t('supplier_portal_access')}
                  checked={Boolean(contact.supplier_portal_access)}
                  onChange={(value) =>
                    handleChange(
                      `contacts.${index}.supplier_portal_access`,
                      value
                    )
                  }
                  afterLabel={
                    <Box className="pl-1.5">
                      <InformationLabel
                        text={t('supplier_portal_access_helper')}
                        onlyTooltip
                        tooltipOverlayInnerStyle={{
                          width: isSmallScreen ? undefined : '24rem',
                          textAlign: 'center',
                        }}
                        iconSize="1.35rem"
                      />
                    </Box>
                  }
                />
              </>
            )}

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
  );
};

export default Contacts;
