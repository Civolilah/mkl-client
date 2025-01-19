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

import { DeleteAction } from '@components/index';

type Params = {
  resourceName: string;
};

const useActions = ({ resourceName }: Params) => {
  const { id } = useParams();

  const actions: MenuProps['items'] = [
    {
      label: (
        <DeleteAction
          resourceType="subsidiary"
          deleteEndpoint="/api/subsidiaries/:id"
          resourceName={resourceName}
          resourceId={id as string}
          editPageAction
          mainPageURL="/subsidiaries"
        />
      ),
      key: `delete-${id}`,
      style: { paddingLeft: 0 },
    },
  ];

  return actions;
};

export default useActions;
