/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useState } from 'react';

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
  EmployeesSelector,
  Text,
  CompaniesSelector,
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
  setEmployee,
}: EmployeeProps) => {
  const t = useTranslation();
  const [isExistingEmployee, setIsExistingEmployee] = useState(false);
  const [showExistingEmployeeAlert, setShowExistingEmployeeAlert] =
    useState(false);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  const handleEmployeeSelect = (selectedEmployee: User) => {
    if (selectedEmployee) {
      setEmployee({
        ...selectedEmployee,
        subsidiaries_ids: employee?.subsidiaries_ids || [],
        warehouses_ids: employee?.warehouses_ids || [],
      });
      setIsExistingEmployee(true);
      setShowExistingEmployeeAlert(true);
    }
  };

  const handleClearSelection = () => {
    setEmployee(undefined);
    setIsExistingEmployee(false);
    setShowExistingEmployeeAlert(false);
  };

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
        {/* Employee Selector - samo za create page */}
        {!editPage && (
          <Box className="space-y-3">
            <EmployeesSelector
              label={t('existing_employee')}
              placeholder={t('search_existing_employee')}
              value={isExistingEmployee ? [employee?.id as string] : []}
              onChange={(value) => handleEmployeeSelect(value as string)}
              onClear={handleClearSelection}
              errorMessage={errors?.employee_id && t(errors.employee_id)}
              helperText={t('search_employee_from_other_companies')}
            />

            {/* Alert za postojećeg employee-a */}
            {showExistingEmployeeAlert && isExistingEmployee && (
              <div>
                <Text>{t('existing_employee_selected')}</Text>
                <Text>{t('existing_employee_selected_description')}</Text>
              </div>
            )}
          </Box>
        )}

        {!editPage && employee && <hr className="border-gray-200 my-4" />}

        {(!isExistingEmployee || editPage) && (
          <>
            <TextField
              required
              label={t('first_name')}
              placeHolder={t('first_name_placeholder')}
              value={employee?.first_name || ''}
              onValueChange={(value) => handleChange('first_name', value)}
              changeOnBlur
              errorMessage={errors?.first_name && t(errors.first_name)}
              disabled={isExistingEmployee}
            />

            <TextField
              label={t('last_name')}
              placeHolder={t('last_name_placeholder')}
              value={employee?.last_name || ''}
              onValueChange={(value) => handleChange('last_name', value)}
              changeOnBlur
              errorMessage={errors?.last_name && t(errors.last_name)}
              disabled={isExistingEmployee}
            />

            <TextField
              required
              label={t('email')}
              placeHolder={t('email_placeholder')}
              value={employee?.email || ''}
              onValueChange={(value) => handleChange('email', value)}
              changeOnBlur
              errorMessage={errors?.email && t(errors.email)}
              disabled={isExistingEmployee}
            />

            <TextField
              type="tel"
              label={t('phone')}
              placeHolder={t('phone_placeholder')}
              value={employee?.phone || ''}
              onValueChange={(value) => handleChange('phone', value)}
              changeOnBlur
              disabled={isExistingEmployee}
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
              disabled={isExistingEmployee}
            />
          </>
        )}

        {isExistingEmployee && !editPage && (
          <Box className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-medium text-gray-900 mb-2">
              {t('selected_employee')}
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>{t('name')}:</strong> {employee?.first_name}{' '}
                {employee?.last_name}
              </p>
              <p>
                <strong>{t('email')}:</strong> {employee?.email}
              </p>
              {employee?.phone && (
                <p>
                  <strong>{t('phone')}:</strong> {employee?.phone}
                </p>
              )}
            </div>
          </Box>
        )}

        <CompaniesSelector
          label={t('company')}
          placeholder={t('select_company')}
          value={employee?.company_id ? [employee.company_id] : []}
          onChange={(value) => handleChange('company_id', value)}
          onClear={() => handleChange('company_id', [])}
          errorMessage={errors?.company_id && t(errors.company_id)}
          afterSelectorLabel={
            <Box className="pl-1.5">
              <InformationLabel
                text={t(
                  isExistingEmployee
                    ? 'subsidiary_assigning_existing'
                    : 'subsidiary_assigning'
                )}
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
                text={t(
                  isExistingEmployee
                    ? 'subsidiary_assigning_existing'
                    : 'subsidiary_assigning'
                )}
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
                text={t(
                  isExistingEmployee
                    ? 'warehouses_assigning_existing'
                    : 'warehouses_assigning_on_employee'
                )}
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
