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
import { useParams } from 'react-router-dom';

import { LabelCategory } from '@interfaces/index';

import { DeleteAction } from '@components/index';

const useActions = () => {
  const { id } = useParams();

  return (currentResource: LabelCategory) => {
    const actions: MenuProps['items'] = [
      {
        label: (
          <DeleteAction
            resourceType="supplier"
            deleteEndpoint="/api/suppliers/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/suppliers"
            resourceName={currentResource.name}
          />
        ),
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
