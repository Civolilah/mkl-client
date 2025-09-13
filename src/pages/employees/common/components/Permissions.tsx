import { cloneDeep } from 'lodash';

import {
  Box,
  Card,
  ErrorMessageElement,
  Icon,
  Label,
  LabelElement,
  Text,
  Toggle,
} from '@components/index';

import { Permission } from '@hooks/global/useHasPermission';
import { useTranslation } from '@hooks/index';

import { EmployeeProps } from './Details';

interface PermissionRow {
  name: string;
  key: string;
}

const permissionRows: PermissionRow[] = [
  { name: 'all', key: 'all' },
  { name: 'order', key: 'order' },
  { name: 'product', key: 'product' },
  { name: 'warehouse', key: 'warehouse' },
  { name: 'subsidiary', key: 'subsidiary' },
  { name: 'customer', key: 'customer' },
  { name: 'supplier', key: 'supplier' },
  { name: 'brand', key: 'brand' },
  { name: 'category', key: 'category' },
  { name: 'label', key: 'label' },
  { name: 'label_category', key: 'label_category' },
  { name: 'purchase_order', key: 'purchase_order' },
  { name: 'status', key: 'status' },
];

const Permissions = ({
  employee,
  isLoading,
  handleChange,
  errors,
}: EmployeeProps) => {
  const t = useTranslation();

  const handleChangePermissions = (value: boolean, permission: Permission) => {
    if (permission === 'admin') {
      handleChange('permissions', value ? ['admin'] : []);
      return;
    }

    let currentPermissions = (cloneDeep(employee?.permissions) || []).filter(
      (value) => value !== permission
    );

    const [permissionType, entity] = permission.split('_');

    if (entity === 'all') {
      currentPermissions = currentPermissions.filter(
        (currentPermission) =>
          !currentPermission.startsWith(permissionType) ||
          currentPermission === 'import_products' ||
          currentPermission === 'view_dashboard' ||
          currentPermission === 'export_products' ||
          currentPermission === 'manage_stock_counting'
      );
    } else if (
      currentPermissions.includes(`${permissionType}_all`) &&
      permission !== 'import_products' &&
      permission !== 'view_dashboard' &&
      permission !== 'export_products' &&
      permission !== 'manage_stock_counting'
    ) {
      const permissionsByType = permissionRows
        .filter((row) => row.key !== 'all')
        .map(
          (currentPermission) => `${permissionType}_${currentPermission.key}`
        )
        .filter((currentPermission) => currentPermission !== permission);

      currentPermissions = currentPermissions.filter(
        (currentPermission) => currentPermission !== `${permissionType}_all`
      );

      currentPermissions = [...currentPermissions, ...permissionsByType];
    }

    const permissionsByType = permissionRows
      .filter((row) => row.key !== 'all')
      .map((currentPermission) => `${permissionType}_${currentPermission.key}`)
      .filter((currentPermission) => currentPermission !== permission);

    const areAllPermissionsSelected = permissionsByType.every(
      (currentPermission) =>
        currentPermissions.includes(currentPermission) ||
        currentPermission === permission
    );

    if (value && areAllPermissionsSelected) {
      currentPermissions = currentPermissions.filter(
        (currentPermission) =>
          !currentPermission.includes(`${permissionType}_`) ||
          currentPermission === 'import_products' ||
          currentPermission === 'view_dashboard' ||
          currentPermission === 'export_products' ||
          currentPermission === 'manage_stock_counting'
      );
    }

    handleChange(
      'permissions',
      value
        ? areAllPermissionsSelected
          ? [...currentPermissions, `${permissionType}_all`]
          : [...currentPermissions, permission]
        : currentPermissions
    );
  };

  const isPermissionChecked = (permission: Permission) => {
    const permissions = cloneDeep(employee?.permissions) || [];
    const [type] = permission.split('_');

    if (
      permissions.includes(`${type}_all`) &&
      permission !== 'import_products' &&
      permission !== 'view_dashboard' &&
      permission !== 'export_products' &&
      permission !== 'manage_stock_counting'
    ) {
      return true;
    }

    if (permissions.includes(permission) || permissions.includes('admin')) {
      return true;
    }

    return false;
  };

  const isPermissionDisabled = () => {
    return Boolean(employee?.permissions.includes('admin')) || isLoading;
  };

  return (
    <Card
      id="permissions-card"
      titleElement={
        <Box className="flex items-center gap-x-2">
          <Box>
            <Icon name="shieldCheck" size="1.35rem" />
          </Box>

          <Text>{t('permissions')}</Text>
        </Box>
      }
      className="w-full"
    >
      <LabelElement
        label={t('administrator')}
        helpLabel={t('administrator_help')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={isPermissionChecked('admin')}
          onChange={(value) => handleChangePermissions(value, 'admin')}
        />
      </LabelElement>

      <LabelElement
        label={t('view_dashboard')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={isPermissionChecked('view_dashboard')}
          onChange={(value) => handleChangePermissions(value, 'view_dashboard')}
          disabled={isPermissionDisabled()}
        />
      </LabelElement>

      <LabelElement
        label={t('import_products')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={isPermissionChecked('import_products')}
          onChange={(value) =>
            handleChangePermissions(value, 'import_products')
          }
          disabled={isPermissionDisabled()}
        />
      </LabelElement>

      <LabelElement
        label={t('export_products')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={isPermissionChecked('export_products')}
          onChange={(value) =>
            handleChangePermissions(value, 'export_products')
          }
          disabled={isPermissionDisabled()}
        />
      </LabelElement>

      <LabelElement
        label={t('manage_stock_counting')}
        helpLabel={t('manage_stock_counting_help')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={
            isPermissionChecked('manage_stock_counting') ||
            isPermissionChecked('edit_product')
          }
          onChange={(value) =>
            handleChangePermissions(value, 'manage_stock_counting')
          }
          disabled={
            isPermissionDisabled() || isPermissionChecked('edit_product')
          }
        />
      </LabelElement>

      <Box className="flex flex-col space-y-3 mt-6">
        <Box className="grid grid-cols-4 gap-4">
          <Box></Box>
          <Label className="text-start">{t('create')}</Label>
          <Label className="text-start">{t('view')}</Label>
          <Label className="text-start">{t('edit')}</Label>
        </Box>

        <Box className="flex flex-col space-y-4">
          {permissionRows.map((row) => (
            <Box
              key={row.key}
              className="grid grid-cols-4 gap-2 lg:gap-4 items-center"
            >
              <Label>{t(row.name)}</Label>

              <Box className="text-center">
                <Toggle
                  checked={isPermissionChecked(
                    `create_${row.key}` as Permission
                  )}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `create_${row.key}` as Permission
                    )
                  }
                  disabled={isPermissionDisabled()}
                />
              </Box>

              <Box className="text-center">
                <Toggle
                  checked={isPermissionChecked(`view_${row.key}` as Permission)}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `view_${row.key}` as Permission
                    )
                  }
                  disabled={isPermissionDisabled()}
                />
              </Box>

              <Box className="text-center">
                <Toggle
                  checked={isPermissionChecked(`edit_${row.key}` as Permission)}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `edit_${row.key}` as Permission
                    )
                  }
                  disabled={isPermissionDisabled()}
                />
              </Box>
            </Box>
          ))}
        </Box>

        <ErrorMessageElement
          errorMessage={errors.permissions && t(errors.permissions)}
        />
      </Box>
    </Card>
  );
};

export default Permissions;
