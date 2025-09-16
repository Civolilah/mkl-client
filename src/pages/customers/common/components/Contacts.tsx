/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { BLANK_CUSTOMER_CONTACT } from '@constants/index';
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

import { CustomerProps } from './CustomerForm';
import useHandleChange from '../hooks/useHandleChange';

const Contacts = ({
  customer,
  isLoading,
  errors,
  setCustomer,
  editPage,
}: CustomerProps) => {
  const t = useTranslation();

  const colors = useColors();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const handleChange = useHandleChange({ setCustomer });

  const isEnabledInvoicing = useEnableInvoicingFeature();

  const handleAddContact = () => {
    setCustomer(
      (prev) =>
        prev && {
          ...prev,
          contacts: [...(customer?.contacts || []), BLANK_CUSTOMER_CONTACT],
        }
    );

    setTimeout(() => {
      const contactElements = document.querySelectorAll(
        '[id^="customer_contact_phone_"]'
      );

      const lastContactElement = contactElements[contactElements.length - 1];
      lastContactElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 50);
  };

  const handleRemoveContact = (index: number) => {
    setCustomer(
      (prev) =>
        prev && {
          ...prev,
          contacts: prev.contacts.filter((_, i) => i !== index),
        }
    );
  };

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="phone" size="1.1rem" />
          </Box>

          <Text>{t('contacts')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
      topRight={
        <Button
          type="default"
          size="middle"
          onClick={handleAddContact}
          disablePreventAction
        >
          <Box>
            <Icon name="add" />
          </Box>

          <Text>{t('add_contact')}</Text>
        </Button>
      }
      heightAuto
    >
      <Box className="flex flex-col gap-6">
        {customer?.contacts.map((contact, index) => (
          <Box
            key={index}
            className={classNames('flex flex-col gap-y-4 pb-4', {
              'border-b border-dashed':
                customer?.contacts.length > 1 &&
                index !== customer?.contacts.length - 1,
            })}
            style={{ borderColor: colors.$1 }}
          >
            <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
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
            </Box>

            <Box className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4">
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
                id={`customer_contact_phone_${index}`}
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
            </Box>

            {isEnabledInvoicing && (
              <>
                <TextField
                  required={
                    contact.customer_portal_access && !contact.has_password
                  }
                  type="password"
                  label={
                    editPage && contact.has_password
                      ? t('new_password')
                      : t('password')
                  }
                  placeHolder={t('password_placeholder')}
                  value={contact.password || ''}
                  onValueChange={(value) => {
                    handleChange(`contacts.${index}.password`, value);

                    if (value && !contact.customer_portal_access) {
                      handleChange(
                        `contacts.${index}.customer_portal_access`,
                        true
                      );
                    }
                  }}
                  changeOnBlur
                  errorMessage={
                    get(errors, `contacts.${index}.password`) &&
                    t(get(errors, `contacts.${index}.password`))
                  }
                />

                <Toggle
                  label={t('add_to_invoice')}
                  checked={Boolean(contact.add_to_invoice)}
                  onChange={(value) =>
                    handleChange(`contacts.${index}.add_to_invoice`, value)
                  }
                  afterLabel={
                    <Box className="pl-1.5">
                      <InformationLabel
                        text={t('add_to_invoice_helper')}
                        onlyTooltip
                        tooltipOverlayInnerStyle={{
                          width: isSmallScreen ? undefined : '22rem',
                          textAlign: 'center',
                        }}
                        iconSize="1.35rem"
                      />
                    </Box>
                  }
                />

                <Toggle
                  label={t('customer_portal_access')}
                  checked={Boolean(contact.customer_portal_access)}
                  onChange={(value) =>
                    handleChange(
                      `contacts.${index}.customer_portal_access`,
                      value
                    )
                  }
                  afterLabel={
                    <Box className="pl-1.5">
                      <InformationLabel
                        text={t('customer_portal_access_helper')}
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
              disablePreventAction
            >
              <Box>
                <Icon name="delete" />
              </Box>

              <Text>{t('remove')}</Text>
            </Button>
          </Box>
        ))}

        {customer?.contacts.length === 0 && (
          <Text className="self-center pt-4 font-medium">
            {t('no_contacts_added')}
          </Text>
        )}
      </Box>
    </Card>
  );
};

export default Contacts;
