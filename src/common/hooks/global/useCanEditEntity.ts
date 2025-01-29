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
import { Resource } from '@components/general/TableActionsDropdown';

import { useHasPermission } from '@hooks/index';

import { Permission } from './useHasPermission';

const useCanEditEntity = () => {
  const hasPermission = useHasPermission();

  const userCompany = useAtomValue(userCompanyAtom);

  return (
    editPermission: Permission,
    createPermission: Permission,
    resource: Resource | undefined
  ) => {
    if (userCompany && resource) {
      if (hasPermission(editPermission)) {
        return true;
      }

      if (
        hasPermission(createPermission) &&
        resource['created_by_id' as keyof typeof resource] === userCompany.id
      ) {
        return true;
      }
    }

    return false;
  };
};

export default useCanEditEntity;
