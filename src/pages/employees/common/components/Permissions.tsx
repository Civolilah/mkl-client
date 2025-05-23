import { cloneDeep } from 'lodash';

import {
  Box,
  Card,
  ErrorMessageElement,
  Label,
  LabelElement,
  RefreshDataElement,
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
  { name: 'product', key: 'product' },
  { name: 'supplier', key: 'supplier' },
  { name: 'subsidiary', key: 'subsidiary' },
  { name: 'category', key: 'category' },
  { name: 'label', key: 'label' },
  { name: 'label_category', key: 'label_category' },
  { name: 'status', key: 'status' },
];

const Permissions = (props: EmployeeProps) => {
  const t = useTranslation();

  const { employee, editPage, isLoading, onRefresh, handleChange, errors } =
    props;

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
          currentPermission === 'view_store'
      );
    } else if (
      currentPermissions.includes(`${permissionType}_all`) &&
      permission !== 'import_products' &&
      permission !== 'view_dashboard' &&
      permission !== 'export_products' &&
      permission !== 'view_store'
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
          currentPermission === 'view_store'
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
      permission !== 'view_store'
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
      title={t('permissions')}
      className="w-full"
      topRight={
        editPage && onRefresh && typeof isLoading === 'boolean' ? (
          <RefreshDataElement isLoading={isLoading} refresh={onRefresh} />
        ) : undefined
      }
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

      <LabelElement label={t('view_store')} withoutOptionalText twoGridColumns>
        <Toggle
          checked={isPermissionChecked('view_store')}
          onChange={(value) => handleChangePermissions(value, 'view_store')}
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

      <Box className="flex flex-col space-y-3 mt-6">
        <Box className="grid grid-cols-4 gap-4">
          <Box></Box>
          <Label className="text-center">{t('create')}</Label>
          <Label className="text-center">{t('view')}</Label>
          <Label className="text-center">{t('edit')}</Label>
        </Box>

        <Box className="flex flex-col space-y-4">
          {permissionRows.map((row) => (
            <Box key={row.key} className="grid grid-cols-4 gap-4">
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
