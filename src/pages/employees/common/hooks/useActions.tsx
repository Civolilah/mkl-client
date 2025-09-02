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

import { route } from '@helpers/index';
import { MenuProps } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

import { User } from '@interfaces/index';

import { DeleteAction, FooterActionItem } from '@components/index';

interface Props {
  refresh?: () => void;
}

const useActions = ({ refresh }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (currentResource: User) => {
    let actions: MenuProps['items'] = [
      ...(refresh && !isLargeScreen
        ? [
            {
              label: (
                <FooterActionItem
                  iconName="add"
                  onClick={() => {
                    navigate(route('/employees/new'));
                  }}
                  label="new_employee"
                />
              ),
              key: `new_employee-${currentResource.id}`,
            },
            {
              label: (
                <FooterActionItem
                  iconName="refresh"
                  onClick={refresh}
                  label="reload"
                />
              ),
              key: `refresh-${currentResource.id}`,
            },
          ]
        : []),
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
            element={
              !isLargeScreen && (
                <FooterActionItem
                  iconName="delete"
                  iconColor="#ef4444"
                  label="delete"
                />
              )
            }
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
