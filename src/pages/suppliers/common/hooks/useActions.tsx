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
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom';

import { LabelCategory } from '@interfaces/index';

import { DeleteAction, FooterActionItem } from '@components/index';

interface Props {
  refresh?: () => void;
}

const useActions = ({ refresh }: Props) => {
  const { id } = useParams();

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1024px)' });

  return (currentResource: LabelCategory) => {
    const actions: MenuProps['items'] = [
      ...(refresh && !isLargeScreen
        ? [
            {
              label: <FooterActionItem iconName="refresh" onClick={refresh} />,
              key: `refresh-${id}`,
            },
          ]
        : []),
      {
        label: (
          <DeleteAction
            resourceType="supplier"
            deleteEndpoint="/api/suppliers/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/suppliers"
            resourceName={currentResource.name}
            resourceQueryIdentifier="suppliers"
            element={
              !isLargeScreen && (
                <FooterActionItem iconName="delete" iconColor="#ef4444" />
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
