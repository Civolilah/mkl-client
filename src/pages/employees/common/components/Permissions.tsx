import { cloneDeep } from 'lodash';

import {
  Box,
  Card,
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
  { name: 'employee', key: 'user' },
  { name: 'status', key: 'status' },
];

const Permissions = (props: EmployeeProps) => {
  const t = useTranslation();

  const { employee, editPage, isLoading, onRefresh, handleChange } = props;

  const handleChangePermissions = (value: boolean, permission: Permission) => {
    if (permission === 'admin') {
      handleChange('permissions', value ? ['admin'] : []);
      return;
    }

    if (!permission.includes('product_')) {
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
            currentPermission === 'view_store' ||
            currentPermission.includes('product_')
        );
      } else if (
        currentPermissions.includes(`${permissionType}_all`) &&
        permission !== 'import_products' &&
        permission !== 'view_dashboard' &&
        permission !== 'export_products' &&
        permission !== 'view_store'
      ) {
        const permissionsByType = permissionRows
          .filter(
            (row) =>
              row.key !== 'all' &&
              (employee?.subsidiaries.length ? row.key !== 'product' : true)
          )
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
        .filter(
          (row) =>
            row.key !== 'all' &&
            (employee?.subsidiaries.length ? row.key !== 'product' : true)
        )
        .map(
          (currentPermission) => `${permissionType}_${currentPermission.key}`
        )
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
            currentPermission.includes('product_')
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
    } else {
      let currentPermissions = (cloneDeep(employee?.permissions) || []).filter(
        (value) => value !== permission
      );

      const [permissionType, entity, entityType] = permission.split('_');

      if (entityType === 'all') {
        currentPermissions = currentPermissions.filter(
          (currentPermission) =>
            !currentPermission.startsWith(`${permissionType}_${entity}_`) ||
            currentPermission === 'import_products' ||
            currentPermission === 'view_dashboard' ||
            currentPermission === 'export_products' ||
            currentPermission === 'view_store'
        );
      } else if (
        currentPermissions.includes(`${permissionType}_${entity}_all`) &&
        permission !== 'import_products' &&
        permission !== 'view_dashboard' &&
        permission !== 'export_products' &&
        permission !== 'view_store'
      ) {
        const permissionsByType =
          employee?.subsidiaries
            .map(
              (currentSubsidiary) =>
                `${permissionType}_${entity}_${currentSubsidiary}`
            )
            .filter((currentPermission) => currentPermission !== permission) ||
          [];

        currentPermissions = currentPermissions.filter(
          (currentPermission) =>
            currentPermission !== `${permissionType}_${entity}_all`
        );

        currentPermissions = [...currentPermissions, ...permissionsByType];
      }

      const areAllPermissionsSelected = employee?.subsidiaries.every(
        (currentSubsidiary) =>
          currentPermissions.includes(
            `${permissionType}_${entity}_${currentSubsidiary}`
          ) || `${permissionType}_${entity}_${currentSubsidiary}` === permission
      );

      if (value && areAllPermissionsSelected) {
        currentPermissions = currentPermissions.filter(
          (currentPermission) =>
            !currentPermission.includes(`${permissionType}_${entity}_`)
        );
      }

      handleChange(
        'permissions',
        value
          ? areAllPermissionsSelected
            ? [...currentPermissions, `${permissionType}_${entity}_all`]
            : [...currentPermissions, permission]
          : currentPermissions
      );
    }
  };

  const isPermissionChecked = (permission: Permission) => {
    const permissions = cloneDeep(employee?.permissions) || [];
    const [type] = permission.split('_');

    if (permission.includes('product_')) {
      if (permissions.includes(`${type}_product_all`)) {
        return true;
      }
    } else {
      if (
        permissions.includes(`${type}_all`) &&
        permission !== 'import_products' &&
        permission !== 'view_dashboard' &&
        permission !== 'export_products' &&
        permission !== 'view_store'
      ) {
        return true;
      }
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
          <RefreshDataElement
            isLoading={isLoading}
            refresh={onRefresh}
            iconSize="1.45rem"
          />
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
          {permissionRows
            .filter((row) =>
              employee?.subsidiaries.length ? row.key !== 'product' : true
            )
            .map((row) => (
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
                    checked={isPermissionChecked(
                      `view_${row.key}` as Permission
                    )}
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
                    checked={isPermissionChecked(
                      `edit_${row.key}` as Permission
                    )}
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
      </Box>

      {Boolean(employee?.subsidiaries.length) && (
        <Box className="flex flex-col space-y-8 w-full mt-14">
          <Label>{t('product_permissions_per_subsidiary')}</Label>

          <Box className="flex flex-col space-y-3">
            <Box className="grid grid-cols-4 gap-4">
              <Box></Box>
              <Label className="text-center">{t('create')}</Label>
              <Label className="text-center">{t('view')}</Label>
              <Label className="text-center">{t('edit')}</Label>
            </Box>

            <Box className="flex flex-col space-y-4">
              {['all', ...(employee?.subsidiaries || [])].map(
                (subsidiaryName) => (
                  <Box key={subsidiaryName} className="grid grid-cols-4 gap-4">
                    <Label className="truncate">
                      {subsidiaryName === 'all' ? t('all') : subsidiaryName}
                    </Label>

                    <Box className="text-center">
                      <Toggle
                        checked={isPermissionChecked(
                          `create_product_${subsidiaryName}` as Permission
                        )}
                        onChange={(value) =>
                          handleChangePermissions(
                            value,
                            `create_product_${subsidiaryName}` as Permission
                          )
                        }
                        disabled={isPermissionDisabled()}
                      />
                    </Box>

                    <Box className="text-center">
                      <Toggle
                        checked={isPermissionChecked(
                          `view_product_${subsidiaryName}` as Permission
                        )}
                        onChange={(value) =>
                          handleChangePermissions(
                            value,
                            `view_product_${subsidiaryName}` as Permission
                          )
                        }
                        disabled={isPermissionDisabled()}
                      />
                    </Box>

                    <Box className="text-center">
                      <Toggle
                        checked={isPermissionChecked(
                          `edit_product_${subsidiaryName}` as Permission
                        )}
                        onChange={(value) =>
                          handleChangePermissions(
                            value,
                            `edit_product_${subsidiaryName}` as Permission
                          )
                        }
                        disabled={isPermissionDisabled()}
                      />
                    </Box>
                  </Box>
                )
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default Permissions;
