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

import classNames from 'classnames';
import { get } from 'lodash';

import { ValidationErrors } from '@interfaces/index';

import { IconName } from '@components/general/Icon';
import {
  Box,
  Card,
  CustomFieldTypesSelector,
  Icon,
  Text,
  TextField,
} from '@components/index';

import { useColors, useTranslation } from '@hooks/index';

import { CustomFieldsType } from '../../CustomFields';
import { useHandleChange } from '../hooks/useHandleChange';

export interface CustomFieldsCardsProps {
  customFields: CustomFieldsType | undefined;
  errors: ValidationErrors;
  isLoading: boolean;
  isFormBusy: boolean;
  setCustomFields: Dispatch<SetStateAction<CustomFieldsType | undefined>>;
  iconName: IconName;
  title: string;
  iconSize: string;
  entity: 'customer' | 'product' | 'purchase_order' | 'supplier' | 'order';
}

const CustomFieldsCard = ({
  customFields,
  errors,
  isLoading,
  isFormBusy,
  setCustomFields,
  iconName,
  title,
  iconSize,
  entity,
}: CustomFieldsCardsProps) => {
  const t = useTranslation();

  const colors = useColors();

  const handleChange = useHandleChange({ setCustomFields });

  return (
    <Card
      className="w-full"
      childrenParentClassName="pb-6"
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name={iconName} size={iconSize} />
          </Box>

          <Text>{t(title)}</Text>
        </Box>
      }
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        {customFields?.[`${entity}_custom_fields`].map((customField, index) => (
          <Box
            key={index}
            className={classNames('flex flex-col gap-y-4 items-center w-full', {
              'pb-5 lg:pb-0 border-b border-dashed lg:border-b-0': index !== 3,
            })}
            style={{
              borderColor: colors.$1,
            }}
          >
            <Box className="flex flex-col gap-y-4 gap-x-0 lg:flex-row items-center lg:gap-y-0 lg:gap-x-4 w-full">
              <TextField
                label={t('field_label')}
                placeHolder={t('custom_field_label_placeholder')}
                value={customField.label}
                onValueChange={(value) =>
                  handleChange(`${entity}_custom_fields.${index}.label`, value)
                }
                withoutOptionalText
                errorMessage={
                  get(errors, `${entity}_custom_fields_${index}_label`) &&
                  t(get(errors, `${entity}_custom_fields_${index}_label`))
                }
                readOnly={isFormBusy}
              />

              <CustomFieldTypesSelector
                label={t('field_type')}
                value={customField.type}
                onChange={(value) =>
                  handleChange(`${entity}_custom_fields.${index}.type`, value)
                }
                withoutOptionalText
                disabled={isFormBusy}
              />
            </Box>

            {customField.type === 'select' && (
              <TextField
                label={t('field_value')}
                placeHolder={t('select_custom_field_placeholder')}
                value={customField.value}
                onValueChange={(value) =>
                  handleChange(`${entity}_custom_fields.${index}.value`, value)
                }
                withoutOptionalText
                errorMessage={
                  get(errors, `${entity}_custom_fields_${index}_value`) &&
                  t(get(errors, `${entity}_custom_fields_${index}_value`))
                }
                readOnly={isFormBusy}
              />
            )}
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default CustomFieldsCard;
