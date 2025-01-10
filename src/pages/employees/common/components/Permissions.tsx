import { ItemType } from 'antd/es/menu/interface';
import { cloneDeep } from 'lodash';

import { User } from '@interfaces/index';

import { Box, Card, Label, LabelElement, Toggle } from '@components/index';

import { Permission } from '@hooks/global/useHasPermission';
import { useTranslation } from '@hooks/index';

// Dodajemo interface za permission grid
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

type Props = {
  employee: User | undefined;
  editPage: boolean | undefined;
  isLoading: boolean | undefined;
  onRefresh?: () => void;
  actions: ItemType[];
  errors: Record<string, string>;
  handleChange: (field: keyof User, value: string | string[]) => void;
};

const Permissions = (props: Props) => {
  const t = useTranslation();

  const {
    employee,
    editPage,
    isLoading,
    onRefresh,
    actions,
    errors,
    handleChange,
  } = props;

  const handleChangePermissions = (value: boolean, permission: Permission) => {
    const updatedEmployee = cloneDeep(employee) as User;

    if (value) {
      updatedEmployee.permissions.push(permission);
    } else {
      updatedEmployee.permissions = updatedEmployee.permissions.filter(
        (p) => p !== permission
      );
    }

    handleChange('permissions', updatedEmployee.permissions);
  };

  return (
    <Card title={t('permissions')} className="w-full">
      <LabelElement
        label={t('administrator')}
        helpLabel={t('administrator_help')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={Boolean(employee?.permissions.includes('admin'))}
          onChange={(value) => handleChangePermissions(value, 'admin')}
        />
      </LabelElement>

      <LabelElement
        label={t('view_dashboard')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={Boolean(employee?.permissions.includes('view_dashboard'))}
          onChange={(value) => handleChangePermissions(value, 'view_dashboard')}
          disabled={Boolean(employee?.permissions.includes('admin'))}
        />
      </LabelElement>

      <LabelElement
        label={t('import_products')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={Boolean(employee?.permissions.includes('import_products'))}
          onChange={(value) =>
            handleChangePermissions(value, 'import_products')
          }
          disabled={Boolean(employee?.permissions.includes('admin'))}
        />
      </LabelElement>

      <LabelElement label={t('view_store')} withoutOptionalText twoGridColumns>
        <Toggle
          checked={Boolean(employee?.permissions.includes('view_store'))}
          onChange={(value) => handleChangePermissions(value, 'view_store')}
          disabled={Boolean(employee?.permissions.includes('admin'))}
        />
      </LabelElement>

      <LabelElement
        label={t('export_products')}
        withoutOptionalText
        twoGridColumns
      >
        <Toggle
          checked={Boolean(employee?.permissions.includes('export_products'))}
          onChange={(value) =>
            handleChangePermissions(value, 'export_products')
          }
          disabled={Boolean(employee?.permissions.includes('admin'))}
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
                  checked={Boolean(
                    employee?.permissions.includes(`create_${row.key}`)
                  )}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `create_${row.key}` as Permission
                    )
                  }
                  disabled={Boolean(employee?.permissions.includes('admin'))}
                />
              </Box>

              <Box className="text-center">
                <Toggle
                  checked={Boolean(
                    employee?.permissions.includes(`view_${row.key}`)
                  )}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `view_${row.key}` as Permission
                    )
                  }
                  disabled={Boolean(employee?.permissions.includes('admin'))}
                />
              </Box>

              <Box className="text-center">
                <Toggle
                  checked={Boolean(
                    employee?.permissions.includes(`edit_${row.key}`)
                  )}
                  onChange={(value) =>
                    handleChangePermissions(
                      value,
                      `edit_${row.key}` as Permission
                    )
                  }
                  disabled={Boolean(employee?.permissions.includes('admin'))}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default Permissions;
