/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import { useAtomValue } from 'jotai';

import { userCompanyAtom } from '@components/general/PrivateRoute';

export type Permission =
  | 'create_subsidiary'
  | 'view_subsidiary'
  | 'edit_subsidiary'
  | 'create_status'
  | 'view_status'
  | 'edit_status'
  | 'director'
  | 'admin'
  | 'owner'
  | 'view_dashboard'
  | 'import_products'
  | 'export_products'
  | 'manage_stock_counting'
  | 'create_label_category'
  | 'view_label_category'
  | 'edit_label_category'
  | 'create_label'
  | 'view_label'
  | 'edit_label'
  | 'create_category'
  | 'view_category'
  | 'edit_category'
  | 'create_supplier'
  | 'view_supplier'
  | 'edit_supplier'
  | 'create_brand'
  | 'view_brand'
  | 'edit_brand'
  | 'create_product'
  | 'view_product'
  | 'edit_product'
  | 'create_warehouse'
  | 'view_warehouse'
  | 'edit_warehouse'
  | 'create_customer'
  | 'view_customer'
  | 'edit_customer'
  | 'create_purchase_order'
  | 'view_purchase_order'
  | 'edit_purchase_order'
  | 'create_bin'
  | 'view_bin'
  | 'edit_bin'
  | 'create_tax_rate'
  | 'view_tax_rate'
  | 'edit_tax_rate'
  | 'create_order'
  | 'view_order'
  | 'edit_order';

const useHasPermission = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  return (permission: Permission) => {
    if (!permission) return false;

    if (!userCompanyDetails) return false;

    if (
      !permission.includes('_') &&
      permission !== 'director' &&
      permission !== 'admin' &&
      permission !== 'owner'
    )
      return false;

    if (permission === 'director' && !userCompanyDetails.is_director)
      return false;

    if (permission === 'owner' && userCompanyDetails.is_owner) return true;

    if (userCompanyDetails.is_director || userCompanyDetails.is_owner)
      return true;

    if (!userCompanyDetails.company.permissions) return false;

    const permissionType = permission.split('_')[0];

    if (
      userCompanyDetails.company.permissions.includes(
        `${permissionType}_all` as Permission
      )
    )
      return true;

    return userCompanyDetails.company.permissions.includes(permission);
  };
};

export default useHasPermission;
