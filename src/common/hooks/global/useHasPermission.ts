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
  | 'director';

const useHasPermission = () => {
  const userCompanyDetails = useAtomValue(userCompanyAtom);

  return (permission: Permission) => {
    if (!permission) return false;

    if (!userCompanyDetails) return false;

    if (!permission.includes('_')) return false;

    if (permission === 'director' && !userCompanyDetails.is_director)
      return false;

    if (userCompanyDetails.is_director || userCompanyDetails.is_owner)
      return true;

    if (!userCompanyDetails.permissions) return false;

    const permissionType = permission.split('_')[0];

    if (
      userCompanyDetails.permissions.includes(
        `${permissionType}_all` as Permission
      )
    )
      return true;

    return userCompanyDetails.permissions.includes(permission);
  };
};

export default useHasPermission;
