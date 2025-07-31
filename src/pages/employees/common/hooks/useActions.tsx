/**
 * MKL (https://mkl.ba).
 *
 * @link https://github.com/mkl source repository
 *
 * @copyright Copyright (c) 2024. MKL (https://mkl.ba)
 *
 * @license https://www.elastic.co/licensing/elastic-license
 */

import React from 'react';

import { MenuProps } from 'antd';
import { useLocation } from 'react-router-dom';

import { User } from '@interfaces/index';

import { DeleteAction } from '@components/index';

const useActions = () => {
  const location = useLocation();

  return (currentResource: User) => {
    let actions: MenuProps['items'] = [
      {
        label: (
          <DeleteAction
            resourceType="employee"
            deleteEndpoint="/api/users/:id/delete_employee"
            resourceId={currentResource.id as string}
            editPageAction
            mainPageURL="/employees"
            resourceName={`${
              currentResource.first_name || currentResource.last_name
                ? (currentResource.first_name || '') +
                  (currentResource.last_name
                    ? ' ' + currentResource.last_name
                    : '')
                : currentResource.email
            }`}
            resourceQueryIdentifier="users"
          />
        ),
        key: `delete-${currentResource.id}`,
      },
    ];

    if (!location.pathname.includes('edit')) {
      actions = actions.filter(
        (action) => action?.key !== `delete-${currentResource.id}`
      );
    }

    return actions;
  };
};

export default useActions;
