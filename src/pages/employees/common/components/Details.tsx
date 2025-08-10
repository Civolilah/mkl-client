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

import { useMediaQuery } from 'react-responsive';

import { User } from '@interfaces/index';

import {
  Box,
  Card,
  InformationLabel,
  RefreshDataElement,
  SubsidiariesSelector,
  TextField,
  WarehousesSelector,
} from '@components/index';

import { useTranslation } from '@hooks/index';

export type EmployeeProps = {
  employee: User | undefined;
  editPage: boolean | undefined;
  isLoading: boolean | undefined;
  onRefresh?: () => void;
  errors: Record<string, string>;
  handleChange: (field: keyof User, value: string | string[]) => void;
  setEmployee: Dispatch<SetStateAction<User | undefined>>;
};

const Details = ({
  editPage,
  isLoading,
  onRefresh,
  errors,
  handleChange,
  employee,
}: EmployeeProps) => {
  const t = useTranslation();

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

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
      <Box className="flex flex-col space-y-4 pb-4">
        <TextField
          required
          label={t('first_name')}
          placeHolder={t('first_name_placeholder')}
          value={employee?.first_name || ''}
          onValueChange={(value) => handleChange('first_name', value)}
          changeOnBlur
          errorMessage={errors?.first_name && t(errors.first_name)}
        />

        <TextField
          label={t('last_name')}
          placeHolder={t('last_name_placeholder')}
          value={employee?.last_name || ''}
          onValueChange={(value) => handleChange('last_name', value)}
          changeOnBlur
          errorMessage={errors?.last_name && t(errors.last_name)}
        />

        <TextField
          required
          label={t('email')}
          placeHolder={t('email_placeholder')}
          value={employee?.email || ''}
          onValueChange={(value) => handleChange('email', value)}
          changeOnBlur
          errorMessage={errors?.email && t(errors.email)}
        />

        <TextField
          type="tel"
          label={t('phone')}
          placeHolder={t('phone_placeholder')}
          value={employee?.phone || ''}
          onValueChange={(value) => handleChange('phone', value)}
          changeOnBlur
        />

        <TextField
          required={!editPage}
          type="password"
          label={t(editPage ? 'new_password' : 'password')}
          placeHolder={t('password_placeholder')}
          value={employee?.password || ''}
          onValueChange={(value) => handleChange('password', value)}
          changeOnBlur
          errorMessage={errors?.password && t(errors.password)}
        />

        <SubsidiariesSelector
          label={t('subsidiaries')}
          placeholder={t('select_subsidiaries')}
          value={employee?.subsidiaries_ids || []}
          onChange={(value) => handleChange('subsidiaries_ids', value)}
          onCreatedSubsidiary={(subsidiaryId) =>
            handleChange('subsidiaries_ids', [
              ...(employee?.subsidiaries_ids || []),
              subsidiaryId,
            ])
          }
          onClear={() => handleChange('subsidiaries_ids', [])}
          errorMessage={errors?.subsidiaries_ids && t(errors.subsidiaries_ids)}
          withActionButton
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t('subsidiary_assigning')}
                onlyTooltip
                tooltipOverlayInnerStyle={{
                  width: isSmallScreen ? undefined : '40rem',
                  textAlign: 'center',
                }}
                iconSize="1.35rem"
              />
            </Box>
          }
          withRefreshButton
        />

        <WarehousesSelector
          label={t('warehouses')}
          placeholder={t('select_warehouses')}
          value={employee?.warehouses_ids ? employee?.warehouses_ids : []}
          onChange={(value) => handleChange('warehouses_ids', value as string)}
          onCreatedWarehouse={(warehouseId) =>
            handleChange('warehouses_ids', [
              ...(employee?.warehouses_ids || []),
              warehouseId,
            ])
          }
          onClear={() => handleChange('warehouses_ids', [])}
          errorMessage={errors?.warehouses_ids && t(errors.warehouses_ids)}
          withActionButton
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t('warehouses_assigning_on_employee')}
                onlyTooltip
                tooltipOverlayInnerStyle={{
                  width: isSmallScreen ? undefined : '40rem',
                  textAlign: 'center',
                }}
                iconSize="1.35rem"
              />
            </Box>
          }
          withRefreshButton
        />
      </Box>
    </Card>
  );
};

export default Details;
