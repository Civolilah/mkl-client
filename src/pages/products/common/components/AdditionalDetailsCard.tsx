/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useMediaQuery } from 'react-responsive';

import { Product, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  Label,
  RefreshDataElement,
  StatusesSelector,
  SubsidiariesSelector,
  Toggle,
} from '@components/index';

import { useTranslation } from '@hooks/index';

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
};

const AdditionalDetailsCard = ({
  isLoading,
  editPage,
  onRefresh,
  product,
  errors,
  handleChange,
}: Props) => {
  const t = useTranslation();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <Card
      title={t('additional_details')}
      className="w-full"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-2">
        <SubsidiariesSelector
          label={t('subsidiaries')}
          placeholder={t('select_subsidiaries')}
          value={product?.subsidiaries ? product?.subsidiaries : []}
          onChange={(value) => handleChange('subsidiaries', value as string)}
          onCreatedSubsidiary={(subsidiaryId) =>
            handleChange('subsidiaries', [
              ...(product?.subsidiaries || []),
              subsidiaryId,
            ])
          }
          onClear={() => handleChange('subsidiaries', '')}
          errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
          withActionButton
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t('subsidiaries_assigning_on_product')}
                onlyTooltip
                tooltipOverlayInnerStyle={{
                  width: isSmallScreen ? undefined : '42rem',
                  textAlign: 'center',
                }}
              />
            </Box>
          }
        />

        <Box className="flex items-center space-x-10">
          <Label>{t('status_by_quantity')}</Label>

          <Toggle
            checked={Boolean(product?.is_status_by_quantity)}
            onChange={(value) => handleChange('is_status_by_quantity', value)}
          />
        </Box>

        {product?.is_status_by_quantity ? (
          <>asmdasdm</>
        ) : (
          <StatusesSelector
            label={t('status')}
            placeholder={t('select_status')}
            value={product?.status_id ? [product?.status_id] : []}
            onChange={(value) => handleChange('status_id', value as string)}
            onClear={() => handleChange('status_id', '')}
            errorMessage={errors?.status_id && t(errors.status_id)}
            withActionButton
          />
        )}
      </Box>
    </Card>
  );
};

export default AdditionalDetailsCard;
