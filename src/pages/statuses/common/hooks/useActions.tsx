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

import { Status } from '@interfaces/index';

import { DeleteAction } from '@components/index';

const useActions = () => {
  const { id } = useParams();

  return (currentResource: Status) => {
    const actions: MenuProps['items'] = [
      {
        label: (
          <DeleteAction
            resourceType="status"
            deleteEndpoint="/api/statuses/:id"
            resourceId={id as string}
            editPageAction
            mainPageURL="/statuses"
            resourceName={currentResource.name}
            resourceQueryIdentifier="statuses"
          />
        ),
        key: `delete-${id}`,
      },
    ];
    return actions;
  };
};

export default useActions;
