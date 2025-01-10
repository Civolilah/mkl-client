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

import { User } from '@interfaces/index';

import {
  Box,
  Card,
  Icon,
  RefreshDataElement,
  SelectDataField,
  Text,
  TextField,
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

const Details = (props: EmployeeProps) => {
  const {
    editPage,
    isLoading,
    onRefresh,
    errors,
    handleChange,
    employee,
    setEmployee,
  } = props;

  const t = useTranslation();

  return (
    <Card
      title={t('details')}
      className="w-full pb-6"
      isLoading={isLoading}
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement
            isLoading={isLoading}
            refresh={onRefresh}
            iconSize="1.45rem"
          />
        ) : undefined
      }
    >
      <Box className="flex flex-col space-y-4 pb-4">
        <TextField
          required
          label={t('first_name')}
          value={employee?.first_name || ''}
          onValueChange={(value) => handleChange('first_name', value)}
          changeOnBlur
          errorMessage={errors?.first_name && t(errors.first_name)}
        />
        <TextField
          label={t('last_name')}
          value={employee?.last_name || ''}
          onValueChange={(value) => handleChange('last_name', value)}
          changeOnBlur
          errorMessage={errors?.last_name && t(errors.last_name)}
        />
        <TextField
          required
          label={t('email')}
          value={employee?.email || ''}
          onValueChange={(value) => handleChange('email', value)}
          changeOnBlur
          errorMessage={errors?.email && t(errors.email)}
        />

        <Box className="flex flex-col space-y-2 w-full">
          <SelectDataField
            label={t('subsidiaries')}
            placeholder={t('select_subsidiaries')}
            valueKey="name"
            labelKey="name"
            endpoint="/api/subsidiaries?selector=true"
            value={employee?.subsidiaries || []}
            onChange={(value) => {
              handleChange('subsidiaries', value);

              setEmployee(
                (current) =>
                  current && {
                    ...current,
                    permissions: current.permissions.filter(
                      (permission) =>
                        !permission.includes('product_') ||
                        (permission.includes('product_') &&
                          (value.includes(permission.split('_')[2]) ||
                            permission.endsWith('product_all')))
                    ),
                  }
              );
            }}
            onClear={() => {
              handleChange('subsidiaries', []);

              setEmployee(
                (current) =>
                  current && {
                    ...current,
                    permissions: current.permissions.filter(
                      (currentPermission) =>
                        !currentPermission.includes('product_')
                    ),
                  }
              );
            }}
            errorMessage={errors?.subsidiaries && t(errors.subsidiaries)}
          />

          <Box className="flex items-center space-x-2">
            <Box className="mt-0.5">
              <Icon name="information" size="1.35rem" />
            </Box>

            <Text className="text-xs">{t('subsidiary_assigning')}</Text>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default Details;
