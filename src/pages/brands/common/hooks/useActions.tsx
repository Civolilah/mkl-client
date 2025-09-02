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

import { Brand } from '@interfaces/index';

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

  return (currentResource: Brand) => {
    const actions: MenuProps['items'] = [
      ...(refresh && hasPermission('create_label_category') && !isLargeScreen
        ? [
            {
              label: (
                <FooterActionItem
                  iconName="add"
                  onClick={() => {
                    navigate(route('/brands/new'));
                  }}
                  label="new_brand"
                />
              ),
              key: `new_brand-${id}`,
            },
            {
              label: (
                <FooterActionItem
                  iconName="refresh"
                  onClick={refresh}
                  label="reload"
                  iconSize="1.25rem"
                />
              ),
              key: `refresh-${id}`,
            },
          ]
        : []),
      {
        label: (
          <DeleteAction
            resourceType="brand"
            deleteEndpoint="/api/brands/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/brands"
            resourceName={currentResource.name}
            resourceQueryIdentifier="brands"
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
