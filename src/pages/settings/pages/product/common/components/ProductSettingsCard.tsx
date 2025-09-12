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

import { ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  LabelElement,
  NumberField,
  Text,
  Toggle,
} from '@components/index';

import { useTranslation } from '@hooks/index';

import { ProductSettingsType } from '../../Product';
import useHandleChange from '../hooks/useHandleChange';

export interface ProductSettingsProps {
  productSettings: ProductSettingsType | undefined;
  isLoading: boolean;
  errors: ValidationErrors;
  isFormBusy: boolean;
  setProductSettings: Dispatch<SetStateAction<ProductSettingsType | undefined>>;
}

const ProductSettingsCard = ({
  productSettings,
  isLoading,
  isFormBusy,
  errors,
  setProductSettings,
}: ProductSettingsProps) => {
  const t = useTranslation();

  const handleChange = useHandleChange({ setProductSettings });

  return (
    <Card
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="product" size="1.5rem" />
          </Box>

          <Text>{t('product_settings')}</Text>
        </Box>
      }
      className="w-full"
      isLoading={isLoading}
    >
      <Box className="flex flex-col gap-y-4">
        <LabelElement
          label={t('stock_notifications')}
          helpLabel={t('stock_notifications_help')}
          withoutOptionalText
          twoGridColumns
        >
          <Toggle
            checked={Boolean(productSettings?.send_email_notification)}
            onChange={(value) => handleChange('send_email_notification', value)}
            disabled={isFormBusy || isLoading}
          />
        </LabelElement>

        <LabelElement
          label={t('notification_threshold')}
          helpLabel={t('notification_threshold_help')}
          twoGridColumns
        >
          <NumberField
            value={productSettings?.notification_threshold}
            onValueChange={(value) =>
              handleChange('notification_threshold', value || 0)
            }
            readOnly={isFormBusy || isLoading}
            errorMessage={
              errors.notification_threshold && t(errors.notification_threshold)
            }
          />
        </LabelElement>
      </Box>
    </Card>
  );
};

export default ProductSettingsCard;
