/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { cloneDeep } from 'lodash';
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
  Divider,
  LabelElement,
  Text,
} from '@components/index';

import { useFetchEntity, useTranslation } from '@hooks/index';

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

  const [existingEmployees, setExistingEmployees] = useState<User[]>([]);
  const [isLoadingExistingEmployees, setIsLoadingExistingEmployees] =
    useState<boolean>(false);
  const [selectedExistingEmployee, setSelectedExistingEmployee] = useState<
    User | undefined
  >(undefined);

  useFetchEntity({
    queryIdentifiers: ['/api/users'],
    endpoint:
      '/api/users?exclude_current_company_employees=true&existing_employees_list=true',
    setEntities: setExistingEmployees,
    setIsLoading: setIsLoadingExistingEmployees,
    listQuery: true,
    enableByPermission: true,
  });

  const handleClearSelection = () => {
    handleChange('id', '');
    setSelectedExistingEmployee(undefined);
  };

  useEffect(() => {
    if (employee?.id) {
      const foundEmployee = existingEmployees.find(
        (currentEmployee) => currentEmployee.id === employee.id
      );

      if (foundEmployee) {
        setSelectedExistingEmployee({
          ...cloneDeep(foundEmployee),
          subsidiaries_ids: [],
          warehouses_ids: [],
          permissions: [],
        });
      }
    }
  }, [employee?.id]);

  return (
    <Card
      title={t('details')}
      className="w-full"
      isLoading={isLoading || isLoadingExistingEmployees}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-4">
        {!editPage && (
          <Box className="space-y-3">
            <EmployeesSelector
              label={t('existing_employee')}
              placeholder={t('select_existing_employee')}
              value={employee?.id ? [employee?.id as string] : []}
              onChange={(value) => handleChange('id', value as string)}
              onClear={handleClearSelection}
              errorMessage={errors?.employee_id && t(errors.employee_id)}
              afterSelectorLabel={
                <Box className="pl-1.5">
                  <InformationLabel
                    text={t('selecting_existing_employee_help')}
                    onlyTooltip
                    tooltipOverlayInnerStyle={{
                      width: isSmallScreen ? undefined : '25rem',
                      textAlign: 'center',
                    }}
                    iconSize="1.35rem"
                  />
                </Box>
              }
              withRefreshButton
              excludeCurrentCompanyEmployees
            />
          </Box>
        )}

        {!editPage && employee && (
          <Divider
            style={{
              marginTop: '1.75rem',
              marginBottom: '0.45rem',
            }}
          />
        )}

        {(!selectedExistingEmployee || editPage) && (
          <>
            <TextField
              required
              label={t('first_name')}
              placeHolder={t('first_name_placeholder')}
              value={employee?.first_name || ''}
              onValueChange={(value) => handleChange('first_name', value)}
              changeOnBlur
              errorMessage={errors?.first_name && t(errors.first_name)}
              disabled={isLoading}
            />

            <TextField
              label={t('last_name')}
              placeHolder={t('last_name_placeholder')}
              value={employee?.last_name || ''}
              onValueChange={(value) => handleChange('last_name', value)}
              changeOnBlur
              errorMessage={errors?.last_name && t(errors.last_name)}
              disabled={isLoading}
            />

            <TextField
              required
              label={t('email')}
              placeHolder={t('email_placeholder')}
              value={employee?.email || ''}
              onValueChange={(value) => handleChange('email', value)}
              changeOnBlur
              errorMessage={errors?.email && t(errors.email)}
              disabled={isLoading}
            />

            <TextField
              type="tel"
              label={t('phone')}
              placeHolder={t('phone_placeholder')}
              value={employee?.phone || ''}
              onValueChange={(value) => handleChange('phone', value)}
              changeOnBlur
              disabled={isLoading}
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
              disabled={isLoading}
            />
          </>
        )}

        {selectedExistingEmployee && !editPage && (
          <Box>
            <LabelElement label={t('first_name')} withoutOptionalText>
              <Text>{selectedExistingEmployee?.first_name}</Text>
            </LabelElement>

            <LabelElement label={t('last_name')} withoutOptionalText>
              <Text>
                {selectedExistingEmployee?.last_name || t('no_entry')}
              </Text>
            </LabelElement>

            <LabelElement label={t('email')} withoutOptionalText>
              <Text>{selectedExistingEmployee?.email}</Text>
            </LabelElement>

            <LabelElement label={t('phone')} withoutOptionalText>
              <Text>{selectedExistingEmployee?.phone || t('no_entry')}</Text>
            </LabelElement>
          </Box>
        )}

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
          value={employee?.warehouses_ids || []}
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
