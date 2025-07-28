/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Product, ValidationErrors } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  Label,
  RefreshDataElement,
  SelectDataField,
  SubsidiariesSelector,
  Toggle,
} from '@components/index';

import { useHasPermission, useTranslation } from '@hooks/index';

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

  const hasPermission = useHasPermission();

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
      <Box className="flex flex-col space-y-6 pb-2">
        <Box className="flex flex-col space-y-2 w-full">
          <SubsidiariesSelector
            label={t('subsidiaries')}
            placeholder={t('select_subsidiaries')}
            value={product?.subsidiaries ? product?.subsidiaries : []}
            onChange={(value) => handleChange('subsidiaries', value as string)}
            onClear={() => handleChange('subsidiaries', '')}
            errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
            withActionButton
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
            queryIdentifiers={['/api/statuses', 'selector']}
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
      </Box>
    </Card>
  );
};

export default AdditionalDetailsCard;
