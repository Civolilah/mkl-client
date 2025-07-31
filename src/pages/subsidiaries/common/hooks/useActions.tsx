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

import { Subsidiary } from '@interfaces/index';

import { DeleteAction } from '@components/index';

const useActions = () => {
  const { id } = useParams();

  return (currentResource: Subsidiary) => {
    const actions: MenuProps['items'] = [
      {
        label: (
          <DeleteAction
            resourceType="subsidiary"
            deleteEndpoint="/api/subsidiaries/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/subsidiaries"
            resourceName={currentResource.name}
            resourceQueryIdentifier="subsidiaries"
          />
        ),
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
