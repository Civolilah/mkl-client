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
import { useNavigate, useParams } from 'react-router-dom';

import { LabelCategory } from '@interfaces/index';

import { DeleteAction, FooterActionItem } from '@components/index';

import { useHasPermission } from '@hooks/index';

interface Props {
  refresh?: () => void;
}

const useActions = ({ refresh }: Props = {}) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const hasPermission = useHasPermission();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (currentResource: LabelCategory) => {
    const actions: MenuProps['items'] = [
      ...(refresh && hasPermission('create_label') && !isLargeScreen
        ? [
            {
              label: (
                <FooterActionItem
                  iconName="add"
                  onClick={() => {
                    navigate(route('/labels/new'));
                  }}
                  label="new_label"
                />
              ),
              key: `new_label-${currentResource.id}`,
            },
            {
              label: (
                <FooterActionItem
                  iconName="refresh"
                  onClick={refresh}
                  label="reload"
                />
              ),
              key: `refresh-${id}`,
            },
          ]
        : []),
      {
        label: (
          <DeleteAction
            resourceType="label"
            deleteEndpoint="/api/labels/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/labels"
            resourceName={currentResource.name}
            resourceQueryIdentifier="labels"
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
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
